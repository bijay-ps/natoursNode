const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require(`./../utils/appError`);
const sendEmail = require(`./../utils/email`);

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // 2. Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('incorrect email or password'), 401);
    }

    // 3. If everything is ok, send the token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token
    })
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1. Getting token and checking if it's there
  if(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
    token = req.headers['authorization'].split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in!! PLease login first.', 401));
  }

  // 2. Verifying token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError('This user no longer exists in system', 401));
  }

  // 4. Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User password was changed recently', 401));
  }

  // Grant access to protected route
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  }
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on POSTed on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('no user found with the provided email address', 404));
  }

  // 2. Generate random reset token
  const resetToken = user.createPasswordResetToken();

  console.log('reset token: ', resetToken);

  await user.save({ validateBeforeSave: false });

  // 3. Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`;

  const message =  `We received a request for password change. Follow the instructions below. If you didn't requested this, then please ignore this mail`;

  console.log(resetURL, message);

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token - VALID FOR 10 MINUTES',
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Please check your email'
    });
  } catch (e) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('Cannot send email right now. Please try again later', 500));
  }
});

exports.resetPassword = (req, res, next) => {

};