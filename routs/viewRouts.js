const express = require("express");
const Router = express.Router();
const authController = require("../controller/authController");
const viewController = require("./../controller/viewController");
Router.get("/", viewController.signin);
Router.get("/signup", viewController.signup);
Router.use(authController.protect);
Router.get("/dashboard", viewController.dashboard);
Router.get("/products",  viewController.products);
// Router.use(authController.restrictTo("admin"));
Router.get("/users", viewController.users);
Router.get("/profile", viewController.profile);
Router.get("/addsubcategory", viewController.addSubcategory);
Router.get("/editsubcategory", viewController.editsubcategory);
Router.get("/home", viewController.home);
Router.get("/category", viewController.category);
Router.get("/addslider", viewController.addslider);
Router.get("/addproducts", viewController.addproducts);
Router.get("/addcategory", viewController.addcategory);
// Router.get("/profile", viewController.);


module.exports = Router;
