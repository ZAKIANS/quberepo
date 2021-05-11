const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Category = require("../models/categoryModel");
const Apk = require("../models/apkModel");
const multer=require('multer');
// const sharp=require('sharp');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/apk/');
  },
  filename: (req, file, cb) => {
    cb(null, `apk-${req.user.id}-${Date.now()}.apk`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application")) {
    cb(null, true);
  } else {
    cb(new AppError("No apk! Please upload only apk file", 400), false);
  }
};
// const imageStorage = multer.memoryStorage();

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/');
  },
  filename: (req, file, cb) => {
    // req.body.image= `image-${req.user.id}-${Date.now()}.jpeg`;
    cb(null, `image-${req.user.id}-${Date.now()}.jpeg`);
  },
});
// validate for image
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("No image! Please upload only images", 400), false);
  }
};
const uploadFile = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});
const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
});

exports.uploadImage=uploadImage.single('image');
exports.uploadFile=uploadFile.single('file');
exports.uploadFileHandler= catchAsync(async (req, res) => {
  const filename=req.file? req.file.filename:'No_file.apk';
  console.log({apk:req.file});
   const title = req.params.title;
const result=await Apk.findOneAndUpdate({title},{file:filename});
   res.status(201).json({
     data:result
   });
 });
exports.addApk = catchAsync(async (req, res, next) => {
  console.log({body:req.body,image:req.file});
  const pre_register = req.body.pre_register == 'true';
  const feature = req.body.feature == 'true';
  const trending = req.body.trending == 'true';
 const filename=req.file.filename;
  const user = req.user;
  const {
    category,
    subCategory,
    title,
    developer,
    description,
    version,
    website,
  } = req.body;
  if (!title|| !filename) return next(new AppError("please enter complete detail", 404));
  const apk = await Apk.create({
    creator:req.user.name,
    user,
    version,
    category,
    subCategory,
    title,
    developer,
    image:filename,
    description,
    officialWebsite:website,
    editorChoice:feature,
    trending:trending,
    rapsodyApk:pre_register
  });
  res.status(201).json({
    data: apk,
  });
});


exports.getAllApk = catchAsync(async (req, res) => {
  const allApk = await Apk.find();
  res.status(201).json({
    data: allApk,
  });
});
exports.updateActions = catchAsync(async (req, res) => {
  console.log(req.file);

   await Apk.findOneAndUpdate(
    { title: req.body.title },
    { actions: req.body.actions }
  );
  const updatedApk=await Apk.findOne(
    { title: req.body.title }
  );
  res.status(201).json({
    data: updatedApk,
  });
});

exports.addCategory = catchAsync(async (req, res) => {
  const {category,slug}=req.body;
  await Category.create({
    category,
    slug
  });
  const allCate = await Category.find();
  res.status(201).json({
    data: allCate,
  });

  // const apk = await Category.findOne({ "category.name": "games" });
  // console.log(apk);
  // const [...subCate] = apk.category.subCategory;
  // subCate.push("Fun");
  // const result = await Category.findByIdAndUpdate(apk._id, {
  //   "category.subCategory": subCate,
  // // });
  // const apk = await Category.find();
  // const names = apk.map((e) => e.category.name);
});

exports.addSubCategory = catchAsync(async (req, res) => {
  const { cate, newSubCate } = req.params;
  console.log(req.params);
  const category = await Category.findOne({ category: cate });
  category.subCategory.push(newSubCate);
  console.log(category);
  console.log(req.params);
  await Category.findByIdAndUpdate(category._id, {
    subCategory: category.subCategory,
  });
  const allCate = await Category.find();
  res.status(201).json({
    data: allCate,
  });
});

exports.removeCategory = catchAsync(async (req, res) => {
  const cate = req.params.cate;
  await Category.findOneAndRemove({ category: cate });
  const allCate = await Category.find();
  res.status(201).json({
    data: allCate,
  });
});
exports.getAllCate = catchAsync(async (req, res) => {
  const data = await Category.find();
  res.status(200).json({ data });
});

exports.getcategory = catchAsync(async (req, res) => {
const id=req.body.id;
  const data = await Category.findOne({id});
  console.log(id);
  console.log('///////////////////////////');
  console.log(data);
  res.status(200).json({ data });
});

// multiple files uploads
// const multerStorage = multer.memoryStorage();
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')||file.mimetype.startsWith('application') ) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Please upload  apk  or  images .', 400), false);
//   }
// };
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });
// exports.uploadFiles = upload.fields([
//   { name: 'image', maxCount: 1 },
//   { name: 'file', maxCount: 1 },
//   { name: 'images', maxCount: 10 }
// ]);

// // upload.single('image') req.file
// // upload.array('images', 5) req.files

// exports.resizeTourImages = catchAsync(async (req, res, next) => {
//   if (!req.files.image || !req.files.images) return next();

//   // 1) Cover image
//   req.body.image = `tour-${req.params.id}-${Date.now()}-img.jpeg`;
//   await sharp(req.files.image[0].buffer)
//     .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/tours/${req.body.imageCover}`);

//   // 2) Images
//   req.body.images = [];
//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/tours/${filename}`);
//       req.body.images.push(filename);
//     })
//   );
//   next();
// });

/////////////////

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image") || file.mimetype.startsWith("application")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only image or apks", false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });
// const uploadFiles = upload.array("images", 10); // limit to 10 images
// const uploadImages = (req, res, next) => {
//   uploadFiles(req, res, err => {
//     if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
//       if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
// console.log(err);      }
//     } else if (err) {
//       console.log(err); 
//       // handle other errors
//     }

//     // Everything is ok.
//     next();
//   });
// };
// const resizeImages = async (req, res, next) => {
//   if (!req.files) return next();
//   req.body.images = [];
//   await Promise.all(
//     req.files.map(async file => {
//       const newFilename = ...;

//       await sharp(file.buffer)
//         .resize(640, 320)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`upload/${newFilename}`);

//       req.body.images.push(newFilename);
//     })
//   );

//   next();
// };
/////////////////