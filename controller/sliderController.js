const Slider = require("../models/sliderModel");
const catchAsync = require("../utils/catchAsync");

exports.addSlider = catchAsync(async (req, res) => {
    console.log(req.body);
    const { title } = req.body;
    const filename = req.file.filename;
    const slider = await Slider.create({ title,image:filename });
    res.status(201).json({
      data: slider,
    });
  });
  exports.deleteSlider = catchAsync(async (req, res) => {
    console.log(req.body);
    const { title } = req.body;
    const data = await Slider.findOneAndDelete({ title });
    res.status(200).json({
      data: data,
    });
  });
  exports.getAll = catchAsync(async (req, res) => {
      console.log("get all slider");
    const data = await Slider.find();
    // console.log({slider});
    res.status(200).json({
      data: data,
    });
  });
  exports.getAllActive = catchAsync(async (req, res) => {
    console.log("get all slider");
    const slider = await Slider.find({ active:true });
    console.log({slider});
    res.status(201).json({
      data: slider,
    });
  });
  exports.activeSwitch = catchAsync(async (req, res) => {
    const { title } = req.body;
    const {active}=await Slider.findOne({title});
    const status=active?false:true;
    const slider = await Slider.findByIdAndUpdate({ active:status });
    res.status(201).json({
      data: slider,
    });
  });
  