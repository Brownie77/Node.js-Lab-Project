import sqlz from 'sequelize';
const {
    Sequelize,
    DataTypes
} = sqlz;
const sequelize = new Sequelize("medstage", "root", "KevalaKumar1995", {
    dialect: "mysql",
    host: "localhost"
});


const QueueModel = sequelize.define(
    'Queue', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });(async () => {
        await sequelize.sync()
    })()


export {QueueModel};