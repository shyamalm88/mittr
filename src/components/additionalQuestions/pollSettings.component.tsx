import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Stack, useTheme } from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useFormContext, Controller } from "react-hook-form";
import FormValidationError from "../../utility/FormValidationError";
import { REQUIRED, PATTERN } from "../../constants/error";
import { usePollOrSurveyContext } from "../../hooks/usePollOrSurveyContext";

function PollSettings() {
  const theme = useTheme();
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const d = new Date().toISOString();
  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors, dirtyFields, touchedFields, isSubmitted },
    setError,
    clearErrors,
  } = useFormContext();

  const settingsValues = getValues("settings");

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: "4px",
        color: theme.palette.text.secondary,
        mt: pollOrSurvey === "poll" ? "2px" : "10px",
      }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="inherit" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack spacing={1} direction="row" justifyContent="space-between">
          <Typography sx={{ color: theme.palette.text.secondary }}>
            <TuneRoundedIcon />
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            {pollOrSurvey === "poll" ? "Poll Settings" : "Survey Settings"}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsValues.closePollOnScheduledDate}
                      {...register("settings.closePollOnScheduledDate")}
                      color="info"
                    />
                  }
                  label="Close Poll On Scheduled Date"
                  labelPlacement="start"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    m: 0,
                    fontSize: ".85em",
                  }}
                />

                {settingsValues.closePollOnScheduledDate && (
                  <FormControl variant="outlined">
                    <Controller
                      name="duration"
                      control={control}
                      render={({
                        field: { onChange, value, ...restField },
                        fieldState: { error },
                      }) => (
                        <>
                          <input
                            value={value}
                            hidden
                            {...register("duration" as const, {
                              required: REQUIRED.DATE,
                            })}
                          />
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDateTimePicker
                              disablePast
                              formatDensity="spacious"
                              format="DD/MM/YYYY, h:mm a"
                              yearsPerRow={4}
                              viewRenderers={{
                                seconds: null,
                              }}
                              onChange={(event: any) => {
                                onChange(moment(event).format());
                              }}
                              slotProps={{
                                textField: { size: "small", error: !!error },
                              }}
                            />
                          </LocalizationProvider>
                        </>
                      )}
                    />
                    <FormValidationError
                      errorText={(errors as any)?.duration?.message}
                    />
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsValues.captureGender}
                      {...register("settings.captureGender")}
                      color="info"
                    />
                  }
                  label="Require participants' gender"
                  labelPlacement="start"
                  sx={{ display: "flex", justifyContent: "flex-end", m: 0 }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsValues.captureCity}
                      {...register("settings.captureCity")}
                      color="info"
                    />
                  }
                  label="Require Participants' City"
                  labelPlacement="start"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    m: 0,
                    fontSize: ".85em",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsValues.captureCountry}
                      {...register("settings.captureCountry")}
                      color="info"
                    />
                  }
                  label="Require Participants' Country"
                  labelPlacement="start"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    m: 0,
                    fontSize: ".85em",
                  }}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}

export default PollSettings;
