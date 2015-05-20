'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var kramdown = require('../');

describe('gulp-kramdown', function(){
  it('should compile Kramdown to HTML', function (cb) {
    var stream = kramdown();

    stream.once('data', function (file) {
      assert.equal(file.relative, 'fixture.html');
      assert.equal(file.contents.toString(),
      '<p><sup><a href="#fn_1" id="reffn_1">1</a></sup></p>\n' +
      '<blockquote id="fn_1">\n' +
      '<sup>1</sup>. bar' +
      '<a href="#reffn_1" title="Jump back to footnote [1] in the text.">' +
      	' &#8617;</a>\n' +
      '</blockquote>\n'
      );
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
      path: 'fixture.md',
      contents: new Buffer('[^1]\n[^1]: bar')
    }));

    stream.end();
  });
});
