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

    async createResolutionTable() {
        const Patient = await this.createPatientsTable()
        const ResolutionModel = sequelize.define(
            'Resolution', {
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
                },
                value: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                expire_time: {
                    type: DataTypes.INTEGER,
                    defaultValue: null

                }
            });
          await ResolutionModel.sync();
          return ResolutionModel;
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
        const patientInfo = await this.getAllInfoOfCurrentPatientInQueue();
        return patientInfo[0].name
        }

    async getAllInfoOfCurrentPatientInQueue(){
        const queueModel = await this.createQueueTable();
        const patientModel = await this.createPatientsTable();
        const currentPatientInQueue = await queueModel.findAll({limit: 1, raw: true, order: [['createdAt', 'ASC']]});
        const patient = await patientModel.findAll({
            raw: true,
            where: {
              id: currentPatientInQueue[0].patient_id
            }
          });
          return patient
        }


    async getCountOfQueue() {
        const queueModel = await this.createQueueTable();
        const amountPatientsInQueue = await queueModel.count();
        return amountPatientsInQueue;
    }


    async getAndDeleteFirstFromQueue(){
        const queueModel = await this.createQueueTable();
        const patient = await this.getAllInfoOfCurrentPatientInQueue()
        const deletedPatient = await queueModel.destroy({
            where: {
                patient_id: patient[0].id
            }
        })
        return deletedPatient;
    }

    async createResolution(resolutionText, lifetime) {
        const resolutionModel = await this.createResolutionTable();
        const uuid = crypto.randomUUID({
            disableEntropyCache: true
        });
        const patientInfo = await this.getAllInfoOfCurrentPatientInQueue();
        const newResolution = await resolutionModel.create({
            id: uuid,
            patient_id: patientInfo[0].id,
            value: resolutionText,
            expire_time: lifetime
        })
    }

    async getResolution(name) {
        const patientModel = await this.createPatientsTable();
        const resolutionModel = await this.createResolutionTable();
        const patient = await patientModel.findAll({
            limit: 10,
            raw: true,
            where: {
              name: name
            },
            order: [['createdAt', 'ASC']]
          });
          console.log(`PATIENT IS`,patient)
            const searchedResolution = await resolutionModel.findAll({
            raw: true,
            where: {
              patient_id: patient[0].id
            },
            order: [['createdAt', 'ASC']]

        })
        return searchedResolution[0].value
    }

    async deleteResolution(name) { 
        const patientModel = await this.createPatientsTable();
        const resolutionModel = await this.createResolutionTable();
        const patient = await patientModel.findAll({
            limit: 1,
            raw: true,
            where: {
              name: name
            },
            order: [['createdAt', 'ASC']]
          });
        const searchedResolution = await resolutionModel.findAll({
            limit: 1,
            raw: true,
            where: {
              patient_id: patient[0].id
            },
            order: [['createdAt', 'ASC']]
        })
        await resolutionModel.update({
            value: ""
          },
          {
            where: { patient_id: patient[0].id}
          }
        );
        return searchedResolution;
    }
}
