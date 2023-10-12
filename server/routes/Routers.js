const express = require("express");
const app = express();

const pollRouter = require("./PollRouter");
const surveyRouter = require("./SurveyRouter");

app.use("/poll", pollRouter);
app.use("/survey", surveyRouter);

module.exports = app;
