var tr = require('trumpet')();
var fs = require('fs');
var path = require('path');
var styleWriter = tr.select('head style').createWriteStream();

// pipe the output of trumpet to the index.html file
tr.pipe(fs.createWriteStream(__dirname + '/index.html'));

// read the make input file and pipe into trumpet
fs.createReadStream(__dirname + '/make.html').pipe(tr);

// read the style in manually, as piping into the trumpet stream seems
// to break things :/
fs.readFile(__dirname + '/style.css', { encoding: 'utf8' }, function(err, css) {
  if (err) {
    return console.error(err);
  }

  styleWriter.end(css);
});