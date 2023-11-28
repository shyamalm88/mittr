import React from "react";
import ViewAnalyticsLayout from "../../../layout/viewAnalytics.layout";
import AnalyticsOfPollProvider from "../../../providers/analyticsOfPoll.provider";
import { v4 as uuidv4 } from "uuid";
import { NextSeo } from "next-seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentInputProps } from "../../../types";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const AnalyticsPollWrapper = dynamic(
  () => import("../../../components/analytics/analyticsPollWrapper.component")
);

import HttpService from "../../../services/@http/HttpClient";
const http = new HttpService();

const data = {
  question:
    "If you could go for a coffee with a figure from history, who would it be?",
  options: [
    {
      id: uuidv4(),
      option: "Leonardo Da Vinci",
      vote: 32,
      totalVoteCount: 82,
      selectedByUser: true,
    },
    {
      id: uuidv4(),
      option: "Michel Angelo",
      vote: 10,
      totalVoteCount: 82,
      selectedByUser: false,
    },
    {
      id: uuidv4(),
      option: "King Arthur",
      vote: 40,
      totalVoteCount: 82,
      selectedByUser: false,
    },
  ],
};

const ViewAnalytics = ({ analyticsData }: ComponentInputProps) => {
  if (!analyticsData) {
    return (
      <ViewAnalyticsLayout>
        <Stack spacing={2}>
          <Skeleton variant="rounded" sx={{ fontSize: "4rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={40} />
          <Skeleton variant="rounded" width={"100%"} height={40} />
          <Skeleton variant="rounded" width={"100%"} height={40} />

          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems={"center"}
          >
            <Skeleton variant="rounded" sx={{ flex: 2 }} height={100} />
            <Skeleton variant="rounded" sx={{ flex: 1 }} height={100} />
            <Skeleton variant="rounded" sx={{ flex: 1 }} height={100} />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems={"center"}
          >
            <Skeleton variant="rounded" sx={{ flex: 1 }} height={100} />
            <Skeleton variant="rounded" sx={{ flex: 2 }} height={100} />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems={"center"}
          >
            <Skeleton variant="rounded" sx={{ flex: 1 }} height={100} />
          </Stack>
        </Stack>
      </ViewAnalyticsLayout>
    );
  }
  return (
    <AnalyticsOfPollProvider question={data}>
      <NextSeo
        title="Mittr | View Analytics"
        description={`The Analytics Viewing page offers individual contributors the capability to refine and analyze analytics data using various filtering options. Various analytics pertaining to the poll are available on this page for ${analyticsData.question}`}
      />
      <ViewAnalyticsLayout>
        <AnalyticsPollWrapper />
      </ViewAnalyticsLayout>
    </AnalyticsOfPollProvider>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const resp: Array<any> = await http.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/poll`
  );
  const listQuestionData: Array<any> = resp;
  const pollQuestions = listQuestionData.map((item) => {
    return { id: item._id, slug: item.questionSlug };
  });
  const paths = pollQuestions.map((post) => ({
    params: { index: post.id, slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postIndex = (context.params as any).index as string;
  try {
    const resp = await http.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/poll/${postIndex}`
    );
    const analyticsData = resp;
    return { props: { analyticsData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default ViewAnalytics;
