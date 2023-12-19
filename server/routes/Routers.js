const express = require("express");
const app = express();

const pollRouter = require("./PollRouter");
const surveyRouter = require("./SurveyRouter");
const answerRouter = require("./AnswerRouter");
const participateRouter = require("./ParticipateRouter");
const { authRouter } = require("./AuthRouter");

app.use("/poll", pollRouter);
app.use("/survey", surveyRouter);
app.use("/answer", answerRouter);
app.use("/participation", participateRouter);
app.use("/auth", authRouter);

module.exports = app;
