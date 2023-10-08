import { v4 as uuidv4 } from "uuid";

export const updateForCheckBox = async (
  index: number,
  resetField: any,
  update: any,
  remove: any,
  getValues: any
) => {
  const defaultValues = {
    id: uuidv4(),
    label: "Choice",
    enabled: true,
    choice: "",
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  console.log(index, index);
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
    id: uuidv4(),
    label: "Option",
    enabled: true,
    option: "",
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  console.log(index, index);
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
    label: "LinearScale",
    from: "",
    to: "",
    formText: "",
    toText: "",
  };
  console.log(index, index);
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
    id: uuidv4(),
    label: "MultipleChoiceGrid",
    rows: [{ id: uuidv4(), label: "Rows", enabled: true, option: "" }],
    columns: [{ id: uuidv4(), label: "Columns", enabled: true, option: "" }],
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
    id: uuidv4(),
    label: "MultipleChoiceGrid",
    rows: [{ id: uuidv4(), label: "Rows", enabled: true, option: "" }],
    columns: [{ id: uuidv4(), label: "Columns", enabled: true, option: "" }],
  };
  await resetField(`survey.${index}.options`);
  await remove([0, 1]);
  update(0, defaultValues);
};
