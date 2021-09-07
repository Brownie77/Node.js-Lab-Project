import sqlz from 'sequelize';
import crypto from 'crypto';
import Api404Error from '../errors/api404Error.js';

const {
    Sequelize,
    DataTypes
} = sqlz;

const sequelize = new Sequelize("medstage", "root", "KevalaKumar1995", {
    dialect: "mysql",
    host: "localhost",
    logging: false

});
try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
    (async() => {
        await sequelize.sync()
    })()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default class {
    patient = sequelize.define(
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
    queue = sequelize.define(
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
                    model: this.patient,
                    key: 'id',
                }
            }
        });
    resolution = sequelize.define(
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
                    model: this.patient,
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
    async clearDatabase() {

        await this.queue.destroy({ truncate: { cascade: true } });

        await this.resolution.destroy({ truncate: { cascade: true } });

        await this.patient.destroy({ truncate: { cascade: true } });

    }
    async expireTimeIsOut(createdAt, expireTime) {
        Date.parse(createdAt.toISOString())
        const creationDateInMilliseconds = Date.parse(createdAt.toISOString())
        return creationDateInMilliseconds + (expireTime * 1000) > Date.now() ? false : true
    }
    async createPatientAndReturnCurrentPatient(name) {
        await this.patient.sync()
        const patient_id = crypto.randomUUID({
            disableEntropyCache: true
        });
        await this.patient.create({
            id: patient_id,
            name
        })
        await this.addToQueue(patient_id);
        console.log(await this.getCountOfQueue())
        const currentPatientInQueue = await this.getCurrentInQueue();
        return currentPatientInQueue;
    }
    async createPatient(name) {
        const patient_id = crypto.randomUUID({
            disableEntropyCache: true
        });
        await this.Patient.create({
            id: patient_id,
            name
        })
        this.addToQueue(patient_id)
    }

    async addToQueue(patient_id) {
        await this.queue.sync()
        const uuid = crypto.randomUUID({
            disableEntropyCache: true
        });
        const currentPatientInQueue = await this.queue.create({
            id: uuid,
            patient_id
        })
        return currentPatientInQueue
    }

    async getCurrentInQueue() {
        const patientInfo = await this.getAllInfoOfCurrentPatientInQueue();
        if (patientInfo === null) {
            return null;
        }
        return patientInfo[0].name
    }

    async getAllInfoOfCurrentPatientInQueue() {
        await this.queue.sync()
        const currentPatientInQueue = await this.queue.findAll({
            limit: 1,
            raw: true,
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (currentPatientInQueue.length === 0) {
            return null;
        }
        const patient = await this.patient.findAll({
            raw: true,
            where: {
                id: currentPatientInQueue[0].patient_id
            }
        });
        return patient
    }


    async getCountOfQueue() {
        await this.queue.sync()
        const amountPatientsInQueue = await this.queue.count();
        return amountPatientsInQueue;
    }


    async getAndDeleteFirstFromQueue() {
        await this.queue.sync()
        const patient = await this.getAllInfoOfCurrentPatientInQueue()
        if (patient === undefined) {
            throw new Api404Error(`Patient with id: ${patient[0].id} not found.`);
        }
        const deletedPatient = await this.queue.destroy({
            where: {
                patient_id: patient[0].id
            }
        })
        console.log(deletedPatient)
        return deletedPatient;
    }

    async createResolution(resolutionText, lifetime) {
        await this.resolution.sync();
        const uuid = crypto.randomUUID({
            disableEntropyCache: true
        });
        const patientInfo = await this.getAllInfoOfCurrentPatientInQueue();
        const newResolution = await this.resolution.create({
            id: uuid,
            patient_id: patientInfo[0].id,
            value: resolutionText,
            expire_time: lifetime
        })
    }

    async getResolution(name) {
        await this.resolution.sync();
        const patient = await this.patient.findAll({
            limit: 10,
            raw: true,
            where: {
                name: name
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });
        if (patient.length === 0) {
            throw new Api404Error(`The user named ${name} was not found`);
        }
        const searchedResolution = await this.resolution.findAll({
            raw: true,
            where: {
                patient_id: patient[0].id
            },
            order: [
                ['createdAt', 'ASC']
            ]

        })

        if (searchedResolution.length === 0) {
            throw new Api404Error(`This patient has no resolutions yet or resolution was deleted`);
        }
        if (await this.expireTimeIsOut(searchedResolution[0].createdAt, searchedResolution[0].expire_time)) {
            await this.resolution.destroy({
                where: {
                    patient_id: patient[0].id
                }
            });
        }
        return searchedResolution[0].value
    }

    async deleteResolution(name) {
        await this.resolution.sync();
        const patient = await this.patient.findAll({
            limit: 1,
            raw: true,
            where: {
                name: name
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });
        const searchedResolution = await this.resolution.findAll({
            limit: 1,
            raw: true,
            where: {
                patient_id: patient[0].id
            },
            order: [
                ['createdAt', 'ASC']
            ]
        })
        if (searchedResolution.length === 0) {
            throw new Api404Error(`This patient has no resolutions`);
        }
        await this.resolution.destroy({
            where: {
                patient_id: patient[0].id
            }
        });
        return searchedResolution[0].value;
    }
}