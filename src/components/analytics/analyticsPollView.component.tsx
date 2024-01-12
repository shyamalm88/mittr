import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { usePollAnalyticsContext } from "../../hooks/usePollAnalyticsContext";
import AnswerPollOptionAnalytics from "./answerPollOptionAnalytics.component";
import { Avatar, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { usePollQuestionContext } from "../../hooks/usePollQuestionContext";
import NoProfileImage from "./../../images/img/noProfileImage.png";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import he from "he";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

const AnalyticsPollView = () => {
  const { questionID } = usePollAnalyticsContext();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDateDiff = React.useMemo(() => {
    if (questionID.duration) {
      let d1 = moment(moment().format("YYYY-MM-DD"));
      let d2 = moment(moment(questionID.duration).format("YYYY-MM-DD"));
      return d2.diff(d1, "days") < 0 ? "Poll ended on " : "Poll will end on ";
    }
  }, [questionID.duration]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            px: 2,
            py: 1,
          }}
          className="customPaper"
        >
          <div
            style={{
              fontSize: "1.2rem",
            }}
            className="typography"
            dangerouslySetInnerHTML={{
              __html: he.decode(questionID ? questionID.question : ""),
            }}
          ></div>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Stack
              direction={smallScreen ? "row" : "column"}
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "rgb(156, 163, 175)",
              }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                {questionID.createdByUserRef?.profileImgUrl ? (
                  <Avatar
                    alt={questionID.createdByUserRef?.fullName}
                    src={questionID.createdByUserRef?.profileImgUrl}
                    sx={{ width: 24, height: 24 }}
                  />
                ) : (
                  <Image
                    src={NoProfileImage}
                    alt={questionID.createdByUserRef?.fullName}
                    width={24}
                    height={24}
                  />
                )}

                <Typography
                  variant="body2"
                  component="small"
                  sx={{
                    fontSize: "1.2rem",
                    color: "inherit",
                  }}
                >
                  {questionID.createdByUserRef?.fullName}
                </Typography>
              </Stack>
              {questionID.duration && (
                <Tooltip
                  arrow
                  title={
                    <React.Fragment>
                      {questionID.createdAt && (
                        <Typography variant="body2" component="small">
                          Poll started at{" "}
                          {moment(questionID.createdAt).format(
                            "DD/MM/YYYY, hh:mm a"
                          )}
                          ,
                        </Typography>
                      )}

                      <br />
                      {questionID.duration && (
                        <Typography variant="body2" component="small">
                          {handleDateDiff}
                          {moment(questionID.duration).format(
                            "DD/MM/YYYY, hh:mm a"
                          )}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                >
                  <Typography variant="body2" component="small">
                    <React.Fragment>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" />
                        {questionID.duration && (
                          <ReactTimeAgo
                            date={questionID.duration}
                            tooltip={false}
                            locale="en-US"
                          />
                        )}
                      </Stack>
                    </React.Fragment>
                  </Typography>
                </Tooltip>
              )}
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            px: 2,
            py: 1,
          }}
        >
          {}
          <AnswerPollOptionAnalytics />
        </Box>
      </Box>
    </>
  );
};

export default AnalyticsPollView;
