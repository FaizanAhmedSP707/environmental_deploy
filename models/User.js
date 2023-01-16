const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        fullname: { type: String, required: [true, 'Full name is required'] },
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] }
    },
    { timestamps: true }
);

// This is a hook to hash the user's password before storing it in the database
userSchema.pre('save', async function (next) {
    // console.log(this.password) --> don't use
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        //temp throw exception here --> throw Error('could not hash password');
    }
})

//Export this module for use
module.exports = mongoose.model("User", userSchema);