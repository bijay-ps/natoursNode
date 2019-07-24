const mongoose = require('mongoose');
const dotEnv = require('dotenv');
dotEnv.config({path: './config.env'});
const app = require('./app');

const port = process.env.PORT || 3000;

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => { console.log('DB connection successful') });

app.listen(port, () => {
  console.log(`server listening on port 3000`);
});
