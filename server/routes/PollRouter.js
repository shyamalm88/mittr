const express = require("express");
const Poll = require("../models/Polls");
const Images = require("../models/Images");
const Answers = require("../models/Answers");

const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const pollRouter = express.Router();

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

pollRouter.get("/", async (req, res) => {
  try {
    const polls = await Poll.find()
      .lean()
      .populate({
        path: "options",
        populate: {
          path: "imageId",
          model: "Images",
        },
      })

      .populate({ path: "createdByUserRef", select: "-password" })
      .populate("questionImageRef")
      .populate("additionalQuestions")
      .populate("settings");
    res.send(polls);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

pollRouter.get("/answers", async (req, res) => {
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

pollRouter.get("/:index", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.index)
      .orFail()
      .populate({
        path: "options",
        populate: {
          path: "imageId",
          model: "Images",
        },
      })
      .populate({ path: "createdByUserRef", select: "-password" })
      .populate("questionImageRef")
      .populate("additionalQuestions")
      .populate("settings");
    res.send(poll);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

pollRouter.post("", async (req, res) => {
  const poll = new Poll({
    question: req.body.question,
    votingType: req.body.votingType,
    questionImageRef: req.body.questionImageRef
      ? req.body.questionImageRef
      : null,
    surveyType: req.body.pollType,
    duration: req.body.duration,
    questionSlug: req.body.questionSlug
      ? req.body.questionSlug
      : (Math.random() + 1).toString(36).substring(7),
    options: req.body.options,
    additionalQuestions: req.body.additionalQuestions,
    settings: req.body.settings,
    createdByUserRef: req.body.createdByUserRef,
  });

  try {
    const pollRes = await poll.save();
    res.send(pollRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

pollRouter.post("/:index", async (req, res) => {
  try {
    const existingPoll = await Poll.findById(req.params.index).orFail();

    const poll = new Poll({
      question: req.body.question,
      votingType: req.body.votingType,
      questionImageRef: req.body.questionImageRef
        ? req.body.questionImageRef
        : null,
      surveyType: req.body.pollType,
      duration: req.body.duration,
      questionSlug: req.body.questionSlug
        ? req.body.questionSlug
        : (Math.random() + 1).toString(36).substring(7),
      options: req.body.options,
      additionalQuestions: req.body.additionalQuestions,
      settings: req.body.settings,
      createdByUserRef: req.body.createdByUserRef,
    });

    const pollObj = poll.toObject();
    delete pollObj._id;

    const pollRes = await Poll.findOneAndUpdate(
      { _id: existingPoll._id },
      pollObj
    );
    res.send(pollRes);
  } catch (err) {
    res.status(500).json(error);
  }
});

pollRouter.post("/answer", async (req, res) => {
  const answer = new Answers({
    questionID: req.body.selectedPrimaryQuestionId,
    selectedOption: req.body.selectedPrimaryQuestionOption,
    contributorIP: req.header("x-forwarded-for") || req.socket.remoteAddress,
    additionalQuestionsAnswers: additionalQuestionsAnswers,
    answeredByUserRef: req.body.answeredByUserRef.id,
  });
  try {
    const pollRes = await answer.save();
    res.send(pollRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

pollRouter.post("/image/upload", upload.single("image"), async (req, res) => {
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

module.exports = pollRouter;
