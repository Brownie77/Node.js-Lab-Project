
import express from 'express';
import router from './router.js'
const app = express()
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use('/api', router);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);