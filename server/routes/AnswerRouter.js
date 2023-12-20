const express = require("express");
const PollAnalytics = require("../models/PollAnalytics");
const Answers = require("../models/Answers");
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

  try {
    const answerRes = await answer.save();
    res.send(answerRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = answerRouter;
