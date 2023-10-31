import CreatePollLayout from "../../layout/create.layout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LeftNavigationTemplate from "../../components/create/leftNav/leftNavigation.Template.component";
import { NextSeo } from "next-seo";
import DashboardLayout from "../../layout/dashboard.layout";
import DashboardComponent from "../../components/dashboard/Dashboard.component";

function Dashboard() {
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
          <DashboardLayout>
            <DashboardComponent />
          </DashboardLayout>
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

export default Dashboard;
