import React from "react";
import AnswerPollLayout from "../../../layout/answer.layout";
import PollQuestionProvider from "../../../providers/pollQuestion.provider";
import { NextSeo } from "next-seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentInputProps } from "../../../types";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const AnswerPollWrapper = dynamic(
  () => import("../../../components/answer/poll/answerPollWrapper.component")
);
import HttpService from "../../../services/@http/HttpClient";
import he from "he";
const http = new HttpService();

const AnswerPoll = ({ questionData }: ComponentInputProps) => {
  const [questionWithoutHtml, setQuestionWithoutHtml] = React.useState("");
  React.useEffect(() => {
    if (questionData) {
      setQuestionWithoutHtml(
        he.decode(questionData?.question).replace(/(<([^>]+)>)/gi, "")
      );
    }
  }, [questionData]);

  if (!questionData) {
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
      <NextSeo
        title={`Mittr | Take part in a survey featuring the question: ${questionWithoutHtml}`}
        description={`This Poll Answer Page is designed to assist both logged-in and anonymous individuals in responding to polls, with the current poll featuring the following question ${questionWithoutHtml}`}
      />
      <PollQuestionProvider question={questionData}>
        <AnswerPollLayout>
          <AnswerPollWrapper />
        </AnswerPollLayout>
      </PollQuestionProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const resp: any = await http.get(`/poll`);
  const listQuestionData: Array<any> = resp;
  const pollQuestions = listQuestionData?.map((item) => {
    return { id: item._id, slug: item.questionSlug };
  });
  const paths = pollQuestions.map((post) => ({
    params: { index: post.id, slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postIndex = context.params?.index as string;

  try {
    const resp = await http.get(`/poll/${postIndex}`);

    const questionData = resp;
    return { props: { questionData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default AnswerPoll;
