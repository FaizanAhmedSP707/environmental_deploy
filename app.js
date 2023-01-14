require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", ejs);

const { WEB_PORT } = process.env;

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(WEB_PORT, ()=> {
    console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});