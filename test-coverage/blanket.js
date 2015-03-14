var path = require('path');
var srcDir = path.join(__dirname, '..', 'app', 'scripts');

require('blanket')({
  pattern: srcDir
});
