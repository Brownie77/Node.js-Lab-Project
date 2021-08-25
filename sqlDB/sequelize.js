import sqlz from 'sequelize';
import crypto from 'crypto';
const {
    Sequelize,
    DataTypes
} = sqlz;

const sequelize = new Sequelize("medstage", "root", "KevalaKumar1995", {
    dialect: "mysql",
    host: "localhost"
});
await sequelize.sync({force: true});

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
            await Patient.sync();
        // (async () => {
        //     await sequelize.sync()
        // })()
        return Patient;
    }

    async createQueueTable(){
        const Patient = await this.createPatientsTable()
        const QueueModel = sequelize.define(
            'Queue', {
                id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    primaryKey: true,
                },
                patient_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    references: {
                        model: Patient,
                        key: 'id',
                    }
                }
            });
          await QueueModel.sync();  
        // (async () => {
        //     await sequelize.sync()
        // })()
        return QueueModel
    }
    async createPatientAndReturnCurrentPatient(name) {
        const patientModel = await this.createPatientsTable();
        const patient_id = crypto.randomUUID({
            disableEntropyCache: true
        });
        await patientModel.create({
            id: patient_id,
            name
        })
        this.addToQueue(patient_id); 
        const currentPatientInQueue = await this.getCurrentInQueue();
        console.log(currentPatientInQueue)
        return currentPatientInQueue;
    }
    async createPatient(name) {
        const patientModel = await this.createPatientsTable();
        const patient_id = crypto.randomUUID({
            disableEntropyCache: true
        });
        await patientModel.create({
            id: patient_id,
            name
        })
        this.addToQueue(patient_id)
    }

    async addToQueue(patient_id) {
        const queueModel = await this.createQueueTable(); 
        const uuid = crypto.randomUUID({
            disableEntropyCache: true
        });
        const currentPatientInQueue = await queueModel.create({
            id: uuid,
            patient_id
        })
        return currentPatientInQueue
    }

    async getCurrentInQueue() {
        const queueModel = await this.createQueueTable();
        const currentPatientInQueue = await queueModel.findOne();
        return currentPatientInQueue;
    }

    async getCountOfQueue() {
        const queueModel = await this.createQueueTable();
        const amountPatientsInQueue = await queueModel.count();
        console.log(amountPatientsInQueue)
        return amountPatientsInQueue;
    }
}