const express = require("express");
const Router = express.Router();
const apkController = require("../controller/apkController");
const authController = require("../controller/authController");
// this comment is for heroku casing error
Router.use(authController.protect);
Router.post("/addApk",apkController.uploadImage, apkController.addApk);
Router.patch("/addApkFile/:title",apkController.uploadFile,apkController.uploadFileHandler, apkController.addApk);
Router.get("/allApk", apkController.getAllApk);
Router.use(authController.restrictTo("admin"));
Router.get("/getAllCate", apkController.getAllCate);
Router.patch("/updateActions", apkController.updateActions);
Router.post("/addCate", apkController.addCategory);
Router.get("/getcategory", apkController.getcategory);

Router.patch("/addSubCate/:cate/:newSubCate", apkController.addSubCategory);
Router.delete("/deleteCate/:cate", apkController.removeCategory);

// Router.post("/signin", apkController.signin);
// Router.get("/getAll", apkController.getAllUsers);
module.exports = Router;
