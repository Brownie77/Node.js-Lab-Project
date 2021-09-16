import 'dotenv/config.js';
import express from 'express';
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings/index.js';
iconv.encodings = encodings;
import router from './router.js';
import cors from 'cors';
import config from './config.js';
import errorHandler from './errors/errorHandler.js';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/static', express.static(__dirname + '/public'));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

app.listen(config.app.PORT, config.app.HOST);
process.on('unhandledRejection', (error) => {
  throw error;
});
process.on('uncaughtException', (error) => {
  errorHandler.logError(error);

  if (!errorHandler.isOperationalError(error)) {
    process.exit(1);
  }
});
console.log(
  `Running on http://${config.app.HOST}:${config.app.PORT}, DATABASE: ${config.database.TYPE}`,
);
