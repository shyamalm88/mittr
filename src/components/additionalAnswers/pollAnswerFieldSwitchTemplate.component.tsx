import React from "react";
import RangeTemplate from "./answerTemplates/rangeTemplate.component";
import DateTemplate from "./answerTemplates/dateTemplate.component";

import RadioTemplate from "./answerTemplates/radioTemplate.component";
import CountryStateCityTemplate from "./answerTemplates/countryStateCityTemplate.component";
import { ComponentInputProps } from "../../types";
import GenderTemplate from "./answerTemplates/genderTemplate.component";
import CountryTemplate from "./answerTemplates/countryTemplate.component";

export default function PollAnswerFieldSwitchTemplate({
  selectedValue,
  fieldName,
  item,
  index,
}: ComponentInputProps) {
  switch (selectedValue) {
    case "range":
      return <RangeTemplate fieldName={fieldName} item={item} index={index} />;
    case "choice":
      return <RadioTemplate fieldName={fieldName} item={item} index={index} />;
    case "country":
      return (
        <CountryTemplate fieldName={fieldName} item={item} index={index} />
      );
    case "city":
      return (
        <CountryStateCityTemplate
          fieldName={fieldName}
          item={item}
          index={index}
        />
      );
    case "gender":
      return <GenderTemplate fieldName={fieldName} item={item} index={index} />;
    case "date":
      return <DateTemplate fieldName={fieldName} item={item} index={index} />;
    default:
      return <></>;
  }
}
