const Apk = require("../models/apkModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
exports.signin= (req, res) => {
    res.render("signin",{layout:'logs'});
  };
 exports.signup= (req, res) => {
    res.render("signup",{layout:'logs'});
  };
  exports.dashboard= catchAsync( async (req, res) => {
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
   res.render("dashboard",{apk,downloads,totalApk});

  }
  else if(role==='user') {
    apk=await Apk.find({creator:name}).lean();
    downloads=apk.reduce((acc, current, index) => {
      totalApk=index+1;
     return acc+=current.downloads;
     },0);
     res.render("userdashboard",{apk,downloads,totalApk});
     }
  });

  exports.products= catchAsync( async (req, res) => {
    const {name,role}=req.user;
    let products;
    let admin={role:false};
  if (role==='admin'){
    products=await Apk.find().lean();
    admin.role=true;
    res.render("products",{products,admin});
  } 
  else if(role==='user'){
    products=await Apk.find({creator:name}).lean();
    res.render("userProducts",{products,admin});
  } 
  });
  exports.subcategory=catchAsync(async (req, res) => {
    res.render("subcategory");
  });
exports.home=catchAsync(async (req, res) => {
    res.render("home");
  });
  exports.addproducts=catchAsync(async (req, res) => {
    const cate=await Category.find().lean();
    console.log({cate});
    res.render("addproducts",{cate,path:'/img/'});
  });
  exports.addslider=catchAsync(async (req, res) => {
    res.render("addslider");
  });
  exports.users= catchAsync( async (req, res) => {
    const {role}=req.user;
    let users;
  if (role==='admin') users=await User.find({role:'user'}).lean();
  else if(role==='user')  res.render("notFound",{layout:'logs'});
    res.render("users",{users});
  });

   exports.category=catchAsync(async (req, res) => {
     const cate=await Category.find().lean();
    res.render("category",{cate});
  });

  exports.addcategory=catchAsync(async (req, res) => {
    res.render("addcategory");
  });

  exports.addSubcategory=catchAsync(async (req, res) => {
    const cate=await Category.find().lean();
    res.render("addsubcategory",{cate});
  });
  exports.editsubcategory=catchAsync(async (req, res) => {
    res.render("editsubcategory");
  });
exports.profile= catchAsync( async (req, res) => {
  const {name,email}=req.user;
    res.render("profile",{name,email});
  });
  