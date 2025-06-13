const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.url}`);
  
  // Serve the test.html file
  fs.readFile(path.join(__dirname, 'test.html'), (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error: ${err.message}`);
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});