// import sqlz from 'sequelize';
// import 
// const {
//     Sequelize,
//     DataTypes
// } = sqlz;
// const sequelize = new Sequelize("medstage", "root", "KevalaKumar1995", {
//     dialect: "mysql",
//     host: "localhost"
// });


// const QueueModel = sequelize.define(
//     'Queue', {
//         id: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             primaryKey: true,
//         },
//         patient_id: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             references: {
//                 model: Patient,
//                 key: 'id',
//             }
//         }
//     });
// (async () => {
//     await sequelize.sync()
// })()


// export {
//     QueueModel
// };