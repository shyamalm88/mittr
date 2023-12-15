import React from "react";
import { ComponentInputProps } from "../../../types";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { Country, City, ICity } from "country-state-city";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export default function CountryStateCityTemplate({
  fieldName,
  item,
}: ComponentInputProps) {
  const [countries] = React.useState<any[]>(Country.getAllCountries());
  const [country, setCountry] = React.useState<any | string>();
  const [cities, setCities] = React.useState<ICity[]>([]);
  const [city, setCity] = React.useState<ICity | any>();

  const {
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useFormContext();

  const handleCountryChange = (e: any, value: any, reason: any) => {
    setCountry(value?.isoCode);
    setValue(`${fieldName}.selectedValue.countryAndCity.country`, value);
    setValue(`${fieldName}.selectedValue.countryAndCity.city`, null);
    setCity(null);
    const cities = City.getCitiesOfCountry(value?.isoCode);
    if (reason === "clear") {
    }
    setCities(cities ? cities : []);
  };

  const handleCityChange = (e: any, value: any) => {
    setCity(value?.name);
    setValue(`${fieldName}.selectedValue.countryAndCity.city`, value);
  };

  return (
    <>
      <FormControl variant="outlined">
        <Autocomplete
          options={countries}
          value={country}
          sx={{ mb: 1 }}
          size="small"
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
      </FormControl>
      <FormControl variant="outlined">
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
      </FormControl>
      <input
        type="hidden"
        value={item.id}
        {...register(`${fieldName}.questionId` as const)}
      />
    </>
  );
}
