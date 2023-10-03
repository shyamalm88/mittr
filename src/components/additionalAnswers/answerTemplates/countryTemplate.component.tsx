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
import { usePollAnswerContext } from "../../../hooks/usePollAnswerContext";

export default function CountryTemplate({
  fieldName,
  item,
}: ComponentInputProps) {
  const answerContext = usePollAnswerContext();
  const [countries] = React.useState<any[]>(Country.getAllCountries());
  const [country, setCountry] = React.useState<any | string>();

  const handleCountryChange = (e: any, value: any, reason: any) => {
    setCountry(value?.isoCode);
  };

  React.useEffect(() => {
    answerContext.handleChange({
      target: {
        name: `${fieldName}.selectedValue`,
        value: country,
        id: item._id,
      },
    });
  }, [country, answerContext, fieldName, item._id]);

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
    </>
  );
}
