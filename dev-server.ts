import 'dotenv/config';
import {createApp} from './server';
import express from 'express';
import path from 'node:path';
const app = createApp();
if (process.env.NODE_ENV !== 'production') {
 const {createServer} = await import('vite');
 app.use((await createServer({server:{middlewareMode:true}, appType:'spa'})).middlewares);
} else {
 app.use(express.static(path.resolve('dist')));
 app.get('*', (_req,res)=>res.sendFile(path.resolve('dist/index.html')));
}
app.listen(Number(process.env.PORT || 3000),'0.0.0.0');
