import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, Grid, Stack, useTheme } from "@mui/material";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { usePollCreationContext } from "../../hooks/usePollCreationContext";

function PollSettings() {
  const theme = useTheme();
  const contextValue = usePollCreationContext();
  const [settingsObj, setSettingsObj] = React.useState({
    settings: {
      captureGender: false,
      closePollOnScheduledDate: false,
      captureCity: false,
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key1 = event.target.name.split(".")[0];
    const key2 = event.target.name.split(".")[1];
    setSettingsObj({
      ...settingsObj,
      [key1]: {
        ...settingsObj.settings,
        [key2]: event.target.checked,
      },
    });
    contextValue.handleChange({
      target: { value: event.target.checked, name: event.target.name },
    });
  };

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
          {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}

          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsObj.settings.closePollOnScheduledDate}
                      onChange={handleChange}
                      name="settings.closePollOnScheduledDate"
                      color="info"
                      value={settingsObj.settings.closePollOnScheduledDate}
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
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settingsObj.settings.captureGender}
                      onChange={handleChange}
                      name="settings.captureGender"
                      color="info"
                      value={settingsObj.settings.captureGender}
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
                      checked={settingsObj.settings.captureCity}
                      onChange={handleChange}
                      name="settings.captureCity"
                      color="info"
                      value={settingsObj.settings.captureCity}
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
