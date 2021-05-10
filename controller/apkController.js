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
const imageStorage = multer.memoryStorage();
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

exports.addApk = catchAsync(async (req, res, next) => {
 const filename=req.file? req.file.filename:'No_file.apk';
  const user = req.user;
  const {
    category,
    subCategory,
    title,
    developer,
    image,
    description,
    version,
    officialWebsite,
    editorChoice,
    trending,
    rapsodyApk,
  } = req.body;
  if (!title) return next(new AppError("please enter complete detail", 404));
  const apk = await Apk.create({
    creator:req.user.name,
    user,
    category,
    subCategory,
    title,
    developer,
    image,
    description,
    version,
    officialWebsite,
    editorChoice,
    trending,
    rapsodyApk,
    file:filename
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
  const newCate = req.params.newCate;
  await Category.create({
    category: newCate,
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
