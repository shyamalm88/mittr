const express = require("express");
const Survey = require("../models/Surveys");
const Options = require("../models/Options");
const AdditionalQuestions = require("../models/AdditionalQuestions");
const router = express.Router();

// Get all surveys
router.get("/survey", async (req, res) => {
  // console.log(req);
  const surveys = await Survey.find()
    .populate("options")
    .populate("additionalQuestions");
  res.send(surveys);
});

router.post("/survey", async (req, res) => {
  const optionRefId = await Options.insertMany(req.body.options);
  let tempAdditionalQRefId = [];
  const additionalQuestionRefId = await insertAdditionalQuestions(
    req,
    tempAdditionalQRefId
  );

  const survey = new Survey({
    question: req.body.question,
    surveyType: req.body.pollType,
    duration: req.body.duration,
    questionSlug: req.body.questionSlug,
    options: optionRefId,
    additionalQuestions: additionalQuestionRefId,
    // settings: {
    //   captureGender: req.body.settings.captureGender,
    //   closePollOnScheduledDate: req.body.settings.closePollOnScheduledDate,
    //   captureCity: req.body.settings.captureCity,
    // },
  });

  await survey.save();
  res.send(survey);
});

module.exports = router;

async function insertAdditionalQuestions(req, additionalQRefId) {
  // const tempQ = req.body.additionalQuestions;
  // const withChoice = tempQ.filter((item) => item.answerType == "choice");
  // const onlyChoices = withChoice.map((item) => item.choices);
  // const choicesRefId = await Choices.insertMany(onlyChoices.flat());
  // req.body.additionalQuestions.forEach((item) => {
  //   if (item.answerType === "choice") {
  //     item.choices = choicesRefId;
  //   }
  // });

  return await AdditionalQuestions.insertMany(
    req.body.additionalQuestions
  ).then((res) => {
    const temp = insertAdditionalIds(res, additionalQRefId);
    return temp;
  });
}

const insertAdditionalIds = (res, additionalQRefId) => {
  for (const content of res) {
    additionalQRefId.push(content._id);
  }
  return additionalQRefId;
};
