import * as React from "react";
import { ComponentInputProps } from "../../types";
import { useFormContext } from "react-hook-form";
import VotingType from "./votingType";
import VotingTemplateSwitch from "./votingTemplateSwitch";

const SurveyOptionWrapper = ({ fieldName, index }: ComponentInputProps) => {
  const {
    register,
    setValue,
    unregister,
    control,
    getValues,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
    resetField,
  } = useFormContext();

  const [addedTopics, setAddedTopics] = React.useState<
    { id: string; label: string }[]
  >([]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTopicSave = (e: any[]) => {
    setAddedTopics(e);
    handleClose();
  };

  return (
    <>
      <VotingType
        register={register}
        fieldName={fieldName}
        index={index}
        setValue={setValue}
        control={control}
        unregister={unregister}
        getValues={getValues}
      />
      <VotingTemplateSwitch
        errors={errors}
        register={register}
        getValues={getValues}
        isSubmitSuccessful={isSubmitSuccessful}
        reset={reset}
        fieldName={fieldName}
        index={index}
        setValue={setValue}
      />
    </>
  );
};
export default SurveyOptionWrapper;
