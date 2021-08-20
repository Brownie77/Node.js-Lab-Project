import express from 'express';
import router from '../router.js'
// function createServer() {
// 	const app = express()
// 	app.use(express.json())
// 	app.use("/api", router)
// 	return app
// }

// module.exports = createServer


const app = express()
app.use(express.json())
app.use("/api", router)

module.exports = app