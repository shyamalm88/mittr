import uniqid from "uniqid";

export const updateForCheckBox = async (
  index: number,
  resetField: any,
  update: any,
  remove: any,
  getValues: any
) => {
  const defaultValues = {
    id: uniqid(),
    label: "Choice",
    enabled: true,
    choice: "",
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  [0, 1].forEach((item, index) => {
    update(index, defaultValues);
  });
};

export const updateForMultipleChoice = async (
  index: number,
  resetField: any,
  update: any,
  remove: any
) => {
  const defaultValues = {
    id: uniqid(),
    label: "Option",
    enabled: true,
    option: "",
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  [0, 1].forEach((item, index) => {
    update(index, defaultValues);
  });
};

export const updateForDate = async (
  index: number,
  resetField: any,
  update: any,
  remove: any
) => {
  const defaultValues = {
    id: uniqid(),
    label: "date",
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  update(0, defaultValues);
};

export const updateForTime = async (
  index: number,
  resetField: any,
  update: any,
  remove: any
) => {
  const defaultValues = {
    id: uniqid(),
    label: "time",
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  update(0, defaultValues);
};

export const updateForLinearScale = async (
  index: number,
  resetField: any,
  update: any,
  remove: any
) => {
  const defaultValues = {
    id: uniqid(),
    label: "LinearScale",
    from: "",
    to: "",
    formText: "",
    toText: "",
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  update(0, defaultValues);
};

export const updateForMultipleChoiceGrid = async (
  index: number,
  resetField: any,
  update: any,
  remove: any
) => {
  const defaultValues = {
    id: uniqid(),
    label: "MultipleChoiceGrid",
    rows: [{ id: uniqid(), label: "Rows", enabled: true, option: "" }],
    columns: [{ id: uniqid(), label: "Columns", enabled: true, option: "" }],
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  update(0, defaultValues);
};

export const updateForCheckboxGrid = async (
  index: number,
  resetField: any,
  update: any,
  remove: any
) => {
  const defaultValues = {
    id: uniqid(),
    label: "MultipleChoiceGrid",
    rows: [{ id: uniqid(), label: "Rows", enabled: true, option: "" }],
    columns: [{ id: uniqid(), label: "Columns", enabled: true, option: "" }],
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  update(0, defaultValues);
};
