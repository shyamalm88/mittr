import Grid from "@mui/material/Grid";

import { NextSeo } from "next-seo";
import { Box } from "@mui/material";
import CreatePollLayout from "../../layout/create.layout";
import LeftNavigationTemplate from "../../components/create/leftNav/leftNavigation.Template.component";
import AnalyticsLayout from "../../layout/analytics.layout";
import AnalyticsDashboard from "../../components/analyticsDashboard/AnalyticsDashboard";

function Analytics() {
  return (
    <>
      <NextSeo
        title="Mittr | Dashboard"
        description="This Dashboard page will help individual authenticated users to view their dashboard"
      />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        direction="row-reverse"
      >
        <Grid item xs={12} sm={12} lg={10}>
          <AnalyticsLayout>
            <AnalyticsDashboard />
          </AnalyticsLayout>
        </Grid>

        <Grid item xs={2}>
          <Box
            sx={{
              mb: 2,
              display: { xs: "none", sm: "none", lg: "block" },
            }}
          >
            <CreatePollLayout>
              <LeftNavigationTemplate />
            </CreatePollLayout>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Analytics;
