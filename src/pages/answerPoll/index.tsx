import AnswerPollWrapper from "../../components/answerPoll/answerPollWrapper.component";
import AnswerPollLayout from "../../layout/answerPoll.layout";
import PollCreationProvider from "../../providers/pollCreation.provider";
import PollQuestionProvider from "../../providers/pollQuestion.provider";
import data from "../../data/question2.json";
import { NextSeo } from "next-seo";

const CreatePoll = () => {
  return (
    <PollCreationProvider>
      <NextSeo
        title="Mittr | Answer a Poll"
        description="This Answer Poll page will help individual either logged in or anonymous users to answer polls"
      />
      <PollQuestionProvider question={data}>
        <AnswerPollLayout>
          <AnswerPollWrapper />
        </AnswerPollLayout>
      </PollQuestionProvider>
    </PollCreationProvider>
  );
};

export default CreatePoll;
