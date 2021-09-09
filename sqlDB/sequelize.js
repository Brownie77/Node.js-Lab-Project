import sqlz from 'sequelize';
import crypto from 'crypto';
import Api404Error from '../errors/api404Error.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { raw } from 'express';

const { Sequelize, DataTypes } = sqlz;
const sequelize = new Sequelize('itrex', 'root', process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
});
try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  });
  (async () => {
    await sequelize.sync();
  })();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default class {
  constructor() {
    this.initSchemas();
  }

  async sync() {
    await this.user.sync();
    await this.patient.sync();
    await this.role.sync();
    await this.queue.sync();
    await this.doctor.sync();
    return this.resolution.sync();
  }

  async initSchemas() {
    this.user = sequelize.define('User', {
      id: {
        type: DataTypes.STRING,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
    });
    this.patient = sequelize.define('Patient', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: this.user,
          key: 'id',
        },
      },
    });

    this.role = sequelize.define(
      'Role',
      {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { timestamps: false },
    );

    this.doctor = sequelize.define('Doctor', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: this.role,
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: this.user,
          key: 'id',
        },
      },
    });
    //email, password,  name, birthday, gender
    this.queue = sequelize.define('Queue', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      patient_id: {
        type: DataTypes.STRING,
        references: {
          model: this.patient,
          key: 'id',
        },
      },
      doctor_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: this.doctor,
          key: 'id',
        },
      },
    });
    this.resolution = sequelize.define('Resolution', {
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
        },
      },
      doctor_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: this.doctor,
          key: 'id',
        },
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      expire_time: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    });
    await this.sync();
  }

  async clearDatabase() {
    await this.queue.destroy({
      truncate: {
        cascade: true,
      },
    });

    await this.resolution.destroy({
      truncate: {
        cascade: true,
      },
    });

    await this.patient.destroy({
      truncate: {
        cascade: true,
      },
    });
  }
  async expireTimeIsOut(createdAt, expireTime) {
    Date.parse(createdAt.toISOString());
    const creationDateInMilliseconds = Date.parse(createdAt.toISOString());
    return creationDateInMilliseconds + expireTime * 1000 > Date.now()
      ? false
      : true;
  }
  async registrationNewUser(payload) {
    const user_id = crypto.randomUUID({
      disableEntropyCache: true,
    });
    const token = jwt.sign(
      {
        id: user_id,
        email: payload.email,
      },
      process.env.TOKEN_SECRET,
    );
    const oldUser = await this.user.findAll({
      raw: true,
      where: {
        email: payload.email,
      },
    });
    if (oldUser[0]) {
      throw new Error('User Already Exist. Please Login');
      // return res.status(409).send("User Already Exist. Please Login");
    }
    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = await this.user.create({
      id: user_id,
      email: payload.email,
      password: encryptedPassword,
      name: payload.name,
      birthday: new Date(1980, 6, 20),
      gender: payload.gender,
      token: token,
    });
    return newUser.token;
  }

  async userLogin(payload) {
    const { email, password } = payload;
    const user = await this.user.findAll({
      raw: true,
      where: {
        email: email,
      },
    });
    console.log(user);

    if (user && (await bcrypt.compare(password, user[0].password))) {
      console.log(`---------------`);
      const token = jwt.sign(
        {
          id: user[0].id,
          email: payload.email,
        },
        process.env.TOKEN_SECRET,
      );
      await this.user.update(
        {
          token: token,
        },
        {
          where: {
            email: email,
          },
        },
      );
      user[0].token = token;
      return user[0];
    } else {
      throw new Api404Error(`Invalid user or password`);
    }
  }

  async doctorLogin(payload) {
    const { email, password } = payload;
    const user = await this.user.findOne({
      raw: true,
      where: {
        email: email,
      },
    });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const doctor = await this.doctor.findOne({
          raw: true,
          where: {
            user_id: user.id,
          },
        });

        if (!doctor) {
          throw new Api404Error('This user is not a doctor');
        }

        const token = jwt.sign(
          {
            doctorId: doctor.id,
          },
          process.env.TOKEN_SECRET,
        );

        return token;
      }
    } else {
      throw new Api404Error('No such user');
    }
  }

  async createPatientAndAddToQueue(patientName, userId, role, doctor) {
    const patient_id = crypto.randomUUID({
      disableEntropyCache: true,
    });
    await this.patient.create({
      id: patient_id,
      name: patientName,
      user_id: userId,
    });
    return this.addToQueue(patient_id, role, doctor);
  }

  async createPatient(name) {
    const patient_id = crypto.randomUUID({
      disableEntropyCache: true,
    });
    await this.Patient.create({
      id: patient_id,
      name,
    });
    this.addToQueue(patient_id);
  }

  async addToQueue(patient_id, role, doctor) {
    const { id: role_id } = await this.role.findOne({
      raw: true,
      where: { title: role },
    });
    const { id: doctor_id } = await this.doctor.findOne({
      raw: true,
      where: { name: doctor, role_id },
    });
    const currentPatientInQueue = await this.queue.create({
      patient_id,
      doctor_id,
    });
    return currentPatientInQueue;
  }

  async getCurrentInQueue(token) {
    const doctor = jwt.verify(token, process.env.TOKEN_SECRET);
    const doctor_id = doctor.doctorId;

    const patientInfo = await this.getAllInfoOfCurrentPatientInQueue(doctor_id);
    if (patientInfo === null) {
      return null;
    }
    return patientInfo[0]?.name || null;
  }

  async getAllInfoOfCurrentPatientInQueue(doctor_id) {
    const currentPatientInQueue = await this.queue.findAll({
      limit: 1,
      raw: true,
      where: { doctor_id },
      order: [['createdAt', 'ASC']],
    });
    if (currentPatientInQueue.length === 0) {
      return null;
    }
    const patient = await this.patient.findAll({
      raw: true,
      where: {
        id: currentPatientInQueue[0].patient_id,
      },
    });
    return patient;
  }

  async getCountOfQueue() {
    const amountPatientsInQueue = await this.queue.count();
    return amountPatientsInQueue;
  }

  async getAndDeleteFirstFromQueue(token) {
    const doctor = jwt.verify(token, process.env.TOKEN_SECRET);
    const doctor_id = doctor.doctorId;

    const firstInQueue = await this.queue.findOne({
      raw: true,
      where: { doctor_id },
      order: [['createdAt', 'ASC']],
    });

    const deletedPatient = await this.queue.destroy({
      where: {
        id: firstInQueue.id,
      },
    });
    console.log(deletedPatient);
    return deletedPatient;
  }

  async createResolution(resolutionText, lifetime) {
    const uuid = crypto.randomUUID({
      disableEntropyCache: true,
    });
    const patientInfo = await this.getAllInfoOfCurrentPatientInQueue();
    const newResolution = await this.resolution.create({
      id: uuid,
      patient_id: patientInfo[0].id,
      value: resolutionText,
      expire_time: lifetime,
    });
  }

  async getResolution(name) {
    const patient = await this.patient.findAll({
      limit: 10,
      raw: true,
      where: {
        name: name,
      },
      order: [['createdAt', 'ASC']],
    });
    if (patient.length === 0) {
      throw new Api404Error(`The user named ${name} was not found`);
    }
    const searchedResolution = await this.resolution.findAll({
      raw: true,
      where: {
        patient_id: patient[0].id,
      },
      order: [['createdAt', 'ASC']],
    });

    if (searchedResolution.length === 0) {
      throw new Api404Error(
        `This patient has no resolutions yet or resolution was deleted`,
      );
    }
    if (
      await this.expireTimeIsOut(
        searchedResolution[0].createdAt,
        searchedResolution[0].expire_time,
      )
    ) {
      await this.resolution.destroy({
        where: {
          patient_id: patient[0].id,
        },
      });
    }
    return searchedResolution[0].value;
  }

  async deleteResolution(name) {
    const patient = await this.patient.findAll({
      limit: 1,
      raw: true,
      where: {
        name: name,
      },
      order: [['createdAt', 'ASC']],
    });
    const searchedResolution = await this.resolution.findAll({
      limit: 1,
      raw: true,
      where: {
        patient_id: patient[0].id,
      },
      order: [['createdAt', 'ASC']],
    });
    if (searchedResolution.length === 0) {
      throw new Api404Error(`This patient has no resolutions`);
    }
    await this.resolution.destroy({
      where: {
        patient_id: patient[0].id,
      },
    });
    return searchedResolution[0].value;
  }

  async fetchRoles() {
    return this.role.findAll({});
  }

  async fetchDoctors(role) {
    const { id } = await this.role.findOne({
      raw: true,
      where: { title: role },
    });

    return this.doctor.findAll({ raw: true, where: { role_id: id } });
  }
}
