import http from 'http';
import app from './api/_lib/app.js';

const server = http.createServer(app);
server.listen(5099, () => console.log('test server up'));
