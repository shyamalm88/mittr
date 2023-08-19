import CreatePollWrapper from "../../components/createPoll/createPollWrapper.component";
import CreatePollLayout from "../../layout/createPoll.layout";
import PollCreationProvider from "../../providers/pollCreation.provider";
const CreatePoll = () => {
  return (
    <PollCreationProvider>
      <CreatePollLayout>
        <CreatePollWrapper />
      </CreatePollLayout>
    </PollCreationProvider>
  );
};

export default CreatePoll;
