const express = require("express");
const Survey = require("../models/Surveys");
const Options = require("../models/Options");
const AdditionalQuestions = require("../models/AdditionalQuestions");
const SurveySettings = require("../models/SurveySettings");

const router = express.Router();

router.get("/survey", async (req, res) => {
  const surveys = await Survey.find()
    .populate("options")
    .populate("additionalQuestions")
    .populate("settings");
  res.send(surveys);
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
