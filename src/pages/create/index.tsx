import CreatePollLayout from "../../layout/create.layout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LeftNavigationTemplate from "../../components/create/leftNav/leftNavigation.Template.component";
import RecentTemplate from "../../components/create/leftNav/recent.Template.component";
import FollowingTemplate from "../../components/create/leftNav/following.Template.component";
import AdSpaceTemplate from "../../components/create/rightNav/adSpace.Template.component";
import MyRecentCreatedPollTemplate from "../../components/create/rightNav/myRecentCreatedPoll.Template.component";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import PollOrSurveyProvider from "../../providers/pollOrSurvey.provider";
import QuestionTypeProvider from "../../providers/questionType.provider";
const CreatePollWrapper = dynamic(
  () => import("../../components/create/createWrapper.component")
);

const CreatePoll = () => {
  return (
    <>
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
        <Grid item xs={1}>
          <Box
            sx={{
              mb: 2,
              display: { xs: "none", sm: "none", lg: "block" },
            }}
          >
            <CreatePollLayout>{}</CreatePollLayout>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={8}>
          <CreatePollLayout>
            <PollOrSurveyProvider>
              <QuestionTypeProvider>
                <CreatePollWrapper />
              </QuestionTypeProvider>
            </PollOrSurveyProvider>
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
    </>
  );
};

export default CreatePoll;
