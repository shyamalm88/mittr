const express = require("express");
const Answers = require("../models/Answers");
const PollAnalytics = require("../models/PollAnalytics");
const Polls = require("../models/Polls");
const requestIp = require("request-ip");
const moment = require("moment");

const ObjectId = require("mongodb").ObjectId;

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
      .populate({ path: "questionID" })
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

answerRouter.post("/getSliceData/:index", async (req, res) => {
  console.log("%%%%%%%%%%%", req.body);
  try {
    const answerSlicedData = await Answers.aggregate([
      {
        $match: {
          questionID: new ObjectId(req.params.index),
          selectedOption: {
            $in: req.body.pollOptions,
          },
        },
      },

      {
        $group: {
          _id: {
            selectedOption: "$selectedOption",
            time: {
              $dateToString: {
                format: "%Y-%m",
                date: "$createdAt",
              },
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.send(answerSlicedData);
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
          path: "options",
          populate: {
            path: "imageId",
            model: "Images",
          },
        },
      })
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
  const monthName = moment().format("llll");

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
    monthlySelectedPoll: [],
    monthlyDistribution: [
      ["Month", "Anonymous Users vote", "Logged-in Users vote"],
    ],
    answeredByUserRef: req.body.answeredByUserRef
      ? req.body.answeredByUserRef._id
      : null,
  });

  try {
    let answerAnalyticsRes = null;
    const pollsData = await Polls.findById(req.body.selectedPrimaryQuestionId);

    PollAnalytics.countDocuments({
      questionID: req.body.selectedPrimaryQuestionId,
    }).then(async (resp) => {
      if (resp === 0) {
        req.body.additionalQuestionsAnswers.forEach((im) => {
          if (im.selectedValue.hasOwnProperty("country")) {
            const idx = answerAnalytics.country.findIndex(
              (item) => item[0] === im.selectedValue.country.name
            );
            if (idx > 0) {
              answerAnalytics.country[idx] = [
                im.selectedValue.country.name,
                answerAnalytics.country[idx][1] + 1,
              ];
            } else {
              answerAnalytics.country.push([im.selectedValue.country.name, 1]);
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
          answerAnalytics.monthlyDistribution.push([monthName, 0, 1]);
        } else {
          answerAnalytics.monthlyDistribution.push([monthName, 1, 0]);
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
          item.totalVoteCount = voteCount + 1;
        });

        req.body.additionalQuestionsAnswers.forEach((im) => {
          if (im.selectedValue.hasOwnProperty("country")) {
            const idx = findRespAnswerAnalytics.country.findIndex(
              (item) => item[0] === im.selectedValue.country.name
            );
            if (idx > 0) {
              findRespAnswerAnalytics.country[idx] = [
                im.selectedValue.country.name,
                findRespAnswerAnalytics.country[idx][1] + 1,
              ];
            } else {
              findRespAnswerAnalytics.country.push([
                im.selectedValue.country.name,
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

        let idx = -1;
        for (
          let i = 1;
          i < findRespAnswerAnalytics.monthlyDistribution.length;
          i++
        ) {
          if (findRespAnswerAnalytics.monthlyDistribution[i]) {
            idx =
              findRespAnswerAnalytics.monthlyDistribution[i][0] === monthName
                ? i
                : -1;
          }
        }
        if (idx > 0) {
          if (req.body.answeredByUserRef) {
            findRespAnswerAnalytics.monthlyDistribution[idx] = [
              monthName,
              findRespAnswerAnalytics.monthlyDistribution[idx][1],
              findRespAnswerAnalytics.monthlyDistribution[idx][2] + 1,
            ];
          } else {
            findRespAnswerAnalytics.monthlyDistribution[idx] = [
              monthName,
              findRespAnswerAnalytics.monthlyDistribution[idx][1] + 1,
              findRespAnswerAnalytics.monthlyDistribution[idx][2],
            ];
          }
        } else {
          if (req.body.answeredByUserRef) {
            findRespAnswerAnalytics.monthlyDistribution.push([monthName, 0, 1]);
          } else {
            findRespAnswerAnalytics.monthlyDistribution.push([monthName, 1, 0]);
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
      const answerFilteredData = await Answers.aggregate([
        {
          $match: {
            questionID: new ObjectId(req.body.selectedPrimaryQuestionId),
          },
        },
        {
          $group: {
            _id: {
              selectedOption: "$selectedOption",
              time: {
                $dateToString: {
                  format: "%Y-%m",
                  date: "$createdAt",
                },
              },
            },
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      const tempArr = ["Date"];
      pollsData.options.forEach((item) => {
        tempArr.push(item.option);
      });

      const tempModifiedMonthlySelectedPoll = [tempArr];
      const groupByTimeFilteredData = answerFilteredData.reduce(
        (group, product) => {
          const { time } = product._id;
          group[time] = group[time] ?? [];
          group[time].push({
            selectedOption: product._id.selectedOption,
            count: product.count,
            time: product._id.time,
          });
          return group;
        },
        {}
      );
      let monthlySelectedPollFilteredData = Object.entries(
        groupByTimeFilteredData
      );

      monthlySelectedPollFilteredData.forEach((item) => {
        const temp = new Array(tempArr.length).fill(0);
        temp[0] = item[0];
        item[1].forEach((itm) => {
          const idx = tempArr.findIndex((it) => it === itm.selectedOption);
          temp[idx] = itm.count;
        });
        tempModifiedMonthlySelectedPoll.push(temp);
      });

      await PollAnalytics.findOneAndUpdate(
        {
          questionID: answerAnalytics.questionID,
        },
        { monthlySelectedPoll: tempModifiedMonthlySelectedPoll }
      );

      res.send(answerRes);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = answerRouter;
