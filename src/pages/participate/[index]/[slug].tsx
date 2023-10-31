import AnswerPollLayout from "../../../layout/answer.layout";
import { NextSeo } from "next-seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentInputProps } from "../../../types";
import PollAnswerProvider from "../../../providers/pollAnswer.provider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const AnswerPollWrapper = dynamic(
  () => import("../../../components/answer/answerPollWrapper.component")
);
import HttpService from "../../../services/@http/HttpClient";
import PollQuestionProvider from "../../../providers/pollQuestion.provider";
import AnswerSurveyLayout from "../../../layout/answerSurvey.layout";
import AnswerSurveyWrapper from "../../../components/answer/answerSurveyWrapper.component";
const http = new HttpService();

const ParticipateInSurvey = ({ surveyQuestionData }: ComponentInputProps) => {
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
          title={`Mittr | Take part in a survey featuring the question: ${surveyQuestionData.question}`}
          description={`This Poll Answer Page is designed to assist both logged-in and anonymous individuals in responding to polls, with the current poll featuring the following question ${surveyQuestionData.question}`}
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
  const resp: Array<any> = await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/survey`
  );
  const surveyData: Array<any> = resp;

  const surveyQuestions = surveyData.map((item) => {
    return { id: item._id, slug: item.questionSlug };
  });
  const paths = surveyQuestions.map((post) => ({
    params: { index: post.id, slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postIndex = context.params?.index as string;
  try {
    const resp = await http.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/survey/${postIndex}`
    );
    const surveyQuestionData = resp;
    console.log(surveyQuestionData);
    return { props: { surveyQuestionData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default ParticipateInSurvey;
