import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const HOST = '127.0.0.1'
const PORT = 4173
const ROOT = path.resolve('dist/build/h5')

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
}

function resolvePath(urlPath) {
  const safePath = urlPath === '/' ? '/index.html' : urlPath
  const filePath = path.resolve(ROOT, `.${safePath}`)
  if (!filePath.startsWith(ROOT)) {
    return null
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath
  }
  return path.resolve(ROOT, 'index.html')
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${HOST}:${PORT}`)
  const filePath = resolvePath(url.pathname)

  if (!filePath) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  if (!fs.existsSync(filePath)) {
    response.writeHead(404)
    response.end('Not Found')
    return
  }

  const ext = path.extname(filePath)
  response.writeHead(200, {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
  })
  fs.createReadStream(filePath).pipe(response)
})

server.listen(PORT, HOST, () => {
  console.log(`[serve-h5-preview] http://${HOST}:${PORT}`)
})
