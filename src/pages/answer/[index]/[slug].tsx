import React from "react";
import AnswerPollLayout from "../../../layout/answer.layout";
import PollQuestionProvider from "../../../providers/pollQuestion.provider";
import axios from "axios";
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
const http = new HttpService();

const CreatePoll = ({ questionData }: ComponentInputProps) => {
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
      <PollAnswerProvider>
        <NextSeo
          title={`Mittr | Take part in a survey featuring the question: ${questionData.question}`}
          description={`This Poll Answer Page is designed to assist both logged-in and anonymous individuals in responding to polls, with the current poll featuring the following question ${questionData.question}`}
        />
        <PollQuestionProvider question={questionData}>
          <AnswerPollLayout>
            <AnswerPollWrapper />
          </AnswerPollLayout>
        </PollQuestionProvider>
      </PollAnswerProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const resp: Array<any> = await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/survey`
  );
  const listQuestionData: Array<any> = resp;

  const pollQuestions = listQuestionData.map((item) => {
    return { id: item._id, slug: item.questionSlug };
  });
  const paths = pollQuestions.map((post) => ({
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
    const questionData = resp;
    return { props: { questionData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default CreatePoll;
