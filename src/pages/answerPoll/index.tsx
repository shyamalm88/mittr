import AnswerPollWrapper from "../../components/answerPoll/answerPollWrapper.component";
import AnswerPollLayout from "../../layout/answerPoll.layout";
import PollCreationProvider from "../../providers/pollCreation.provider";
import PollQuestionProvider from "../../providers/pollQuestion.provider";
import data from "../../data/question.json";

const CreatePoll = () => {
  return (
    <PollCreationProvider>
      <PollQuestionProvider question={data}>
        <AnswerPollLayout>
          <AnswerPollWrapper />
        </AnswerPollLayout>
      </PollQuestionProvider>
    </PollCreationProvider>
  );
};

export default CreatePoll;
