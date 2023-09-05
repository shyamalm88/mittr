const express = require("express");
const Survey = require("../models/Surveys");
const Options = require("../models/Options");
const router = express.Router();

// Get all surveys
router.get("/survey", async (req, res) => {
  console.log(req);
  const surveys = await Survey.find();
  res.send(surveys);
});

router.post("/survey", async (req, res) => {
  console.log(req.body);
  const survey = new Survey({
    question: req.body.question,
    surveyType: req.body.pollType,
    duration: req.body.duration,
    settings: {
      captureGender: req.body.settings.captureGender,
      closePollOnScheduledDate: req.body.settings.closePollOnScheduledDate,
      captureCity: req.body.settings.captureCity,
    },
  });
  req.body.options.forEach((item) => {
    survey.options.push(item);
  });
  req.body.additionalQuestions.forEach((item) => {
    survey.additionalQuestions.push(item);
  });

  await survey.save();
  res.send(survey);
});

module.exports = router;
