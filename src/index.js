import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './app';
import http from 'http';
import logger from './utils/logger';

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => logger.info(`Server running on port ${port}`));
