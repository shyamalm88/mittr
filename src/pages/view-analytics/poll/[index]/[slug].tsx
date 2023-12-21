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
import moment from "moment";
const AnalyticsPollWrapper = dynamic(
  () =>
    import("../../../../components/analytics/analyticsPollWrapper.component")
);

import HttpService from "../../../../services/@http/HttpClient";
const http = new HttpService();

const ViewAnalytics = ({ analyticsData }: ComponentInputProps) => {
  console.log(analyticsData);
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
        <AnalyticsPollWrapper
          lineData={analyticsData.monthlyDistribution}
          pieData={analyticsData.genderRatio}
          geoData={analyticsData.country}
          comboData={analyticsData.monthlySelectedPoll}
        />
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
    // const resp: any = await http.get(`/poll/${postIndex}`);
    const respAns: any = await http.get(
      `/answer/pollAnalyticsData/${postIndex}`
    );
    const analyticsData: any = respAns[0];

    return { props: { analyticsData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default ViewAnalytics;
