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
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { PollAnalyticsValueType } from "../../types";
import moment from "moment";
import HttpService from "../../services/@http/HttpClient";
import debounce from "debounce";
import * as _ from "underscore";

function CustomAnalyticsPollWrapper() {
  const http = new HttpService();
  const { additionalAnswers, questionID } = usePollAnalyticsContext();
  const fillArr = additionalAnswers.map((item: any) => new Array());
  const [pollValue, setPollValue] = React.useState<any>([fillArr]);
  const [analyticsData, setAnalyticsData] = React.useState<any>();
  const [analyticsGraphData, setAnalyticsGraphData] = React.useState<any>();

  const methods = useForm<PollAnalyticsValueType>({
    defaultValues: {
      pollOptions: [],
      dayRange: [],
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

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control,
      name: "additionalAnswersOptions",
    });

  const handleOptionSection = (e: any, itm: any, index: number) => {
    const temp = pollValue[0];
    temp[index] = e.target.value;
    setPollValue([temp]);
  };

  const handleCheckBoxChange = (e: any, itm: any, index: number, item: any) => {
    const temp = pollValue[0];
    console.log(temp[index]);
    let tmrpAns = null;
    const getAllValues = getValues("additionalAnswersOptions");
    let indexOf = -1;
    getAllValues.forEach((element, idxe) => {
      if (element.questionId === itm.id) {
        if (itm.answerType === "choice") {
          if (element.selectedValue["multipleChoice"] === item) {
            indexOf = idxe;
          }
        } else {
          if (element.selectedValue[itm.answerType] === item) {
            indexOf = idxe;
          }
        }
      }
    });

    if (indexOf > -1) remove(indexOf);

    if (temp[index].indexOf(item) > -1) {
      tmrpAns =
        itm.answerType === "choice" || itm.answerType === "gender"
          ? {
              selectedValue: {
                [itm.answerType === "choice"
                  ? "multipleChoice"
                  : itm.answerType]: item,
              },
              questionId: itm.id,
            }
          : {
              questionId: itm.id,
              selectedValue: {
                [itm.answerType]: item,
              },
            };
      append(tmrpAns);
    } else {
      console.log(getValues("additionalAnswersOptions"));
    }
  };

  watch((data: any) => {
    setAnalyticsData(data);
  });

  React.useEffect(() => {
    if (analyticsData) {
      postData(analyticsData);
    }
  }, [analyticsData]);

  const postData = async (data: any) => {
    const processedAdditionalAnswersOptionsData = _.compact(
      data.additionalAnswersOptions
    );
    data.additionalAnswersOptions = processedAdditionalAnswersOptionsData;
    data.additionalAnswersOptions = data.additionalAnswersOptions.filter(
      (x: any) => JSON.stringify(x.selectedValue) !== "{}"
    );
    const resp: any[] = await http.post(
      `/answer/getSliceData/${questionID._id}`,
      data
    );
    const tableData: any[] = [];
    tableData[0] = resp.map((elem: any) => elem._id.selectedOption);
    tableData[0].unshift("Month");
    const map = new Map();
    resp.forEach((ele) => {
      if (map.has(ele._id.time)) {
        const a = map.get(ele._id.time);
        const index = tableData[0].indexOf(ele._id.selectedOption);
        a[index - 1] = ele.count;
        map.set(ele._id.time, a);
      } else {
        const a = new Array(tableData[0].length - 1).fill(0);
        const index = tableData[0].indexOf(ele._id.selectedOption);
        a[index - 1] = ele.count;
        map.set(ele._id.time, a);
      }
    });

    const arr = Array.from(map, ([name, value]) => [name, ...value]);
    arr.forEach((items) => {
      tableData.push(items);
    });
    setAnalyticsGraphData(tableData);
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
            flexWrap="wrap"
          >
            {additionalAnswers.map((item: any, indx: number) => {
              return (
                <FormControl
                  size="small"
                  sx={{ width: { xs: "100%", lg: "100px" } }}
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
                            onChange={(e) =>
                              handleCheckBoxChange(e, item, indx, itm)
                            }
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
            <AreaChart data={analyticsGraphData} />
          </Card>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default CustomAnalyticsPollWrapper;
