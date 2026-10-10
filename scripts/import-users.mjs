// Optional import of the original private store. Never commit this source JSON or .env.
import fs from 'node:fs';
import {loadSnapshot, commitSnapshot} from '../backend/persistence.mjs';
const input=process.argv[2];
if(!input) throw new Error('Usage: node --env-file=.env scripts/import-users.mjs PATH_TO_OLD_STORE_JSON');
const old=JSON.parse(fs.readFileSync(input,'utf8'));
if(!Array.isArray(old.users)) throw new Error('Source has no users array.');
const state=await loadSnapshot(()=>{throw new Error('Open /api/readiness first to initialize the database.');});
const known=new Set(state.data.users.map(u=>u.phone));
let count=0;
for(const u of old.users){
 if(typeof u.phone!=='string'||!/^\+?[0-9]{8,15}$/.test(u.phone)||known.has(u.phone))continue;
 state.data.users.push(u);known.add(u.phone);count++;
}
await commitSnapshot(state);
console.log(`Imported ${count} registrations. Existing registrations, admin password and sessions were not overwritten.`);
