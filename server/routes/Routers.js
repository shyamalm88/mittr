const express = require("express");
const app = express();

const pollRouter = require("./PollRouter");
const surveyRouter = require("./SurveyRouter");
const { authRouter } = require("./AuthRouter");

app.use("/poll", pollRouter);
app.use("/survey", surveyRouter);
app.use("/auth", authRouter);

module.exports = app;
