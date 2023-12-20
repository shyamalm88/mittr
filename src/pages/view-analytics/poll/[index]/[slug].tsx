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
          lineData={analyticsData.monthlyDistributionChartData}
          pieData={analyticsData.genderRatio}
          geoData={analyticsData.region}
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
    const resp: any = await http.get(`/poll/${postIndex}`);
    const respAns = await http.get(`/answer/${postIndex}`);

    resp.monthlyDistributionChartData = [
      ["Month", "Anonymous Users vote", "Logged-in Users vote"],
      ["Jan", 0, 0],
      ["Feb", 0, 0],
      ["Mar", 0, 0],
      ["Apr", 0, 0],
      ["May", 0, 0],
      ["Jun", 0, 0],
      ["Jul", 0, 0],
      ["Aug", 0, 0],
      ["Sep", 0, 0],
      ["Oct", 0, 0],
      ["Nov", 0, 0],
      ["Dec", 0, 0],
    ];
    resp.genderRatio = [
      ["Interactions By", "Count"],
      ["male", 0],
      ["female", 0],
      ["non-binary", 0],
      ["na", 0],
    ];
    resp.region = [["Country", "User Interactions"]];
    resp.monthlyDistributionChartData.forEach((item: any) => {
      (respAns as any).forEach((itm: any) => {
        if (item[0] === moment(itm.createdAt).format("MMM")) {
          if (itm.answeredByUserRef) {
            item[1] = item[1] + 1;
          } else {
            item[2] = item[2] + 1;
          }
        }
      });
    });
    resp.genderRatio.forEach((item: any) => {
      (respAns as any).forEach((itm: any) => {
        itm.additionalQuestionsAnswers.forEach((im: any) => {
          if (
            im.selectedValue.hasOwnProperty("gender") &&
            im.selectedValue.gender === item[0]
          ) {
            item[1] = item[1] + 1;
          }
        });
      });
    });
    // resp.region.forEach((item: any) => {
    //   console.log(item);

    (respAns as any).forEach((itm: any) => {
      itm.additionalQuestionsAnswers.forEach((im: any) => {
        if (im.selectedValue.hasOwnProperty("country")) {
          const idx = resp.region.findIndex(
            (item: any) => item[0] === im.selectedValue.country.name
          );
          if (idx > 0) {
            resp.region[idx] = [
              im.selectedValue.country.name,
              resp.region[idx][1] + 1,
            ];
          } else {
            resp.region.push([im.selectedValue.country.name, 1]);
          }
        }
      });
    });
    console.log(resp.region);

    (resp as any).options.forEach((item: any) => {
      item.vote = 0;
      item.totalVoteCount = (respAns as any).length;
      (respAns as any).forEach((itm: any) => {
        if (item.option === itm.selectedOption) {
          item.vote = item.vote + 1;
        }
      });
    });

    const analyticsData: any = resp;

    return { props: { analyticsData } };
  } catch (err) {
    console.error("Internal Server Error");
    return { notFound: true };
  }
};

export default ViewAnalytics;
