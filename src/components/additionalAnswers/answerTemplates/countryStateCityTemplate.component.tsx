import React from "react";
import { ComponentInputProps } from "../../../types";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import {
  Country,
  State,
  City,
  ICity,
  IState,
  ICountry,
} from "country-state-city";
import Image from "next/image";

export default function CountryStateCityTemplate({
  fieldName,
  item,
}: ComponentInputProps) {
  const [countries] = React.useState<ICountry[]>(Country.getAllCountries());
  const [country, setCountry] = React.useState<ICountry>();
  const [states, setStates] = React.useState<IState[]>([]);
  const [state, setState] = React.useState<IState>();
  const [cities, setCities] = React.useState<ICity[]>([]);
  const [city, setCity] = React.useState<ICity>();

  const handleCountryChange = (e: any, value: any) => {
    console.log(value);
    setCountry(value.isoCode);
    setStates(State.getStatesOfCountry(value.isoCode));
  };

  const handleStateChange = (e: any, value: any) => {
    console.log(value);
    setState(value.isoCode);
    setCities(City.getCitiesOfState(country, value.isoCode));
  };

  const handleCityChange = (e: any, value: any) => {
    setCity(value.name);
  };

  return (
    <>
      <FormControl variant="outlined">
        <Autocomplete
          options={countries}
          value={country}
          sx={{ mb: 1, bgcolor: "#fff" }}
          size="small"
          autoHighlight
          onChange={handleCountryChange}
          getOptionLabel={(option) => option.name}
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
                alt=""
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              placeholder="Select Country"
            />
          )}
        />
      </FormControl>
      <FormControl variant="outlined">
        {item.allowState && (
          <Autocomplete
            options={states}
            value={state}
            sx={{ mb: 1, bgcolor: "#fff" }}
            size="small"
            autoHighlight
            disabled={country ? false : true}
            onChange={handleStateChange}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                placeholder="Select State"
              />
            )}
          />
        )}
      </FormControl>
      <FormControl variant="outlined">
        {item.allowCity && (
          <Autocomplete
            options={cities}
            value={city}
            sx={{ mb: 1, bgcolor: "#fff" }}
            size="small"
            autoHighlight
            placeholder="Select City"
            disabled={country && state ? false : true}
            onChange={handleCityChange}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                placeholder="Select City"
              />
            )}
          />
        )}
      </FormControl>
    </>
  );
}
