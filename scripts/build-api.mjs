// Gộp server.ts và mọi tệp nó dùng thành MỘT tệp api/index.js cho Vercel.
// Vercel chạy tệp .js này nguyên trạng, không phải tự tìm server.ts, seed.json...
// Sửa server.ts hoặc backend/* xong thì chạy lại: npm run build:api
import { build } from 'esbuild';

await build({
  stdin: {
    contents: "import { createApp } from './server.ts';\nexport { createApp };\nexport default createApp();\n",
    resolveDir: process.cwd(),
    sourcefile: 'api-entry.ts',
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  packages: 'external',
  outfile: 'api/index.js',
  banner: { js: '// TỆP TỰ SINH bởi scripts/build-api.mjs — không sửa tay. Sửa server.ts rồi chạy: npm run build:api' },
  logLevel: 'info',
});
