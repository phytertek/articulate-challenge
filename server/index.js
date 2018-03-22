const enmapi = require('enmapi');

enmapi.server.setConfig({
  Level: process.env.NODE_ENV || 'development',
  Name: process.env.NAME || 'enmapi-creator-test-server',
  Host: process.env.HOST || 'http://localhost',
  Port: process.env.PORT || 3333,
  DatabaseName: process.env.DBNAME || 'Test DB',
  DatabaseURI:
    process.env.DB_URI ||
    'mongodb://9grIMCceUpnG3RRyC0xluc1mVki4cA51:AkP6tEE1qoyG8d1qdWKivoBkUSB45FdZ@ds221609.mlab.com:21609/enmapi-tester'
});

enmapi.server.start();
