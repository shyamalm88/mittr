import React from "react";
import CreatePollLayout from "../../../layout/create.layout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LeftNavigationTemplate from "../../../components/create/leftNav/leftNavigation.Template.component";
import RecentTemplate from "../../../components/create/leftNav/recent.Template.component";
import FollowingTemplate from "../../../components/create/leftNav/following.Template.component";
import AdSpaceTemplate from "../../../components/create/rightNav/adSpace.Template.component";
import MyRecentCreatedPollTemplate from "../../../components/create/rightNav/myRecentCreatedPoll.Template.component";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import PollOrSurveyProvider from "../../../providers/pollOrSurvey.provider";
import QuestionTypeProvider from "../../../providers/questionType.provider";
import AlternativeActions from "../../../components/alternativeActions/alternativeActions";
import NormalizedLayout from "../../../layout/normalized.layout";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import { GetStaticPaths, GetStaticProps } from "next";
import HttpService from "../../../services/@http/HttpClient";
import { ComponentInputProps } from "../../../types";
import PollDataEditProvider from "../../../providers/pollDataEdit.provider";
import { useEditDataContext } from "../../../hooks/useEditDataContext";
import Sticky from "react-sticky-el";
import { Drawer } from "@mui/material";
const EditWrapperSurvey = dynamic(
  () => import("../../../components/create/editWrapperSurvey.component")
);
const http = new HttpService();

const EditSurvey = ({ surveyEditDataForIndividualId }: ComponentInputProps) => {
  return (
    <>
      <NextSeo
        title="Mittr | Edit Survey"
        description="This Edit Survey page will help individual authenticated users to edit Surveys which they have created for their targeted audiences"
      />
      <PollDataEditProvider>
        <PollOrSurveyProvider>
          <Grid
            container
            xl
            spacing={1}
            justifyContent="center"
            direction="row"
            sx={{ mb: { xs: 2, lg: 0 } }}
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
                  <EditWrapperSurvey
                    editContextData={surveyEditDataForIndividualId}
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
              <Sticky
                boundaryElement=".MuiBox-root"
                hideOnBoundaryHit={false}
                stickyStyle={{
                  marginLeft: "0px",
                  marginTop: "60px",
                }}
              >
                <div
                  id="surveyActionMenuPortalDesktop"
                  style={{ width: "60px" }}
                />
              </Sticky>
            </Grid>
          </Grid>
          <Drawer
            open={true}
            anchor="bottom"
            variant="permanent"
            sx={{
              background: "#fff",
              height: { xs: "auto", lg: 0 },
              visibility: { xs: "visible", lg: "hidden" },
            }}
          >
            <div id="surveyActionMenuPortalMobile"></div>
          </Drawer>
        </PollOrSurveyProvider>
      </PollDataEditProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const resp: any = await http.get(`/survey`);
  const listQuestionData: Array<any> = resp;
  const surveyQuestions = listQuestionData?.map((item) => {
    return { id: item._id };
  });
  const paths = surveyQuestions.map((post) => ({
    params: { index: post.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postIndex = context.params?.index as string;

  try {
    const resp = await http.get(`/survey/${postIndex}`);
    const surveyEditDataForIndividualId = resp;
    return { props: { surveyEditDataForIndividualId } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default EditSurvey;
