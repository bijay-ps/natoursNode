const mongoose = require('mongoose');
const dotEnv = require('dotenv');
dotEnv.config({path: './config.env'});
const fs = require('fs');
const Tour = require('./../../models/tourModel');

const port = process.env.PORT || 3000;

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => { console.log('DB connection successful') });

// READ JSON FILE
const tours = JSON.parse(fs.readFile('tours-simple.json', 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (e) {
    console.log(e);
  }
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (e) {
    console.log(e);
  }
};
