import AnswerPollLayout from "../../../layout/answer.layout";
import { NextSeo } from "next-seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentInputProps } from "../../../types";
import PollAnswerProvider from "../../../providers/pollAnswer.provider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const AnswerSurveyWrapper = dynamic(
  () => import("../../../components/answer/answerSurveyWrapper.component")
);
const PollQuestionProvider = dynamic(
  () => import("../../../providers/pollQuestion.provider")
);
import HttpService from "../../../services/@http/HttpClient";
import AnswerSurveyLayout from "../../../layout/answerSurvey.layout";
import he from "he";
const http = new HttpService();

const ParticipateInSurvey = ({ surveyQuestionData }: ComponentInputProps) => {
  const questionWithoutHtml = he
    .decode(surveyQuestionData.title)
    .replace(/(<([^>]+)>)/gi, "");
  if (!surveyQuestionData) {
    return (
      <AnswerPollLayout>
        <Stack spacing={1}>
          <Skeleton variant="rounded" sx={{ fontSize: "4rem" }} />
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems={"center"}
          >
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={"100%"} height={40} />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems={"center"}
          >
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={"100%"} height={40} />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems={"center"}
          >
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={"100%"} height={40} />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems={"center"}
          >
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={"100%"} height={40} />
          </Stack>
        </Stack>
      </AnswerPollLayout>
    );
  }
  return (
    <>
      <PollAnswerProvider>
        <NextSeo
          title={`Mittr | Take part in a survey featuring the question: ${questionWithoutHtml}`}
          description={`This Survey Answer Page is designed to assist both logged-in and anonymous individuals in responding to surveys, with the current survey featuring the following title ${questionWithoutHtml}`}
        />
        <PollQuestionProvider question={surveyQuestionData}>
          <AnswerSurveyLayout>
            <AnswerSurveyWrapper />
          </AnswerSurveyLayout>
        </PollQuestionProvider>
      </PollAnswerProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const resp: Array<any> = await http.get(`/survey`);
  const surveyData: Array<any> = resp;

  const surveyQuestions = surveyData.map((item) => {
    return { id: item._id, slug: item.questionSlug };
  });
  const paths = surveyQuestions.map((post) => ({
    params: { index: post.id, slug: post.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postIndex = (context.params as any).index as string;
  try {
    const resp = await http.get(`/survey/${postIndex}`);
    const surveyQuestionData = resp;
    return { props: { surveyQuestionData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default ParticipateInSurvey;
