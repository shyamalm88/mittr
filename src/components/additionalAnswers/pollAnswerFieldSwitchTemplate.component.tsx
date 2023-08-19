import React from "react";
import RangeTemplate from "./answerTemplates/rangeTemplate.component";
import DateTemplate from "./answerTemplates/dateTemplate.component";
import DateRangeTemplate from "./answerTemplates/dateRangeTemplate.component";

import RadioTemplate from "./answerTemplates/radioTemplate.component";
import CountryStateCityTemplate from "./answerTemplates/countryStateCityTemplate.component";
import { ComponentInputProps } from "../../types";

export default function PollAnswerFieldSwitchTemplate({
  selectedValue,
  fieldName,
  item,
}: ComponentInputProps) {
  switch (selectedValue) {
    case "range":
      return <RangeTemplate fieldName={fieldName} item={item} />;
    case "radio":
      return <RadioTemplate fieldName={fieldName} item={item} />;
    case "country":
      return <CountryStateCityTemplate fieldName={fieldName} item={item} />;
    case "date_range":
      return <DateRangeTemplate fieldName={fieldName} item={item} />;
    case "date":
      return <DateTemplate fieldName={fieldName} item={item} />;
    default:
      return <></>;
  }
}
