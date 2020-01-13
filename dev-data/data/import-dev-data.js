const mongoose = require('mongoose');
const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config({ path: './config.env' });
const fs = require('fs');
const Tour = require('./../../models/tourModel');

const port = process.env.PORT || 3000;

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
// const DB = process.env.DB_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful');
  });

// READ JSON FILE
// const tours = JSON.parse(fs.readFileSync(path.join(__dirname, 'tours-simple.json'), 'utf-8'));
const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tours.json'), 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
