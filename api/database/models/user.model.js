const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken');
const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfjd7148924065";

const UserSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    // has the password only if the password has been changed or user is new
     if(!user.isModified('password')) return next();
     // generate the hash
     bcrypt.hash(user.password,null,null,function(err,hash) {
        if(err) return next(err);
        // change the password to the hasheds version
        user.password = hash;
        next();
     });
});


// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password)
{
    var user = this;
    return bcrypt.compareSync(password,user.password);
};


UserSchema.methods.generateAccessAuthToken = function () {
    const user = this;
    return new Promise((resolve, reject) => {
        // Create the JSON Web Token and return that
        jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                // there is an error
                reject();
            }
        })
    })
}


UserSchema.statics.findByCredentials = function (email, password) {
    let User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                }
                else {
                    reject();
                }
            })
        })
    })
}
const User = mongoose.model('User',UserSchema);
module.exports= {User};