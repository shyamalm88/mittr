import AnswerPollWrapper from "../../components/answerPoll/answerPollWrapper.component";
import AnswerPollLayout from "../../layout/answerPoll.layout";
import PollCreationProvider from "../../providers/pollCreation.provider";
import PollQuestionProvider from "../../providers/pollQuestion.provider";
import data from "../../data/question2.json";
import listData from "../../data/questionList.json";
import { NextSeo } from "next-seo";
import { GetStaticPaths, GetStaticProps } from "next";

const CreatePoll = ({ post }) => {
  return (
    <PollCreationProvider>
      <NextSeo
        title="Mittr | Answer a Poll"
        description="This Answer Poll page will help individual either logged in or anonymous users to answer polls"
      />
      <PollQuestionProvider question={post}>
        <AnswerPollLayout>
          <AnswerPollWrapper />
        </AnswerPollLayout>
      </PollQuestionProvider>
    </PollCreationProvider>
  );
};

export const getStaticPaths: any = async () => {
  const pollQuestions = listData.map((item) => item.index);
  const paths = pollQuestions.map((post) => ({
    params: { index: post.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postIndex = context.params?.index;
  const post = listData[parseInt(postIndex) - 1];
  return { props: { post } };
};

export default CreatePoll;
