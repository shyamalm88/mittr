const express = require("express");
const Answers = require("../models/Answers");
const PollAnalytics = require("../models/PollAnalytics");
const requestIp = require("request-ip");

const answerRouter = express.Router();

answerRouter.get("/", async (req, res) => {
  try {
    const answers = await Answers.find()
      .lean()
      .populate({ path: "answeredByUserRef", select: "-password" });
    res.send(answers);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

answerRouter.get("/:index", async (req, res) => {
  try {
    const answer = await Answers.find({ questionID: req.params.index })
      .orFail()
      .populate({ path: "analyticsRef" })
      .populate({ path: "answeredByUserRef", select: "-password" });

    res.send(answer);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

answerRouter.post("", async (req, res) => {
  const answer = new Answers({
    questionID: req.body.selectedPrimaryQuestionId,
    selectedOption: req.body.selectedPrimaryQuestionOption,
    contributorIP: requestIp.getClientIp(req),
    additionalQuestionsAnswers: req.body.additionalQuestionsAnswers,
    answeredByUserRef: req.body.answeredByUserRef
      ? req.body.answeredByUserRef._id
      : null,
  });

  const answerAnalytics = new PollAnalytics({
    questionID: req.body.selectedPrimaryQuestionId,
    selectedPrimaryOption: [
      {
        selectedOption: req.body.selectedPrimaryQuestionOption,
        count: 1,
      },
    ],
    // additionalQuestionsAnswers: req.body.additionalQuestionsAnswers,
  });

  try {
    let answerAnalyticsRes = null;
    PollAnalytics.countDocuments({
      questionID: req.body.selectedPrimaryQuestionId,
    }).then(async (resp) => {
      if (resp === 0) {
        answerAnalyticsRes = await answerAnalytics.save();
        console.log("here");
      } else if (resp > 0) {
        const findRespAnswerAnalytics = await PollAnalytics.findOne({
          questionID: req.body.selectedPrimaryQuestionId,
        });
        const selectedOptionsIdx =
          findRespAnswerAnalytics.selectedPrimaryOption.findIndex(
            (item) =>
              item.selectedOption === req.body.selectedPrimaryQuestionOption
          );
        if (selectedOptionsIdx < 0) {
          findRespAnswerAnalytics.selectedPrimaryOption.push({
            selectedOption: req.body.selectedPrimaryQuestionOption,
            count: 1,
          });
        } else {
          findRespAnswerAnalytics.selectedPrimaryOption[
            selectedOptionsIdx
          ].count =
            findRespAnswerAnalytics.selectedPrimaryOption[selectedOptionsIdx]
              .count + 1;
        }
        answerAnalyticsRes = await PollAnalytics.findByIdAndUpdate(
          {
            _id: findRespAnswerAnalytics._id,
          },
          findRespAnswerAnalytics
        );
        console.log("there");
      }
      answer.analyticsRef = answerAnalyticsRes._id;
      console.log(answerAnalyticsRes);
      const answerRes = await answer.save();
      res.send(answerRes);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = answerRouter;
