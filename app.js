require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const expressSession = require("express-session");
const { default: chalk } = require("chalk");

app.set("view engine", ejs);

const { PORT } = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI || 8080;

const UserController = require("./controllers/user");
const User = require("./models/User");

//Connection the db
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.on("error", (errList) => {
    console.log(errList);
    console.log(
        "MongoDB connection error occurred. Please ensure that MongoDB is running!",
        chalk.red("✗")
    );
    process.exit();
})

//Add the request.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Add a user session
app.use(expressSession({ secret: 'SuperSecretNulSession191', cookie: {ma}}))

///Add in a global user session & page authorisation
app.use("*", async (req, res, next) => {

})

//Used for authentication
const authMiddleWare = async (req, res, next) => {
    const user_obj = await User.findById(req.session.user);
    if (!user_obj) {
        return res.redirect("/login");
    }
    next();
}

//Using authentcation middleware
app.get("/", authMiddleWare, (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register", { _pageName: "register", errors: {} })
})
app.post("/register", UserController.login);

app.listen(PORT, ()=> {
    console.log(`Example app listening at http://localhost:${PORT}`);
});