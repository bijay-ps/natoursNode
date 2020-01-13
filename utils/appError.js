class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // here 'this' refers to current object and
    // 'this.constructor' refers to current class, AppError
    // so, this way when a new object is created and constructor function is called
    // then that function call is not gonna appear in stack trace.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
