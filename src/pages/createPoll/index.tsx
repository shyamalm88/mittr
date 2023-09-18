import CreatePollLayout from "../../layout/createPoll.layout";
import PollCreationProvider from "../../providers/pollCreation.provider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LeftNavigationTemplate from "../../components/createPoll/leftNav/leftNavigation.Template.component";
import RecentTemplate from "../../components/createPoll/leftNav/recent.Template.component";
import FollowingTemplate from "../../components/createPoll/leftNav/following.Template.component";
import AdSpaceTemplate from "../../components/createPoll/rightNav/adSpace.Template.component";
import MyRecentCreatedPollTemplate from "../../components/createPoll/rightNav/myRecentCreatedPoll.Template.component";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
const CreatePollWrapper = dynamic(
  () => import("../../components/createPoll/createPollWrapper.component")
);

const CreatePoll = () => {
  return (
    <PollCreationProvider>
      <NextSeo
        title="Mittr | Create Poll"
        description="This Create Poll page will help individual authenticated users to create polls for their targeted audiences"
      />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        direction="row-reverse"
      >
        <Grid item xs={2}>
          <Box
            sx={{
              mb: 2,
              display: { xs: "none", sm: "none", lg: "block" },
            }}
          >
            <CreatePollLayout>
              <MyRecentCreatedPollTemplate />
            </CreatePollLayout>
          </Box>
          <Box
            sx={{
              mb: 2,
              display: { xs: "none", sm: "none", lg: "block" },
            }}
          >
            <CreatePollLayout>
              <AdSpaceTemplate />
            </CreatePollLayout>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={8}>
          <CreatePollLayout>
            <CreatePollWrapper />
          </CreatePollLayout>
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
          <Box
            sx={{
              mb: 2,
              display: { xs: "none", sm: "none", lg: "block" },
            }}
          >
            <CreatePollLayout>
              <RecentTemplate />
              <FollowingTemplate />
            </CreatePollLayout>
          </Box>
        </Grid>
      </Grid>
    </PollCreationProvider>
  );
};

export default CreatePoll;
