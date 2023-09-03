import React from "react";
import ViewAnalyticsLayout from "../../layout/viewAnalytics.layout";
import AnalyticsOfPollProvider from "../../providers/analyticsOfPoll.provider";
import { v4 as uuidv4 } from "uuid";
import { NextSeo } from "next-seo";
import listData from "../../data/questionList.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { ComponentInputProps } from "../../types";
import dynamic from "next/dynamic";
import axios from "axios";
const AnalyticsPollWrapper = dynamic(
  () => import("../../components/analytics/analyticsPollWrapper.component")
);

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

const ViewAnalytics = ({ post }: ComponentInputProps) => {
  return (
    <AnalyticsOfPollProvider question={data}>
      <NextSeo
        title="Mittr | View Analytics"
        description="This View Analytics page will help individual contributors to slice and dice the analytics through filtering options"
      />
      <ViewAnalyticsLayout>
        <AnalyticsPollWrapper />
      </ViewAnalyticsLayout>
    </AnalyticsOfPollProvider>
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

export default ViewAnalytics;
