import CreatePollLayout from "../../layout/createPoll.layout";
import PollCreationProvider from "../../providers/pollCreation.provider";
import CreatePollWrapper from "./createPollWrapper.component";
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
