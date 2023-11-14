import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import DetailsView from "./DetailsView";
import QuickView from "./QuickView";
import MyRecentCreatedPollTemplate from "../create/rightNav/myRecentCreatedPoll.Template.component";

function DashboardComponent() {
  return (
    <>
      <DetailsView />
      <Grid container spacing={2} sx={{ my: 2, px: { xs: 2 } }}>
        <Grid item xs={12} sm={6} lg={4}>
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
              <MyRecentCreatedPollTemplate />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
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
              <MyRecentCreatedPollTemplate />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
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
              <MyRecentCreatedPollTemplate />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardComponent;
