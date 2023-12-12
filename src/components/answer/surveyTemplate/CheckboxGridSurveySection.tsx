import {
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ComponentInputProps } from "../../../types";
import he from "he";

function CheckboxGridSurveySection({ selectedValue }: ComponentInputProps) {
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

              {item.rows.map((itm: any) => {
                return (
                  <div key={itm.option}>
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
                                control={<Checkbox id={item._id} />}
                                label={""}
                                labelPlacement="top"
                              />
                            </fieldset>
                          </FormControl>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </Box>
    </>
  );
}

export default CheckboxGridSurveySection;
