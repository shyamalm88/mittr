import React from "react";
import ViewAnalyticsLayout from "../../../../layout/viewAnalytics.layout";
import AnalyticsOfPollProvider from "../../../../providers/analyticsOfPoll.provider";
import { v4 as uuidv4 } from "uuid";
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
    <AnalyticsOfPollProvider question={analyticsData}>
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
  const resp: Array<any> = await http.get(`/poll`);
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
    const resp = await http.get(`/poll/${postIndex}`);
    const respAns = await http.get(`/answer/${postIndex}`);
    (resp as any).options.forEach((item: any) => {
      item.vote = 0;
      item.totalVoteCount = (respAns as any).length;
      (respAns as any).forEach((itm: any) => {
        if (item.option === itm.selectedOption) {
          item.vote = item.vote + 1;
        }
      });
    });

    const analyticsData = resp;
    return { props: { analyticsData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default ViewAnalytics;
