import React from "react";
import AnswerPollLayout from "../../layout/answerPoll.layout";
import PollQuestionProvider from "../../providers/pollQuestion.provider";
import axios from "axios";
import { NextSeo } from "next-seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentInputProps } from "../../types";
import PollAnswerProvider from "../../providers/pollAnswer.provider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const AnswerPollWrapper = dynamic(
  () => import("../../components/answerPoll/answerPollWrapper.component")
);
// let listQuestionData: Array<any> = [];

const CreatePoll = ({ post }: ComponentInputProps) => {
  if (!post) {
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
          title={`Mittr | Take part in a survey featuring the question: ${post.question}`}
          description={`This Poll Answer Page is designed to assist both logged-in and anonymous individuals in responding to polls, with the current poll featuring the following question ${post.question}`}
        />
        <PollQuestionProvider question={post}>
          <AnswerPollLayout>
            <AnswerPollWrapper />
          </AnswerPollLayout>
        </PollQuestionProvider>
      </PollAnswerProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const resp = await axios.get("http://localhost:3200/questions");
  const listQuestionData: Array<any> = [];
  const pollQuestions = listQuestionData.map((item) => item.id);
  const paths = pollQuestions.map((post) => ({
    params: { index: post.toString() },
  }));
  // const paths: any = [];

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const resp = await axios.get("http://localhost:3200/questions");
  const listQuestionData = resp.data;
  const postIndex = context.params?.index as string;
  const post = listQuestionData.find((item: any) => item.id === postIndex);
  return { props: { post } };
};

export default CreatePoll;
