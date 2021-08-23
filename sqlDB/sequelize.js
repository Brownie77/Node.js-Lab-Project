import sqlz from 'sequelize';
import crypto from 'crypto';
import {QueueModel} from './sequelizeModels.js'
const {
    Sequelize,
    DataTypes
} = sqlz;

const sequelize = new Sequelize("medstage", "root", "KevalaKumar1995", {
    dialect: "mysql",
    host: "localhost"
});
export default class {
    async authenticationDB() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async createPatientsTable() {
        const Patient = sequelize.define(
            'Patient', {
                id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            });
        (async () => {
            await sequelize.sync()
        })()
        return Patient;
    }

    async createPatient(name) {
        const patientModel = await this.createPatientsTable()
        const uuid = crypto.randomUUID({
            disableEntropyCache: true
        });
        await patientModel.create({
            id: uuid,
            name
        })
    }

    async addToQueue(name) {
        const uuid = crypto.randomUUID({
            disableEntropyCache: true
        });
        await QueueModel.create({
            id: uuid,
            name
        })
    }

}