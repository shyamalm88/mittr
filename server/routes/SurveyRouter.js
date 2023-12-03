const express = require("express");
const Survey = require("../models/Surveys");
const Images = require("../models/Images");
const Answers = require("../models/Answers");

const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const surveyRouter = express.Router();

const checkFileType = function (req, file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    // cb("Error: You can Only Upload Images!!");
    req.fileValidationError = "Forbidden extension";
    return cb(null, false, req.fileValidationError);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb);
  },
});

surveyRouter.get("/", async (req, res) => {
  try {
    const surveys = await Survey.find()
      .lean()
      .populate({
        path: "survey",
        populate: {
          path: "options",
          populate: {
            path: "imageId",
            model: "Images",
          },
        },
      })
      .populate({ path: "createdByUserRef", select: "-password" })
      .populate("settings");
    res.send(surveys);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

surveyRouter.get("/answers", async (req, res) => {
  try {
    const pollAnswers = await Answers.find().populate(
      "additionalQuestionsAnswers"
    );
    res.send(pollAnswers);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

surveyRouter.get("/:index", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.index)
      .orFail()
      .populate({
        path: "survey",
        populate: {
          path: "options",
          populate: {
            path: "imageId",
            model: "Images",
          },
        },
      })
      .populate({ path: "createdByUserRef", select: "-password" })
      .populate("settings");
    res.send(survey);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

surveyRouter.post("", async (req, res) => {
  // const surveyRefId = await SurveySection.insertMany(req.body.survey);
  // const settingsRefId = await SurveySettings.collection.insertOne(
  //   req.body.settings
  // );

  const survey = new Survey({
    title: req.body.title,
    description: req.body.description,
    survey: req.body.survey,
    duration: req.body.duration,
    questionSlug: req.body.questionSlug
      ? req.body.questionSlug
      : (Math.random() + 1).toString(36).substring(7),
    settings: req.body.settings,
    createdByUserRef: req.body.createdByUserRef,
  });

  try {
    const surveyRes = await survey.save();
    res.send(surveyRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

surveyRouter.post("/:index", async (req, res) => {
  // const surveyRefId = await SurveySection.insertMany(req.body.survey);
  // const settingsRefId = await SurveySettings.collection.insertOne(
  //   req.body.settings
  // );
  try {
    const existingSurvey = await Survey.findById(req.params.index).orFail();
    const survey = new Survey({
      title: req.body.title,
      description: req.body.description,
      survey: req.body.survey,
      duration: req.body.duration,
      questionSlug: req.body.questionSlug
        ? req.body.questionSlug
        : (Math.random() + 1).toString(36).substring(7),
      settings: req.body.settings,
      createdByUserRef: req.body.createdByUserRef,
    });

    const surveyObj = survey.toObject();
    delete surveyObj._id;
    if (existingSurvey) {
      const surveyRes = await Survey.findOneAndUpdate(
        { _id: existingSurvey._id },
        surveyObj
      );
      res.send(surveyRes);
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

surveyRouter.post("/image/upload", upload.single("image"), async (req, res) => {
  if (req.file) {
    const sharpObject = sharp(req.file.path);
    const dimensions = await sharpObject.metadata();
    req.file.dimensions = dimensions;
    const ImageRefId = await Images.collection.insertOne(req.file);
    req.file.imageId = ImageRefId.insertedId;
    res.send({ message: "Single file uploaded successfully", body: req.file });
  } else {
    if (req.fileValidationError) {
      res.status(400).send({
        message: "Please Upload a valid image",
        status: 400,
        details:
          "Only These types of files are supported 'jpeg|jpg|png|gif|svg'",
      });
    }
  }
});

surveyRouter.post("/answer", async (req, res) => {
  const answer = new Answers({
    questionID: req.body.questionID,
    selectedOption: req.body.selectedOption,
    contributorIP: req.header("x-forwarded-for") || req.socket.remoteAddress,
    additionalQuestionsAnswers: additionalQuestionsAnswersRefId,
  });
  try {
    const pollRes = await answer.save();
    res.send(pollRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = surveyRouter;
