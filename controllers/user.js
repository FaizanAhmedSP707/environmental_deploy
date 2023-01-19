const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const User = await User.findOne({ email: req.body.email });
        if(!user) {
            res.render('login', { _pageName: "login", errors: { message: 'Email not found' }, message: null})
            return;
        }

        const matcher = await bcrypt.compare(req.body.password, user.password);
        if(matcher) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/history');
            
            return;
        }

        // The single line of code also needs work
        res.render('login', { _pageName: "login", errors: { message: 'Incorrect password has been entered' }, message: null })


    } catch (e) {
        console.log('Error');
        console.log(e);
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.register = async (req, res) => {
    try {
        if(req.body.confirm_password == req.body.password){
            const user = new User({ email: req.body.email, password: req.body.password, fullname: req.body.fullname });
            await user.save();
            res.redirect('/login/?message=Account has been created - please sign in')
        }
        else {
            console.log("passwords don't match!");
            res.render('register', { _pageName: "register", errors: { message: "passwords don't match" }});
        }
    } catch (e) {
        console.log("error: ---")
        console.log(e);
        //Checking if errors match:
        if (e.error || e.errors) {
            console.log("Mongoose error (mongoose)");
            res.render('regsiter', { _pageName: "register", errors: e.error || e.errors || e.MongoError })
            return;
        } //Checking for certain error codes to display a different error message
        else if((e.name==='MongoError' || e.name === 'MongoServerError') && e.code === 1000){
            res.render('register', { _pageName: "register", errors: {message: "Duplicate email check Error"}})
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e)
        });
    }
}