import striptags from "striptags";
import he from "he";
import urlSlug from "url-slug";
import uniqid from "uniqid";
import * as _ from "underscore";

export async function pollFormDataUpdate(
  data: any,
  setValue: Function,
  getValues: Function,
  append: Function,
  remove: Function
) {
  setValue(
    "questionSlug",
    urlSlug(striptags(he.decode(data.question.replace(/nbsp/gi, "")))).slice(
      0,
      50
    ),

    {
      shouldValidate: true,
    }
  );
  const additionalQuestions = getValues("additionalQuestions").filter(
    (item: any) => item.question
  );
  const genderFound = additionalQuestions.some(
    (item: any) => item.answerType === "gender"
  );
  const countryFound = additionalQuestions.some(
    (item: any) => item.answerType === "country"
  );
  if (data.settings && data.settings.captureGender && !genderFound) {
    const temp = {
      id: uniqid(),
      questionLabel: "Question",
      answerType: "gender",
      question: "Please select your Gender",
    };
    append(temp);
  } else {
    if (data.settings && !data.settings.captureGender && genderFound) {
      const idx = additionalQuestions.findIndex(
        (item: any) => item.answerType === "gender"
      );
      remove(idx);
    }
  }
  if (data.settings && data.settings.captureCity && !countryFound) {
    const temp = {
      id: uniqid(),
      questionLabel: "Question",
      answerType: "city",
      question: "Your residing Country and City",
    };
    append(temp);
  } else {
    if (data.settings && !data.settings.captureGender && countryFound) {
      const idx = additionalQuestions.findIndex(
        (item: any) => item.answerType === "city"
      );
      remove(idx);
    }
  }
  if (data.settings && data.settings.captureCountry && !countryFound) {
    const temp = {
      id: uniqid(),
      questionLabel: "Question",
      answerType: "country",
      question: "Your residing Country",
    };
    append(temp);
  } else {
    if (data.settings && !data.settings.captureGender && countryFound) {
      const idx = additionalQuestions.findIndex(
        (item: any) => item.answerType === "country"
      );
      remove(idx);
    }
  }
  const dataToBeSubmitted = getValues();
  dataToBeSubmitted.options = _.map(dataToBeSubmitted.options, function (o) {
    return _.omit(o, ["image"]);
  });

  return dataToBeSubmitted;
}

export async function surveyFormDataUpdate(
  data: any,
  setValue: Function,
  getValues: Function,
  append: Function,
  remove: Function
) {
  setValue(
    "questionSlug",
    urlSlug(data.title.replace(/nbsp/gi, "")).slice(0, 50)
  );

  const dataToBeSubmitted = getValues();
  (dataToBeSubmitted.survey as any) = _.map(
    dataToBeSubmitted.survey,
    function (o) {
      return _.omit(o, ["id"]);
    }
  );
  return dataToBeSubmitted;
}
