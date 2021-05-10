const express = require("express");
const app = express();
// const path=require('path');

const userRouts = require("./routs/userRouts");
const apkRouts = require("./routs/apkRouts");
const handlebars=require('express-handlebars');
const authController=require('./controller/authController');
const catchAsync = require("./utils/catchAsync");
const Apk = require("./models/apkModel");
const User = require("./models/userModel");
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
app.use("/apk", apkRouts);

// app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(authController.protect);
app.get("/dashboard", catchAsync( async (req, res) => {
  const {name,role}=req.user;
  let apk;
  let totalApk=0;
  let downloads=0;
  
if (role==='admin'){
  apk=await Apk.find().lean();
 downloads=apk.reduce((acc, current, index) => {
  totalApk=index+1;
 return acc+=current.downloads;
 },0);
}
else if(role==='user') {
  apk=await Apk.find({creator:name}).lean();
  downloads=apk.reduce((acc, current, index) => {
    totalApk=index+1;
   return acc+=current.downloads;
   },0);
   }
  res.render("dashboard",{apk,downloads,totalApk});
}));
app.get("/products", catchAsync( async (req, res) => {
  const {name,role}=req.user;
  let products;
if (role==='admin') products=await Apk.find().lean();
else if(role==='user') products=await Apk.find({creator:name}).lean();
  res.render("products",{products});
}));

app.get("/home", (req, res) => {
  res.render("home");
});
// app.get("/products", (req, res) => {
  
//   res.render("products");
// });
app.get("/addproducts", (req, res) => {
  res.render("addproducts");
});
app.get("/addslider", (req, res) => {
  res.render("addslider");
});
app.get("/users", catchAsync( async (req, res) => {
  const {role}=req.user;
  let users;
if (role==='admin') users=await User.find({role:'user'}).lean();
else if(role==='user')  res.render("notFound",{layout:'logs'});
  res.render("users",{users});
}));
app.get("/category", (req, res) => {
  res.render("category");
});


app.get("/addcategory", (req, res) => {
  res.render("addcategory");
});
app.get("/addsubcategory", (req, res) => {
  res.render("addsubcategory");
});
app.get("/editsubcategory", (req, res) => {
  res.render("editsubcategory");
});
app.get("/profile", catchAsync( async (req, res) => {
const {name,email}=req.user;
  res.render("profile",{name,email});
}));

module.exports = app;
