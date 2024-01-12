import React from "react";
import ViewAnalyticsLayout from "../../../../layout/viewAnalytics.layout";
import AnalyticsOfPollProvider from "../../../../providers/analyticsOfPoll.provider";
import uniqid from "uniqid";
import { NextSeo } from "next-seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentInputProps } from "../../../../types";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const AnalyticsPollWrapper = dynamic(
  () =>
    import("../../../../components/analytics/analyticsPollWrapper.component")
);

import HttpService from "../../../../services/@http/HttpClient";
const http = new HttpService();

const data = {
  question:
    "If you could go for a coffee with a figure from history, who would it be?",
  options: [
    {
      id: uniqid(),
      option: "Leonardo Da Vinci",
      vote: 32,
      totalVoteCount: 82,
      selectedByUser: true,
    },
    {
      id: uniqid(),
      option: "Michel Angelo",
      vote: 10,
      totalVoteCount: 82,
      selectedByUser: false,
    },
    {
      id: uniqid(),
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
  const resp: Array<any> = await http.get(`/survey`);
  const listQuestionData: Array<any> = resp;
  const surveyQuestions = listQuestionData.map((item) => {
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
    const analyticsData = resp;
    return { props: { analyticsData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default ViewAnalytics;
