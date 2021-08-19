import RedisDB from "./redisdb.js";
import inMemoryDB from "./database.js";
import config from "./config.js";
const appDB = (typeOfStorage) => {
    if(typeOfStorage ==='redisDB') {
        return new RedisDB()
    } else if(typeOfStorage ==='inMemoryDB') {
        return new inMemoryDB()

    }
}

export default appDB(config.database.TYPE)