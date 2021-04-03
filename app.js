const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorContollers');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // introducing middleware
app.use(express.static(`${__dirname}/public`));

/*app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createTour)
app.patch('/api/v1/tours/:id', updateTour)
app.get('/api/v1/tours/:id', getTour);
app.delete('/api/v1/tours/:id', deleteTour);*/

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  /*const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;*/

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
