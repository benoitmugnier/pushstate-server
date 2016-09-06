var connect = require('connect');
var path = require('path');
var modRewrite = require('connect-modrewrite');
var serveStatic = require('serve-static');
var serveStaticFile = require('connect-static-file');
var compression = require('compression');
var app = connect();

module.exports = {
  app: app,
  _port: 9000,
  _directory: 'public',
  _file: '/index.html',

  port: function (port) {
    this._port = port;
  },

  directory: function (dir) {
    this._directory = dir;
  },

  file: function (file) {
    this._file = dir;
  },

  start: function (options) {
    options = options || {};

    var port = options.port || process.env.PORT || this._port;
    var directory = options.directory || this._directory;
    var directories = options.directories || [directory];
    var file = options.file || this._file;

    app.use(compression());

    // First, check the file system
    directories.forEach(function(directory) {
      app.use(serveStatic(directory, { extensions: ['html'] }));
    });

    // Then, serve the fallback file
    app.use(serveStaticFile(path.join(directory, file)))

    return app.listen(port, function () {
      console.log('\nPushstate server started on port ' + port + '\n');
    });
  }
};
