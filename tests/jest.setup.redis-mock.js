jest.mock('redis', () => jest.requireActual('redis-mock'));
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

