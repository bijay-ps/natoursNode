const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// 1. Create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'email id is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email id']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password should be of minimum 8 characters'],
        maxlength: [50, 'Password should be of maximum 100 characters']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE & SAVE
            validator: function(el) {
                return this.password === el;
            },
            message: 'Password are not matching'
        }
    }
});

userSchema.pre('save', async function(next){
    if (!this.isModified()) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;