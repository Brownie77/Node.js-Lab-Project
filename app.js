
import express from 'express';
import router from './router.js';
import cors from 'cors';
import config from './config.js';
const app = express();



app.use(express.json());
app.use('/api', router);
app.use(express.static('public'));

app.use(cors())
app.listen(config.app.PORT, config.app.HOST);
console.log(`Running on http://${config.app.HOST}:${config.app.PORT}, DATABASE: ${config.database.TYPE}`);
// RedisDatabase.getPatient('Vanya');
// RedisDatabase.getAllPatients();
// RedisDatabase.getCurrentInQueue();
// RedisDatabase.getQueue();
// RedisDatabase.getAnddeleteFirstFromQueue();
// RedisDatabase.getQueue();
// RedisDatabase.createResolution('sadasdadadasda')
// console.log(process.env)



