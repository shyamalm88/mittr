const express = require("express");
const Survey = require("../models/Surveys");
const Options = require("../models/Options");
const AdditionalQuestions = require("../models/AdditionalQuestions");
const SurveySettings = require("../models/SurveySettings");
const Answers = require("../models/Answers");
const AdditionalQuestionsAnswers = require("../models/AdditionalQuestionsAnswers");
const { areArraysEqual } = require("@mui/base");

const router = express.Router();

router.get("/survey", async (req, res) => {
  try {
    const surveys = await Survey.find()
      .populate("options")
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
      .populate("options")
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
