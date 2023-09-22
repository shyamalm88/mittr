import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, Grid, Stack, useTheme } from "@mui/material";
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

function PollSettings() {
  const theme = useTheme();
  const { register, setValue, getValues, watch, control } = useFormContext();

  React.useEffect(() => {
    watch("settings");
  }, [watch]);

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: "4px",
        mt: "2px",
        color: theme.palette.text.secondary,
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
            Settings
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

                {getValues("settings").closePollOnScheduledDate && (
                  <FormControl variant="outlined">
                    <Controller
                      name="duration"
                      control={control}
                      render={({ field: { onChange, ...restField } }) => (
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
                              onChange(moment(event).format("DD/MM/YYYY"));
                            }}
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
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
            </Grid>
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}

export default PollSettings;
