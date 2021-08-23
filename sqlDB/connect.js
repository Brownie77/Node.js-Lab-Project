// import mysql from "mysql2";
// import crypto from "crypto"
// export default class {
//   constructor(host, user, database, password) {
//     this.host = host;
//     this.user = user;
//     this.database = database;
//     this.password = password;
//   }

//   async connectToSQL() {
//     const connection = mysql.createConnection({
//       host: this.host,
//       user: this.user,
//       database: this.database,
//       password: this.password
//     });
//     connection.connect(function (err) {
//       if (err) {
//         return console.error("Ошибка: " + err.message);
//       } else {
//         console.log("Подключение к серверу MySQL успешно установлено");
//       }
//     })
//     return connection;
//   }

//   async createPatientsTable() {
//     const connection = mysql.createConnection({
//       host: this.host,
//       user: this.user,
//       database: this.database,
//       password: this.password
//     });
//     connection.connect(function (err) {
//       if (err) {
//         return console.error("Ошибка: " + err.message);
//       } else {
//         console.log("Подключение к серверу MySQL успешно установлено");
//       }
//     })
//     const sqlTable = `CREATE TABLE IF NOT EXISTS patients (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, patient_id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
//     connection.query(sqlTable, function (err, results) {
//       if (err) console.log(err);
//       else console.log("Таблица пациентов создана");
//     });
//     connection.end();
//   }

//   async createQueueTable(){
//     const connection = await this.connectToSQL();
//     const query = `CREATE TABLE IF NOT EXISTS queue (queue_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, patient_id INT,  FOREIGN KEY (patient_id) REFERENCES patients(id))`
//     connection.query(query, function (err, results) {
//       if (err) console.log(err);
//       else console.log("Таблица очереди создана");
//     });
//     connection.end();
//   }



//   async addPatient() {
//     const connection = await this.connectToSQL();
//     // const curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
//     const uuid = crypto.randomUUID({
//       disableEntropyCache: true
//     });
//     const query = `INSERT INTO patients(patient_id, name) VALUES('${uuid}','John Doe')`;
//     connection.query(query, function (err, results) {
//       if (err) console.log(err);
//       else console.log(results);
//     });
//     connection.end();
//   }

// }
