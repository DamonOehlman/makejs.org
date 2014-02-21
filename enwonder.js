var through = require('through');
var tr = require('trumpet')();
var fs = require('fs');
var path = require('path');
var body = tr.select('body').createStream();
var css = fs.readFileSync(__dirname + '/style.css', { encoding: 'utf8' });
var modified;

function write(data) {
  modified = modified || this.queue('\n<style>\n' + css + '\n</style>');
  this.queue(data);
}

function end() {
  this.queue(null);
}

// transform the body
body.pipe(through(write, end)).pipe(body);

// pipe the output of trumpet to the index.html file
tr.pipe(fs.createWriteStream(__dirname + '/index.html'));

// read the make input file and pipe into trumpet
fs.createReadStream(__dirname + '/make.html').pipe(tr);