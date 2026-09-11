// The API gateway the services assume exists.
//
// Every frontend call is built as {BASE}/{service}/api/v1/... and several
// backend call sites do the same, while each service serves its routes at a
// bare /api/v1/... So the gateway's whole job is to strip the leading routing
// segment and forward. It is small because the problem is small — what makes
// it necessary is that the call sites disagree with each other, not that the
// routing is complex.
//
// Targets come from the environment so the same image serves local and
// deployed use: AUTH_TARGET, USER_TARGET, RBAC_TARGET, CARBON_TARGET.
const http = require('http');

const ROUTES = [
  { prefix: '/auth', target: process.env.AUTH_TARGET || 'http://localhost:3601' },
  { prefix: '/user', target: process.env.USER_TARGET || 'http://localhost:3600' },
  { prefix: '/rbac', target: process.env.RBAC_TARGET || 'http://localhost:3602' },
  { prefix: '/carbon', target: process.env.CARBON_TARGET || 'http://localhost:4001' },
];

const PORT = process.env.PORT || 3699;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, routes: ROUTES.map((r) => r.prefix) }));
    return;
  }

  const route = ROUTES.find((r) => req.url === r.prefix || req.url.startsWith(r.prefix + '/'));
  if (!route) {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'no gateway route for ' + req.url }));
    return;
  }

  let targetUrl;
  try {
    targetUrl = new URL(route.target + (req.url.slice(route.prefix.length) || '/'));
  } catch (err) {
    res.writeHead(500, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'bad target for ' + route.prefix }));
    return;
  }

  const proxyReq = http.request(
    {
      hostname: targetUrl.hostname,
      port: targetUrl.port || 80,
      path: targetUrl.pathname + targetUrl.search,
      method: req.method,
      headers: { ...req.headers, host: targetUrl.host },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  // A dead upstream must not take the gateway down with it.
  proxyReq.on('error', (err) => {
    if (res.headersSent) return res.destroy();
    res.writeHead(502, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'upstream unreachable', prefix: route.prefix, detail: err.message }));
  });

  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`gateway listening on :${PORT}`);
  ROUTES.forEach((r) => console.log(`  ${r.prefix} -> ${r.target}`));
});
