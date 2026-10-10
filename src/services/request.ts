export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
 const headers = new Headers(init?.headers);
 const token = localStorage.getItem('toan10_admin_token');
 if (token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
 if (typeof init?.body === 'string' && new TextEncoder().encode(init.body).length > 4 * 1024 * 1024)
   throw new Error('Tệp quá lớn. Mỗi ảnh tối đa 2,5 MB, tải từng ảnh.');
 for (let attempt=0;;attempt++) {
   const result = await fetch(input, {...init, headers});
   if (result.status !== 409 || attempt >= 5) return result;
   await new Promise(resolve=>setTimeout(resolve, 150 * (attempt+1) + Math.random()*250));
 }
}

export async function downloadApiFile(url: string, filename: string): Promise<void> {
 const r = await apiFetch(url);
 if (!r.ok) { const d=await r.json().catch(()=>({})); throw new Error(d.error || 'Cần đăng nhập quản trị để xuất báo cáo.'); }
 const objectUrl=URL.createObjectURL(await r.blob());
 const a=document.createElement('a'); a.href=objectUrl; a.download=filename; a.click();
 setTimeout(()=>URL.revokeObjectURL(objectUrl), 1000);
}
