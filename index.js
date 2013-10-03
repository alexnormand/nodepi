var http = require('http');
var nodepi = require(__dirname + '/nodepi');

http.createServer(function(req, res) {
  nodepi.getLatestBuildLinks().then(function(links) {
    var html = '<ul><li>' + links.join('</li><li>') + '</li></ul>';

    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  });
}).listen(3000);

console.log('listening on port 3000...');








