# Patient management app

The app allows you to enroll patients in a queue, track and edit a resolution.

## Patient Features

- Adding a new patient to the queue
- Search for a resolution by patient name key

## Doctor Features

- Adding a resolution
- Updating a resolution
- Deleting a resolution
- Manage patient queues

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd Node.js-Lab-Project
npm install
npm run dev
```

## Test

Before running the tests, you must select the type of storage. The application implements 3 types of data storage.

```sh
1. Go into the file package.json
2. Find the right line:
"scripts": {
    "start": "node app.js",
    "dev": "export NODE_DB=sqlDB && export NODE_ENV=dev && nodemon app.js",
    "test": "export NODE_DB=sqlDB && export NODE_ENV=test && jest"
  },
3. In the "test" line, the NODE_DB parameter must be one of the following: inMemoryDB // redisDB // sqlDB
4.  After selecting the repository in the command line of the root directory you must write the command "npm run test" or "npm test". This will run the necessary tests, implemented with the help of the Jest library
```

> Note: At the moment the application is running on one server, without separating the front-end and back-end parts.
> After starting the server, the following pages work
> Patient page: http://localhost:3000/static/patient.html
> Doctor's page: http://localhost:3000/static/doctor.html
