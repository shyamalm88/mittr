import React from "react";
import RangeTemplate from "./InputTemplates/Range.template";
import RadioTemplate from "./InputTemplates/Radio.template";
import CountryStateCityCombiTemplate from "./InputTemplates/CountryStateCityCombi.template";
import { ComponentInputProps } from "../../types";

export default function AnswerFieldSwitchTemplate({
  selectedValue,
  fieldName,
}: ComponentInputProps) {
  console.log("selectedValue", selectedValue);
  console.log("selectedValue", fieldName);

  switch (selectedValue) {
    case "range":
      return <RangeTemplate fieldName={fieldName} />;
    case "radio":
      return <RadioTemplate fieldName={fieldName} />;
    case "country":
      return <CountryStateCityCombiTemplate fieldName={fieldName} />;
    default:
      return <></>;
  }
}
