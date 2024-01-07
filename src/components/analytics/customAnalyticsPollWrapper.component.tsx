import {
  Card,
  Divider,
  InputLabel,
  Stack,
  Tooltip,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
} from "@mui/material";
import React from "react";
import Analyzer from "./analyze/analyzer.component";
import { AreaChart } from "./chart/AreaChart";
import { usePollAnalyticsContext } from "../../hooks/usePollAnalyticsContext";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { PollAnalyticsValueType } from "../../types";
import moment from "moment";

function CustomAnalyticsPollWrapper() {
  const { additionalAnswers } = usePollAnalyticsContext();
  const fillArr = additionalAnswers.map((item: any) => new Array());
  const [pollValue, setPollValue] = React.useState<any>([fillArr]);
  console.log(pollValue);
  const methods = useForm<PollAnalyticsValueType>({
    defaultValues: {
      pollOptions: "",
      dayRange: "",
      additionalAnswersOptions: [],
    },
  });
  const {
    handleSubmit,
    setError,
    reset,
    control,
    getValues,
    setValue,
    clearErrors,
    register,
    setFocus,
    watch,
  } = methods;

  watch((data) => console.log(data as any));

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "additionalAnswersOptions",
    });

  const handleOptionSection = (e: any, itm: any, index: number) => {
    const temp = pollValue[0];
    temp[index] = e.target.value;
    setPollValue([temp]);
    setValue(`additionalAnswersOptions.${itm.id}`, temp[index]);
  };

  return (
    <FormProvider {...methods}>
      <Divider textAlign="left" sx={{ mt: 2 }}>
        Slice & Dice
      </Divider>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction={{ xs: "column", lg: "row" }}
        useFlexGap
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Analyzer register={register} setValue={setValue} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: { xs: 1, lg: 5 },
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            useFlexGap
            gap={1}
            sx={{ mt: 2 }}
          >
            {additionalAnswers.map((item: any, indx: number) => {
              return (
                <FormControl
                  size="small"
                  sx={{ width: "100%" }}
                  key={item.id}
                  className="extraSmall"
                >
                  <InputLabel id="demo-simple-select-label">
                    {item.question}
                  </InputLabel>
                  <Select
                    label={item.question}
                    size="small"
                    value={pollValue[0][indx]}
                    multiple
                    fullWidth
                    onChange={(e) => handleOptionSection(e, item, indx)}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {item.value.map((itm: any) => {
                      return (
                        <MenuItem value={itm} key={itm}>
                          <Checkbox
                            checked={pollValue[0][indx].indexOf(itm) > -1}
                          />

                          <ListItemText
                            primary={
                              item.answerType === "date"
                                ? moment(itm).format("ll")
                                : itm
                            }
                            sx={{ fontSize: "11px !important" }}
                          />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            })}
          </Stack>
          <Card
            variant="elevation"
            sx={{
              p: 2,
              my: 2,
              borderRadius: "4px",
              flex: 1,
              width: "100%",
            }}
            className="card"
          >
            <AreaChart />
          </Card>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default CustomAnalyticsPollWrapper;
