import React from "react";
import AnalyticsPollWrapper from "../../components/analytics/analyticsPollWrapper.component";
import ViewAnalyticsLayout from "../../layout/viewAnalytics.layout";
import AnalyticsOfPollProvider from "../../providers/analyticsOfPoll.provider";
import { v4 as uuidv4 } from "uuid";
import { NextSeo } from "next-seo";
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

const ViewAnalytics = () => {
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

export default ViewAnalytics;
