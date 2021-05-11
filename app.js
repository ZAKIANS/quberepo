const express = require("express");
const app = express();
const userRouts = require("./routs/userRouts");
const viewRouts = require("./routs/viewRouts");
const apkRouts = require("./routs/apkRouts");
const handlebars=require('express-handlebars');

app.set('view engine','hbs');
app.engine('hbs', handlebars({
layoutsDir: __dirname + '/views/layouts',
partialsDir:__dirname+'/views/partials',
defaultLayout:'index',
extname: 'hbs'
}));
app.use(express.json());
app.use(express.static('public'));
app.use("/user", userRouts);
app.use('/',viewRouts);
app.use("/apk", apkRouts);
// app.use('/static', express.static(path.join(__dirname, 'public')))
// views handlers



module.exports = app;
