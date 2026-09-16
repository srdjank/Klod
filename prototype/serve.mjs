import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join, normalize } from 'path';

const root = new URL('.', import.meta.url).pathname;
const port = Number(process.env.PORT) || 5173;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };

createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split('?')[0]);
  if (path === '/') path = '/default-world.html';
  try {
    const body = await readFile(join(root, normalize(path)));
    res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end('not found'); }
}).listen(port, () => console.log(`ioi prototype: http://localhost:${port}/`));
