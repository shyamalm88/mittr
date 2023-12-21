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

answerRouter.get("/pollAnalyticsData/:index", async (req, res) => {
  try {
    const analyticsAnswerResponse = await PollAnalytics.find({
      questionID: req.params.index,
    })
      .orFail()
      .lean()
      .populate({
        path: "questionID",
        populate: {
          path: "createdByUserRef",
          select: "-password",
        },
      });

    res.send(analyticsAnswerResponse);
  } catch (err) {
    res.status(404).send({
      message: "Document Not Found",
      status: 404,
      details: err.message,
    });
  }
});

answerRouter.post("", async (req, res) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date();
  let monthName = month[d.getMonth()];

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
        vote: 1,
      },
    ],
    genderRatio: [["Interactions By", "Count"]],
    country: [["Country", "User Interactions"]],
    monthlyDistribution: [
      ["Month", "Anonymous Users vote", "Logged-in Users vote"],
    ],
    answeredByUserRef: req.body.answeredByUserRef
      ? req.body.answeredByUserRef._id
      : null,
  });

  try {
    let answerAnalyticsRes = null;
    PollAnalytics.countDocuments({
      questionID: req.body.selectedPrimaryQuestionId,
    }).then(async (resp) => {
      if (resp === 0) {
        req.body.additionalQuestionsAnswers.forEach((im) => {
          if (im.selectedValue.hasOwnProperty("country")) {
            const idx = answerAnalytics.country.findIndex(
              (item) => item[0] === im.selectedValue.country.isoCode
            );
            if (idx > 0) {
              answerAnalytics.country[idx] = [
                im.selectedValue.country.isoCode,
                answerAnalytics.country[idx][1] + 1,
              ];
            } else {
              answerAnalytics.country.push([
                im.selectedValue.country.isoCode,
                1,
              ]);
            }
          }
          if (im.selectedValue.hasOwnProperty("gender")) {
            const idx = answerAnalytics.genderRatio.findIndex(
              (item) => item[0] === im.selectedValue.gender
            );
            if (idx > 0) {
              answerAnalytics.genderRatio[idx] = [
                im.selectedValue.gender,
                answerAnalytics.genderRatio[idx][1] + 1,
              ];
            } else {
              answerAnalytics.genderRatio.push([im.selectedValue.gender, 1]);
            }
          }
        });
        if (req.body.answeredByUserRef) {
          answerAnalytics.monthlyDistribution.push([monthName, 1, 0]);
        } else {
          answerAnalytics.monthlyDistribution.push([monthName, 0, 1]);
        }

        answerAnalytics.selectedPrimaryOption.forEach((item) => {
          item.totalVoteCount = 1;
        });

        answerAnalyticsRes = await answerAnalytics.save();
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
            vote: 1,
          });
        } else {
          findRespAnswerAnalytics.selectedPrimaryOption[
            selectedOptionsIdx
          ].vote =
            findRespAnswerAnalytics.selectedPrimaryOption[selectedOptionsIdx]
              .vote + 1;
        }
        const voteCount = await Answers.countDocuments({
          questionID: req.body.selectedPrimaryQuestionId,
        });
        findRespAnswerAnalytics.selectedPrimaryOption.forEach((item) => {
          item.totalVoteCount = voteCount;
        });
        req.body.additionalQuestionsAnswers.forEach((im) => {
          if (im.selectedValue.hasOwnProperty("country")) {
            const idx = findRespAnswerAnalytics.country.findIndex(
              (item) => item[0] === im.selectedValue.country.isoCode
            );
            if (idx > 0) {
              findRespAnswerAnalytics.country[idx] = [
                im.selectedValue.country.isoCode,
                findRespAnswerAnalytics.country[idx][1] + 1,
              ];
            } else {
              findRespAnswerAnalytics.country.push([
                im.selectedValue.country.isoCode,
                1,
              ]);
            }
          }
          if (im.selectedValue.hasOwnProperty("gender")) {
            const idx = findRespAnswerAnalytics.genderRatio.findIndex(
              (item) => item[0] === im.selectedValue.gender
            );
            if (idx > 0) {
              findRespAnswerAnalytics.genderRatio[idx] = [
                im.selectedValue.gender,
                findRespAnswerAnalytics.genderRatio[idx][1] + 1,
              ];
            } else {
              findRespAnswerAnalytics.genderRatio.push([
                im.selectedValue.gender,
                1,
              ]);
            }
          }
        });

        const idx = findRespAnswerAnalytics.monthlyDistribution.findIndex(
          (item) => item[0] === monthName
        );
        if (idx > 0) {
          if (req.body.answeredByUserRef) {
            findRespAnswerAnalytics.monthlyDistribution.push([
              monthName,
              findRespAnswerAnalytics.monthlyDistribution[idx][1] + 1,
              findRespAnswerAnalytics.monthlyDistribution[idx][2],
            ]);
          } else {
            findRespAnswerAnalytics.monthlyDistribution.push([
              monthName,
              findRespAnswerAnalytics.monthlyDistribution[idx][1],
              findRespAnswerAnalytics.monthlyDistribution[idx][2] + 1,
            ]);
          }
        } else {
          if (req.body.answeredByUserRef) {
            findRespAnswerAnalytics.monthlyDistribution.push([monthName, 1, 0]);
          } else {
            findRespAnswerAnalytics.monthlyDistribution.push([monthName, 0, 1]);
          }
        }

        answerAnalyticsRes = await PollAnalytics.findByIdAndUpdate(
          {
            _id: findRespAnswerAnalytics._id,
          },
          findRespAnswerAnalytics
        );
      }

      answer.analyticsRef = answerAnalyticsRes._id;
      const answerRes = await answer.save();

      res.send(answerRes);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = answerRouter;
