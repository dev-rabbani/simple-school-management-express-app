const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

// userSchema
const userSchema = new Schema({
    firstName:String,
    lastName: String,
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password : String,
    userRole : {
        type: String,
        enum : ['student', 'teacher', 'librarain', 'office-assistant'],
        default: 'student'
    },
    activeStatus: {
        type: String,
        enum : ['active', 'inactive'],
        default: 'active'
    },
    isDeleted :{
        type:Boolean,
        default:false
        
    }
})

// password hashed before enter into db
userSchema.pre('save', function(next){
    let user = this;
    if(user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function(err,salt){
            if(err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err)
                }
                if(hash) {
                    user.password = hash
                }
                next()
            })
        })
    } else {
        next()
    }
});

module.exports = mongoose.model('User', userSchema);