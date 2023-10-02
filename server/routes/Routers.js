const express = require("express");
const Survey = require("../models/Surveys");
const Options = require("../models/Options");
const Images = require("../models/Images");
const AdditionalQuestions = require("../models/AdditionalQuestions");
const SurveySettings = require("../models/SurveySettings");
const Answers = require("../models/Answers");
const AdditionalQuestionsAnswers = require("../models/AdditionalQuestionsAnswers");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

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

const router = express.Router();

router.get("/survey", async (req, res) => {
  try {
    const surveys = await Survey.find()
      .lean()
      .populate({
        path: "options",
        populate: {
          path: "imageId",
          model: "Images",
        },
      })
      .populate("questionImageRef")
      .populate("additionalQuestions")
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

router.get("/survey/answers", async (req, res) => {
  try {
    const surveys = await Answers.find().populate("additionalQuestionsAnswers");
    res.send(surveys);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

router.get("/survey/:index", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.index)
      .orFail()
      .populate({
        path: "options",
        populate: {
          path: "imageId",
          model: "Images",
        },
      })
      .populate("questionImageRef")
      .populate("additionalQuestions")
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

router.post("/survey", async (req, res) => {
  const optionRefId = await Options.insertMany(req.body.options);
  const additionalQuestionRefId = await insertAdditionalQuestions(req);
  const settingsRefId = await SurveySettings.collection.insertOne(
    req.body.settings
  );

  const survey = new Survey({
    question: req.body.question,
    votingType: req.body.votingType,
    questionImageRef: req.body.questionImageRef
      ? req.body.questionImageRef
      : null,
    surveyType: req.body.pollType,
    duration: req.body.duration,
    questionSlug: req.body.questionSlug,
    options: optionRefId,
    additionalQuestions: additionalQuestionRefId,
    settings: settingsRefId.insertedId,
  });

  try {
    const surveyRes = await survey.save();
    res.send(surveyRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/survey/image", upload.single("image"), async (req, res) => {
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

router.post("/survey/answer", async (req, res) => {
  const additionalQuestionsAnswersRefId =
    await AdditionalQuestionsAnswers.insertMany(
      req.body.additionalQuestionsAnswers
    );
  const answer = new Answers({
    questionID: req.body.questionID,
    selectedOption: req.body.selectedOption,
    contributorIP: req.header("x-forwarded-for") || req.socket.remoteAddress,
    additionalQuestionsAnswers: additionalQuestionsAnswersRefId,
  });
  try {
    const surveyRes = await answer.save();
    res.send(surveyRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

async function insertAdditionalQuestions(req) {
  return await AdditionalQuestions.insertMany(
    req.body.additionalQuestions
  ).then((res) => {
    const temp = insertAdditionalIds(res);
    return temp;
  });
}

const insertAdditionalIds = (res) => {
  const tempIds = [];
  for (const content of res) {
    tempIds.push(content._id);
  }
  return tempIds;
};
