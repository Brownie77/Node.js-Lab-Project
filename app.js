
import express from 'express';
import router from './router.js';
import cors from 'cors';
import config from './config.js';
import errorHandler from "./errors/errorHandler.js";

const app = express();



app.use(express.json());
app.use('/api', router);
app.use(express.static('public'));
app.use(cors())
app.listen(config.app.PORT, config.app.HOST);
process.on('unhandledRejection', error => {
    throw error
   })
   
   process.on('uncaughtException', error => {
    errorHandler.logError(error)
   
    if (!errorHandler.isOperationalError(error)) {
    process.exit(1)
    }
   })
console.log(`Running on http://${config.app.HOST}:${config.app.PORT}, DATABASE: ${config.database.TYPE}`);
// RedisDatabase.getPatient('Vanya');
// RedisDatabase.getAllPatients();
// RedisDatabase.getCurrentInQueue();
// RedisDatabase.getQueue();
// RedisDatabase.getAnddeleteFirstFromQueue();
// RedisDatabase.getQueue();
// RedisDatabase.createResolution('sadasdadadasda')
// console.log(process.env)



