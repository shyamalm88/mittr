const express = require("express");
const Poll = require("../models/Polls");
const Images = require("../models/Images");
const Participations = require("../models/Participations");

const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const participateRouter = express.Router();

participateRouter.get("/", async (req, res) => {
  try {
    const answers = await Participations.find()
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

participateRouter.get("/:index", async (req, res) => {
  try {
    const answer = await Participations.findById(req.params.index)
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

participateRouter.post("", async (req, res) => {
  const answer = new Participations({
    questionID: req.body.selectedPrimaryQuestionId,
    selectedOption: req.body.selectedPrimaryQuestionOption,
    contributorIP: req.header("x-forwarded-for") || req.socket.remoteAddress,
    survey: req.body.survey,
    answeredByUserRef: req.body.answeredByUserRef.id,
  });
  try {
    const answerRes = await answer.save();
    res.send(answerRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = participateRouter;
