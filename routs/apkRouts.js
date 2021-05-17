const express = require("express");
const Router = express.Router();
const apkController = require("../controller/apkController");
const authController = require("../controller/authController");
Router.get("/approved", apkController.allApprovedApk);
Router.get("/getAllCate", apkController.getAllCate);
Router.get("/download/:title", apkController.getDownload);

Router.use(authController.protect);
Router.post(
  "/addApk",
  // apkController.uploadMultiFiles.fields([
  //   { name: "image", maxCount: 1 },
  //   { name: "images", maxCount: 5 }
  // ]),
  // apkController.resizeImages,
  apkController.uploadImage,
  apkController.addApk
);
Router.patch(
  "/addApkFile/:title",
  apkController.uploadFile,
  apkController.uploadFileHandler
);

Router.patch(
  "/addApkImages/:title",
  apkController.uploadMultiImages.array("images", 5),
  apkController.saveImages,
  apkController.uploadImagesHandler
);

Router.get("/allApk", apkController.getAllApk);
Router.use(authController.restrictTo("admin"));
Router.get("/states", apkController.getStates);

Router.delete("/deleteApk/:title", apkController.deleteApk);
Router.patch("/updateActions", apkController.updateActions);
Router.post("/addCate", apkController.addCategory);
Router.get("/getcategory/:category", apkController.getcategory);

Router.patch(
  "/addSubCate/:cate",
  apkController.uploadImage,
  apkController.addSubCategory
);
Router.delete("/deleteCate/:cate", apkController.removeCategory);

// Router.post("/signin", apkController.signin);
// Router.get("/getAll", apkController.getAllUsers);
module.exports = Router;
