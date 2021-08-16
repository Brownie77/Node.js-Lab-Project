
import express from 'express';
import router from './router.js';
import RedisDatabase from './redisdb.js';
import cors from 'cors';
// import redis from 'redis';

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
// const db = redis.createClient();



app.use(express.json());
app.use('/api', router);
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors())


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
// RedisDatabase.addToQueue('Vanya');
// RedisDatabase.addToQueue('Vova');
// RedisDatabase.addToQueue('Sergey');
// RedisDatabase.addToQueue('Petr');
// RedisDatabase.getCurrentInQueue();
// RedisDatabase.getQueue();
// RedisDatabase.getAnddeleteFirstFromQueue();
// RedisDatabase.getQueue();
// RedisDatabase.createPatient('Vladimir');
// RedisDatabase.createResolution('sadasdadadasda')




