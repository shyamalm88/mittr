import React from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import DetailsView from "./DetailsView";
import QuickView from "./QuickView";
import MyRecentCreatedPollTemplate from "../create/rightNav/myRecentCreatedPoll.Template.component";
import RecommendedPollTemplate from "../create/rightNav/RecommendedPoll.Template.component";
import HttpService from "../../services/@http/HttpClient";

function DashboardComponent() {
  const http = new HttpService();
  const [pollSurveyAllDatCreatedByMe, setPollSurveyAllDatCreatedByMe] =
    React.useState([]);

  async function getAllSurveysCreatedByMe() {
    try {
      let resp = await http.get("/survey");
      resp = (resp as any).map((x: any) => ({ ...x, type: "survey" }));
      return Promise.resolve(resp);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function getAllPollsCreatedByMe() {
    try {
      let resp = await http.get("/poll");
      resp = (resp as any).map((x: any) => ({ ...x, type: "poll" }));
      return Promise.resolve(resp);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  React.useEffect(() => {
    let respArrayMargeData: any = [];
    Promise.allSettled([
      getAllSurveysCreatedByMe(),
      getAllPollsCreatedByMe(),
    ]).then((res) => {
      res.forEach((item: any) => {
        if (item.status === "fulfilled") {
          respArrayMargeData = [...respArrayMargeData, ...item.value];
        }
      });
      setPollSurveyAllDatCreatedByMe(respArrayMargeData);
    });
  }, []);

  return (
    <>
      <DetailsView />
      <Grid container spacing={2} sx={{ my: 2, px: { xs: 2 } }}>
        <Grid item xs={12}>
          <Card
            sx={{
              overflow: "visible",
              position: "relative",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <CardHeader
              sx={{ pb: 0 }}
              title={
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 500 }}
                >
                  Recently Created
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <MyRecentCreatedPollTemplate data={pollSurveyAllDatCreatedByMe} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Card
            sx={{
              overflow: "visible",
              position: "relative",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <CardHeader
              sx={{ pb: 0 }}
              title={
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 500 }}
                >
                  Recommended
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <RecommendedPollTemplate />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Card
            sx={{
              overflow: "visible",
              position: "relative",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <CardHeader
              sx={{ pb: 0 }}
              title={
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 500 }}
                >
                  Trending
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <RecommendedPollTemplate />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardComponent;
