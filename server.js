const mongoose = require('mongoose');
const dotEnv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION 🔥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotEnv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;

// const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
const DB = process.env.DB_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successful');
  });
// .catch(err => console.log('ERROR')); // we will deal with this issue globally

const server = app.listen(port, () => {
  console.log(`server listening on port 3000`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED EXCEPTION 🔥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
