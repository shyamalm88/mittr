import {
  Box,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { ComponentInputProps } from "../../../types";
import React from "react";
import { Country, City, ICity } from "country-state-city";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import he from "he";

function AddressInfoSurveySection({ selectedValue }: ComponentInputProps) {
  const theme = useTheme();
  const [countries] = React.useState<any[]>(Country.getAllCountries());
  const [country, setCountry] = React.useState<any | string>();
  const [cities, setCities] = React.useState<ICity[]>([]);
  const [city, setCity] = React.useState<ICity | any>();

  const handleCountryChange = (e: any, value: any, reason: any) => {
    setCountry(value?.isoCode);
    const cities = City.getCitiesOfCountry(value?.isoCode);
    if (reason === "clear") {
    }
    setCities(cities ? cities : []);
  };

  const handleCityChange = (e: any, value: any) => {
    setCity(value?.name);
  };
  return (
    <>
      <Typography
        component="div"
        variant="h6"
        dangerouslySetInnerHTML={{
          __html: he.decode(selectedValue.question),
        }}
      ></Typography>

      <Box sx={{ p: 3, pb: 1 }}>
        <InputLabel>Address</InputLabel>
        <TextField
          size="small"
          margin="dense"
          fullWidth
          multiline
          rows={2}
          sx={{ mt: 0 }}
          placeholder="Please provide Address"
        />
      </Box>
      <Box sx={{ p: 3, py: 1 }}>
        <InputLabel>Address Line 2</InputLabel>
        <TextField
          size="small"
          margin="dense"
          fullWidth
          multiline
          rows={2}
          sx={{ mt: 0 }}
          placeholder="Please provide Address Line 2"
        />
      </Box>

      <Box sx={{ p: 3, py: 1 }}>
        <InputLabel>Country</InputLabel>
        <Autocomplete
          options={countries}
          value={country}
          sx={{ mb: 1 }}
          size="small"
          fullWidth
          autoHighlight
          onChange={handleCountryChange}
          getOptionLabel={(option) => option.name}
          className="autoComplete"
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <Image
                loading="lazy"
                width="20"
                height="10"
                src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                alt={option.isoCode.toLowerCase()}
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "Country",
                style: { color: "inherit" },
              }}
              placeholder="Select Country"
            />
          )}
        />
      </Box>
      <Box sx={{ p: 3, py: 1 }}>
        <InputLabel>State/Region/Province</InputLabel>
        <OutlinedInput
          placeholder={`Please enter your State/Region/Province`}
          fullWidth
          size="small"
          margin="dense"
          sx={{
            borderRadius: "4px",
          }}
          className="input"
        />
      </Box>
      <Box sx={{ p: 3, py: 1 }}>
        <InputLabel>City</InputLabel>
        <Autocomplete
          options={cities}
          value={city}
          sx={{ mb: 1 }}
          size="small"
          autoHighlight
          placeholder="Select City"
          disabled={country ? false : true}
          onChange={handleCityChange}
          className="autoComplete"
          getOptionLabel={(option) => (option ? option.name : "")}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option ? option.name : ""}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "City",
                style: { color: "inherit" },
              }}
              placeholder="Select City"
            />
          )}
        />
      </Box>
      <Box sx={{ p: 3, py: 1 }}>
        <InputLabel>Zip/Post Code</InputLabel>
        <OutlinedInput
          placeholder={`Please enter your Zip/Post Code`}
          fullWidth
          size="small"
          margin="dense"
          sx={{
            borderRadius: "4px",
          }}
          className="input"
        />
      </Box>
    </>
  );
}

export default AddressInfoSurveySection;
