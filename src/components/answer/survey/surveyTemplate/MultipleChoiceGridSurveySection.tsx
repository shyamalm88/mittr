import {
  Typography,
  Box,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ComponentInputProps } from "../../../../types";
import he from "he";
import { useFormContext } from "react-hook-form";

function MultipleChoiceGridSurveySection({
  selectedValue,
  fieldName,
  item,
  index: idx,
  actualIndex,
}: ComponentInputProps) {
  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();

  return (
    <>
      <Typography className="required">
        {selectedValue?.required && "*"}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>
      <Box sx={{ width: "100%", p: 2 }}>
        {selectedValue?.options.map((item: any) => {
          return (
            <div
              className="tableWithGrid"
              key={item.label}
              style={{
                gridTemplateColumns: `repeat(${
                  item?.columns?.length + 1
                }, 1fr)`,
              }}
            >
              <div className="tableHeader">&nbsp;</div>
              {item.columns.map((itm: any) => {
                return (
                  <div key={itm.option} className="tableHeader">
                    <Typography
                      variant="body1"
                      color="inherit"
                      align="center"
                      component="strong"
                    >
                      {itm.option}
                    </Typography>
                  </div>
                );
              })}

              {item.rows.map((itm: any, ix: number) => {
                return (
                  <RadioGroup name="selectedOption" key={itm.option}>
                    <div className="tableHeader">
                      <strong>{itm.option}</strong>
                    </div>
                    {item.columns.map((itm: any) => {
                      return (
                        <div key={itm.option}>
                          <FormControl
                            sx={{
                              mb: 1,
                              width: "100%",
                            }}
                            variant="outlined"
                          >
                            <fieldset
                              style={{
                                border: "none",
                                margin: "0 auto",
                                padding: 0,
                                display: "block",
                              }}
                            >
                              <FormControlLabel
                                value={itm.option}
                                control={<Radio id={item._id} />}
                                label={""}
                                labelPlacement="top"
                                {...register(
                                  `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].multipleChoiceGrid[${ix}].multipleChoice` as const
                                )}
                              />
                            </fieldset>
                          </FormControl>
                        </div>
                      );
                    })}
                  </RadioGroup>
                );
              })}

              <input
                type="hidden"
                value={selectedValue?.required}
                {...register(
                  `${fieldName}.segments[${actualIndex}].selectedValue[${idx}].required` as const
                )}
              />
            </div>
          );
        })}
      </Box>
    </>
  );
}

export default MultipleChoiceGridSurveySection;
