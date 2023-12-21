import * as React from "react";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { usePollAnalyticsContext } from "../../hooks/usePollAnalyticsContext";
import { alpha, Box, Typography, Stack } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Image from "next/image";

const AnswerPollOptionAnalytics = () => {
  const { questionID, selectedPrimaryOption } = usePollAnalyticsContext();
  const [questionIDRef, setQuestionIDRef] = React.useState<any>();

  React.useEffect(() => {
    questionID.options.forEach((item: any) => {
      selectedPrimaryOption.forEach((itm: any) => {
        if (item.option === itm.selectedOption) {
          item.vote = itm.vote;
          item.totalVoteCount = itm.totalVoteCount;
        }
      });
    });
    setQuestionIDRef(questionID);
  }, [questionID]);

  return (
    <>
      <React.Fragment>
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
          }}
        >
          {questionIDRef?.options?.map((item: any, index: number) => {
            return (
              <>
                {questionIDRef.votingType === "image" ? (
                  <FormControl
                    sx={{ mb: 1, width: "100%" }}
                    variant="outlined"
                    key={index}
                  >
                    <Stack
                      direction="row"
                      useFlexGap
                      alignItems="middle"
                      alignContent="center"
                      justifyContent="flex-end"
                      spacing={1}
                    >
                      <Image
                        src={`${item.imageId.destination.split(".")[1]}/${
                          item.imageId.filename
                        }`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          minWidth: "300px",
                          maxWidth: "300px",
                          height: "auto",
                        }}
                        alt="asd"
                      />
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Stack direction="column" sx={{ width: "100%" }}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{
                              flexDirection: "column",
                              borderRadius: "4px",
                              background: (theme) =>
                                alpha(theme.palette.text.primary, 0.2),
                              position: "relative",
                            }}
                            disablePadding
                            disableGutters
                            className=""
                          >
                            <ListItemText
                              sx={{ width: "100%" }}
                              primary={
                                <React.Fragment>
                                  <Box
                                    sx={{
                                      background: (theme) =>
                                        alpha(theme.palette.info.light, 0.3),
                                      width: () =>
                                        Math.floor(
                                          (100 * item.vote) /
                                            item.totalVoteCount
                                        ) + "% !important",
                                      position: "absolute",
                                      top: 0,
                                      height: "100%",
                                      borderRadius: "4px",
                                      transitionProperty: "width",
                                      transitionDuration: "2s",
                                      transitionTimingFunction: "linear",
                                      transitionDelay: "1s",
                                    }}
                                    className="widthAnimationInitial"
                                  ></Box>
                                </React.Fragment>
                              }
                              disableTypography
                              secondary={
                                <React.Fragment>
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Stack
                                      direction="row"
                                      justifyContent="start"
                                      alignItems="center"
                                      spacing={1}
                                    >
                                      <Typography
                                        sx={{
                                          position: "relative",
                                          zIndex: "9",
                                          px: 2,
                                        }}
                                      >
                                        {item.option}
                                      </Typography>
                                      {item.selectedByUser && (
                                        <CheckCircleOutlinedIcon color="inherit" />
                                      )}
                                    </Stack>

                                    <Typography
                                      sx={{
                                        position: "relative",
                                        zIndex: "9",
                                        px: 2,
                                      }}
                                      variant="caption"
                                    >
                                      {item.vote &&
                                        `${
                                          Math.floor(
                                            (100 * item.vote) /
                                              item.totalVoteCount
                                          ) + "%"
                                        }`}
                                    </Typography>
                                  </Stack>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ mt: 1, px: 2 }}
                          >
                            {item.description}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </FormControl>
                ) : (
                  <FormControl
                    sx={{ mb: 1, width: "100%" }}
                    variant="outlined"
                    key={index}
                  >
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        flexDirection: "column",
                        borderRadius: "4px",
                        background: (theme) =>
                          alpha(theme.palette.text.primary, 0.2),
                        position: "relative",
                      }}
                      disablePadding
                      disableGutters
                      className=""
                    >
                      <ListItemText
                        sx={{ width: "100%" }}
                        primary={
                          <React.Fragment>
                            <Box
                              sx={{
                                background: (theme) =>
                                  alpha(theme.palette.info.light, 0.3),
                                width: () =>
                                  Math.floor(
                                    (100 * item.vote) / item.totalVoteCount
                                  ) + "% !important",
                                position: "absolute",
                                top: 0,
                                height: "100%",
                                borderRadius: "4px",
                                transitionProperty: "width",
                                transitionDuration: "2s",
                                transitionTimingFunction: "linear",
                                transitionDelay: "1s",
                              }}
                              className="widthAnimationInitial"
                            ></Box>
                          </React.Fragment>
                        }
                        disableTypography
                        secondary={
                          <React.Fragment>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              spacing={2}
                            >
                              <Stack
                                direction="row"
                                justifyContent="start"
                                alignItems="center"
                                spacing={1}
                              >
                                <Typography
                                  sx={{
                                    position: "relative",
                                    zIndex: "9",
                                    px: 2,
                                  }}
                                >
                                  {item.option}
                                </Typography>
                                {item.selectedByUser && (
                                  <CheckCircleOutlinedIcon color="inherit" />
                                )}
                              </Stack>

                              <Typography
                                sx={{
                                  position: "relative",
                                  zIndex: "9",
                                  px: 2,
                                }}
                                variant="caption"
                              >
                                {item.vote &&
                                  `${
                                    Math.floor(
                                      (100 * item.vote) / item.totalVoteCount
                                    ) + "%"
                                  }`}
                              </Typography>
                            </Stack>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </FormControl>
                )}
              </>
            );
          })}
        </List>
      </React.Fragment>
    </>
  );
};
export default AnswerPollOptionAnalytics;
