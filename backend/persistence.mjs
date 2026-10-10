import { AsyncLocalStorage } from 'node:async_hooks';
const context = new AsyncLocalStorage();
export class StoreError extends Error {
  constructor(message, status = 503) { super(message); this.status = status; }
}
function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) throw new StoreError('Chưa cấu hình SUPABASE_URL và SUPABASE_SECRET_KEY trên máy chủ.');
  return {url, key};
}
export async function cloud(path, options = {}) {
  const {url, key} = config();
  const r = await fetch(url + path, {...options, signal: AbortSignal.timeout(15000), headers: {
    apikey: key, ...(key.startsWith('sb_secret_') ? {} : {Authorization: `Bearer ${key}`}), 'Content-Type': 'application/json', ...options.headers
  }});
  if (!r.ok) throw new StoreError('Không thể lưu/đọc dữ liệu. Kiểm tra cấu hình Supabase và SQL khởi tạo.');
  return r;
}
export async function loadSnapshot(seed) {
  let rows = await (await cloud('/rest/v1/toan10_state?id=eq.main&select=data,version')).json();
  if (!rows.length) {
    await cloud('/rest/v1/toan10_state?on_conflict=id', {method:'POST', headers:{Prefer:'resolution=ignore-duplicates'}, body:JSON.stringify({id:'main', data:seed(), version:0})});
    rows = await (await cloud('/rest/v1/toan10_state?id=eq.main&select=data,version')).json();
  }
  if (!rows[0]) throw new StoreError('Chưa có dữ liệu khởi tạo.');
  return rows[0];
}
export async function commitSnapshot(snapshot) {
  const ok = await (await cloud('/rest/v1/rpc/toan10_save_state', {method:'POST',body:JSON.stringify({expected_version:snapshot.version, next_data:snapshot.data})})).json();
  if (ok !== true) throw new StoreError('Có người khác vừa cập nhật dữ liệu. Vui lòng thử lại.', 409);
}
/** @type {any} */
export const currentStore = new Proxy({}, {
  get(_target, key) { const s = context.getStore(); if (!s) throw new Error('Missing request store'); return s.data[key]; },
  set(_target, key, value) { const s = context.getStore(); if (!s) throw new Error('Missing request store'); s.data[key] = value; return true; }
});
export function saveStore() { const s = context.getStore(); if (!s) throw new Error('Missing request store'); s.dirty = true; }
// Delay the response until durable commit succeeds. API handlers do not stream.
// A version conflict returns 409 instead of silently overwriting another request.
export function storeMiddleware(seed) {
  return async (req, res, next) => {
    try {
      const snapshot = await loadSnapshot(seed);
      const state = {...snapshot, dirty:false};
      const originalEnd = res.end.bind(res);
      let ending = false;
      res.end = function(...args) {
        if (ending) return res;
        ending = true;
        (async () => {
          try {
            if (state.dirty && res.statusCode < 400) await commitSnapshot(state);
            originalEnd(...args);
          } catch (e) {
            if (res.headersSent) { res.destroy(e); return; }
            res.statusCode = e.status || 503;
            res.removeHeader('Content-Length'); res.removeHeader('ETag');
            res.setHeader('Content-Type','application/json; charset=utf-8');
            originalEnd(JSON.stringify({error:e.message || 'Không thể lưu dữ liệu. Vui lòng thử lại.'}));
          }
        })();
        return res;
      };
      context.run(state, next);
    } catch (e) {
      res.status(e.status || 503).json({error:e.message || 'Không thể kết nối dữ liệu.'});
    }
  };
}
export async function putAsset(folder, filename, buffer) {
  if (!/\.(png|jpe?g|webp|gif|svg|html)$/i.test(filename) || buffer.length > 2.5 * 1024 * 1024)
    throw new StoreError('Tệp phải là ảnh/HTML và không quá 2,5 MB.', 400);
  const mime = {png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif',svg:'image/svg+xml',html:'text/html'}[filename.split('.').pop().toLowerCase()];
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'toan10-media';
  const object = `${folder}/${crypto.randomUUID()}/${filename}`;
  const encoded = `${encodeURIComponent(bucket)}/${object.split('/').map(encodeURIComponent).join('/')}`;
  await cloud(`/storage/v1/object/${encoded}`, {method:'POST',headers:{'Content-Type':mime,'x-upsert':'false'},body:buffer});
  const url = `${config().url}/storage/v1/object/public/${encoded}`;
  currentStore.assets ||= {};
  currentStore.assets[`${folder}/${filename}`] = url;
  saveStore();
  return url;
}
export function assetNames(folder) {
  return Object.keys(currentStore.assets || {}).filter(k=>k.startsWith(folder+'/')).map(k=>k.slice(folder.length+1));
}
