import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {createApp} from '../server.ts';
let cloudServer,appServer,secondServer,base,second,row,failCommit=false,uploaded=0;
const password='Test-only-long-password-2026';
const start=s=>new Promise(resolve=>s.listen(0,'127.0.0.1',()=>resolve(`http://127.0.0.1:${s.address().port}`)));
before(async()=>{
 cloudServer=http.createServer(async(req,res)=>{
  const chunks=[];for await(const c of req)chunks.push(c);const data=Buffer.concat(chunks).toString();
  res.setHeader('Content-Type','application/json');
  if(req.url.startsWith('/storage/')){uploaded++;res.end('{}');return;}
  if(req.url.startsWith('/rest/v1/rpc/')){
   if(failCommit){res.statusCode=503;res.end('{}');return;}
   const b=JSON.parse(data);if(row.version!==b.expected_version){res.end('false');return;}
   row={data:b.next_data,version:row.version+1};res.end('true');return;
  }
  if(req.method==='POST'){if(!row){const b=JSON.parse(data);row={data:b.data,version:b.version};}res.end('{}');return;}
  res.end(JSON.stringify(row?[row]:[]));
 });
 process.env.SUPABASE_URL=await start(cloudServer);process.env.SUPABASE_SECRET_KEY='sb_secret_test';process.env.ADMIN_INITIAL_PASSWORD=password;
 appServer=http.createServer(createApp());base=await start(appServer);secondServer=http.createServer(createApp());second=await start(secondServer);
});
after(async()=>{for(const s of [appServer,secondServer,cloudServer]){s.closeAllConnections();await new Promise(r=>s.close(r));}});
async function call(path,body,token,origin=base,method='POST'){
 return fetch(origin+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
}
async function login(){const r=await call('/api/auth/login',{username:'TeamAIgenz',password});assert.equal(r.status,200);return (await r.json()).token;}
test('health; 114 learning items; zero fabricated visits',async()=>{
 assert.equal((await fetch(base+'/api/health')).status,200);assert.equal((await fetch(base+'/api/readiness')).status,200);
 assert.equal(row.data.items.length,114);assert.equal(row.data.visitorStats.totalVisits,0);
});
test('registration requires four fields and persists',async()=>{
 assert.equal((await call('/api/users/register',{fullName:'Test',phone:'0900000001'})).status,400);
 assert.equal((await call('/api/users/register',{fullName:'Học sinh thử',phone:'0900000001',className:'10A1',school:'Trường thử'})).status,200);
 assert.equal(row.data.users.length,1);
});
test('concurrent registrations do not overwrite each other',async()=>{
 const create=async n=>{for(let i=0;i<8;i++){
  const r=await call('/api/users/register',{fullName:`Test ${n}`,phone:`090000000${n}`,className:'10A1',school:'Test'},undefined,n===2?base:second);
  if(r.status===409)continue;assert.equal(r.status,200);return;
 }assert.fail('Retry budget exhausted');};
 await Promise.all([create(2),create(3)]);assert.equal(row.data.users.length,3);
});
test('failed commit returns failure, not success',async()=>{
 failCommit=true;try{const r=await call('/api/users/register',{fullName:'Fail',phone:'0900000004',className:'10A1',school:'Test'});
 assert.equal(r.status,503);assert.equal(row.data.users.length,3);}finally{failCommit=false;}
});
test('default password rejected; session shared across app instances',async()=>{
 assert.equal((await call('/api/auth/login',{username:'TeamAIgenz',password:'123456'})).status,401);
 const token=await login();const r=await call('/api/auth/verify',undefined,token,second,'GET');assert.equal((await r.json()).isAuthenticated,true);
});
test('uploads require admin and persist externally',async()=>{
 const payload={filename:'test.png',base64Data:'data:image/png;base64,iVBORw0KGgo='};
 assert.equal((await call('/api/upload-infographic',payload)).status,401);
 const token=await login();assert.equal((await call('/api/upload-infographic',payload,token)).status,200);
 assert.equal(uploaded,1);assert.ok(row.data.assets['infographics/test.png']);
});
test('unknown API returns JSON 404',async()=>{
 const r=await fetch(base+'/api/not-a-route');assert.equal(r.status,404);assert.match(r.headers.get('content-type'),/json/);
});
test('logout revokes shared session',async()=>{
 const token=await login();assert.equal((await call('/api/auth/logout',{},token)).status,200);
 const r=await call('/api/auth/verify',undefined,token,second,'GET');assert.equal((await r.json()).isAuthenticated,false);
});
test('password change rejects old password and invalidates sessions',async()=>{
 const token=await login();const replacement='A-different-long-password';
 assert.equal((await call('/api/auth/change-password',{oldPassword:password,newPassword:replacement},token)).status,200);
 assert.equal((await call('/api/auth/login',{username:'TeamAIgenz',password})).status,401);
 assert.equal((await call('/api/auth/login',{username:'TeamAIgenz',password:replacement})).status,200);
 const r=await call('/api/auth/verify',undefined,token,second,'GET');assert.equal((await r.json()).isAuthenticated,false);
});
