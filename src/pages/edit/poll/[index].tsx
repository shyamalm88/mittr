import CreatePollLayout from "../../../layout/create.layout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LeftNavigationTemplate from "../../../components/create/leftNav/leftNavigation.Template.component";
import RecentTemplate from "../../../components/create/leftNav/recent.Template.component";
import FollowingTemplate from "../../../components/create/leftNav/following.Template.component";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import PollOrSurveyProvider from "../../../providers/pollOrSurvey.provider";
import QuestionTypeProvider from "../../../providers/questionType.provider";
import AlternativeActions from "../../../components/alternativeActions/alternativeActions";
import NormalizedLayout from "../../../layout/normalized.layout";
import { GetStaticPaths, GetStaticProps } from "next";
import HttpService from "../../../services/@http/HttpClient";
import { ComponentInputProps } from "../../../types";
import PollDataEditProvider from "../../../providers/pollDataEdit.provider";
const EditWrapperPoll = dynamic(
  () => import("../../../components/create/editWrapperPoll.component")
);
const http = new HttpService();

const EditPoll = ({ pollEditDataForIndividualId }: ComponentInputProps) => {
  return (
    <>
      <NextSeo
        title="Mittr | Edit Poll"
        description="This Edit Poll page will help individual authenticated users to edit polls which they have created for their targeted audiences"
      />
      <PollDataEditProvider>
        <PollOrSurveyProvider>
          <Grid
            container
            xl
            spacing={1}
            justifyContent="center"
            direction="row"
          >
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

            <Grid item xs={12} sm={12} lg={8}>
              <CreatePollLayout>
                <QuestionTypeProvider>
                  <EditWrapperPoll
                    editContextData={pollEditDataForIndividualId}
                  />
                </QuestionTypeProvider>
              </CreatePollLayout>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  mb: 2,
                  display: { xs: "none", sm: "none", lg: "block" },
                }}
              >
                <NormalizedLayout>
                  <AlternativeActions />
                </NormalizedLayout>
              </Box>
            </Grid>
          </Grid>
        </PollOrSurveyProvider>
      </PollDataEditProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const resp: any = await http.get(`/poll`);
  const listQuestionData: Array<any> = resp;
  const pollQuestions = listQuestionData?.map((item) => {
    return { id: item._id };
  });
  const paths = pollQuestions.map((post) => ({
    params: { index: post.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postIndex = context.params?.index as string;

  try {
    const resp = await http.get(`/poll/${postIndex}`);

    const pollEditDataForIndividualId = resp;
    return { props: { pollEditDataForIndividualId } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default EditPoll;
