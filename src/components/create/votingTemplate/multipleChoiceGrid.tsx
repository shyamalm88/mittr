import React from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography, useTheme } from "@mui/material";
import { ComponentInputProps } from "../../../types";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import RowTemplate from "./rowTemplate";
import ColumnTemplate from "./columnTemplate";
import OptionActions from "../common/optionActions";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";

function MultipleChoiceGrid({
  control,
  errors,
  register,
  deleteOption,
  getValues,
  fieldName,
  index: idx,
}: ComponentInputProps) {
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    update,
    replace,
  } = useFieldArray({
    control,
    name: `${fieldName}.options`,
  });

  const addOption = async () => {
    const temp = {
      id: uuidv4(),
      label: "multipleChoiceGrid",
    };
    append(temp);
  };

  React.useEffect(() => {
    if (getValues("survey")?.[idx]?.options?.length === 0) {
      addOption();
    }
  }, []);

  return (
    <React.Fragment>
      {fields?.map((item: any, index: number) => {
        const fieldNameOptions = `${fieldName}.options.${index}`;
        return (
          <Grid container spacing={2} key={item.id}>
            <Grid item xs={12} md={6}>
              <Typography>Rows</Typography>
              <Divider flexItem sx={{ mb: 2 }} />
              <RowTemplate
                control={control}
                fieldName={`${fieldName}.options.${index}`}
                getValues={getValues}
                register={register}
                index={index}
                parentIndex={idx}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Columns</Typography>
              <Divider flexItem sx={{ mb: 2 }} />
              <ColumnTemplate
                control={control}
                fieldName={`${fieldName}.options.${index}`}
                getValues={getValues}
                register={register}
                index={index}
                parentIndex={idx}
                errors={errors}
                type="radio"
              />
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}

export default MultipleChoiceGrid;
