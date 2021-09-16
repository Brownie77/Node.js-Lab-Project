//import RedisDB from './redisdb.js';
import inMemoryDB from './database.js';
import sqlDB from './sqlDB/sequelize.js';
import config from './config.js';
const appDB = (typeOfStorage) => {
  switch (typeOfStorage) {
    // case 'redisDB':
    //   return new RedisDB();
    case 'inMemoryDB':
      return new inMemoryDB();
    case 'sqlDB':
      return new sqlDB();
  }
};

export default appDB(config.database.TYPE);
