import sqlz from 'sequelize';
import crypto from 'crypto';
const tuto = {
    title: "Its super title",
    description: "Its super description",
}
const comy = {
    name: "Ivan Ivanich",
    text: "You are a dog"
}
const {
    Sequelize,
    DataTypes, 
    Model
} = sqlz;

const sequelize = new Sequelize("medstage", "root", "KevalaKumar1995", {
    dialect: "mysql",
    host: "localhost"
});

async function authenticationDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
async function createComment(sequelize, DataTypes) {
    const Comment = sequelize.define("comment", {
        name: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        }

    });
    await Comment.sync();

    return Comment;
};


async function createTutorial(sequelize, DataTypes) {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    });
    await Tutorial.sync();

    return Tutorial;
};

async function createTuto(Tutorial,tutorial) {
    return Tutorial.create({
      title: tutorial.title,
      description: tutorial.description,
    })
      .then((tutorial) => {
        console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
        return tutorial;
      })
      .catch((err) => {
        console.log(">> Error while creating tutorial: ", err);
      });
  };

  async function createComm(Comment,tutorialId, comment){
    return Comment.create({
      name: comment.name,
      text: comment.text,
      tutorialId: tutorialId,
    })
      .then((comment) => {
        console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
        return comment;
      })
      .catch((err) => {
        console.log(">> Error while creating comment: ", err);
      });
  };

authenticationDB();
const comments = await createComment(sequelize, DataTypes)
const tutorials = await createTutorial(sequelize, DataTypes)
// const Tutorial = sequelize.define("tutorial", {
//     title: {
//         type: DataTypes.STRING
//     },
//     description: {
//         type: DataTypes.STRING
//     }
// });
// const Comment = sequelize.define("comment", {
//     name: {
//         type: DataTypes.STRING
//     },
//     text: {
//         type: DataTypes.STRING
//     }

// });
tutorials.hasMany(comments);
comments.belongsTo(tutorials);
// await sequelize.sync().then(()=>{
//     console.log("Tables have been created");
//   }).catch(err=>console.log(err));
const tut4 = await createTuto(tutorials,{
    title: "Tut#1",
    description: "Tut#1 Description",
  });

const comment1 = await createComm(comments, tut4.id, {
    name: "bezkoder",
    text: "Good job!",
  });
// createTuto(tutorials,tuto);
// createComm(comments,1, comy)