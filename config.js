import dotenv from 'dotenv';
dotenv.config()
const env = process.env.NODE_ENV;
const dbtype = process.env.NODE_DB;
const urlDB = {
    redisDB: '../redisdb.js',
    inMemoryDB: '../database.js'
}
const dev = {
    app: {
        PORT: parseInt(process.env.DEV_APP_PORT)|| 3000,
        HOST:process.env.DB_HOST||'localhost'
    },
    database: {
        TYPE: dbtype,
        urlDB: urlDB[dbtype]
    }
}

const test = {
    app: {
        PORT: parseInt(process.env.DEV_APP_PORT)|| 3000,
        HOST:process.env.DB_HOST||'localhost'
    },
    database: {
        TYPE: dbtype,
        urlDB: urlDB[dbtype]
    }
}

const config = {
    dev,
    test
}
export default config[env];