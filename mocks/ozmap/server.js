const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Log requests
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mock Login
server.post('/api/v2/users/login', (req, res) => {
  console.log('Login attempt:', req.body);
  res.json({
    authorization: 'mock-token'
  });
});

// Handle OZMap SDK filters and translate to json-server format
server.use('/api/v2', (req, res, next) => {
  if (req.query.filter) {
    try {
      const filters = JSON.parse(req.query.filter);
      filters.forEach(f => {
        if (f.property && f.value !== undefined) {
          req.query[f.property] = f.value;
        }
      });
      delete req.query.filter;
    } catch (e) {
      console.error('Failed to parse filter:', req.query.filter);
    }
  }
  
  // Re-route internally by removing prefix
  req.url = req.url.replace(/^\/api\/v2/, '');
  if (req.url === '') req.url = '/';
  
  next();
});

// Wrapping list responses in { rows, count, hasNextPage }
router.render = (req, res) => {
  const data = res.locals.data;
  if (Array.isArray(data)) {
    console.log(`Wrapping array response for ${req.url} (found ${data.length} items)`);
    res.jsonp({
      rows: data,
      count: data.length,
      hasNextPage: false,
      nextUrl: null
    });
  } else {
    res.jsonp(data);
  }
};

// Use the router for ALL requests (it will match based on the rewritten req.url)
server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`OZMap Mock Server is running on port ${PORT}`);
});
