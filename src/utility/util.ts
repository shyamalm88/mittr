export const isObjectEmpty = (obj: Object) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

export const checkObjectPropertiesHaveEmptyValue = (obj: any): Boolean => {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] != "" && obj[key] != "Invalid date") {
      return false;
    }
  }
  return true;
};

export const checkValueAndValidity = (
  activeIndex: number,
  getValues: Function,
  _: any,
  toast: any,
  setActiveIndex: Function,
  isSubmit: boolean
) => {
  if (activeIndex === -1 && !getValues("selectedPrimaryQuestionOption")) {
    toast.error(`Please Select One Option`, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  } else if (
    activeIndex > -1 &&
    !!checkObjectPropertiesHaveEmptyValue(
      getValues().additionalQuestionsAnswers[activeIndex]?.selectedValue
    )
  ) {
    toast.error(`Please Select One Option`, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  } else if (
    activeIndex > -1 &&
    getValues().additionalQuestionsAnswers[activeIndex].selectedValue
      ?.countryAndCity &&
    !!_.some(
      getValues().additionalQuestionsAnswers[activeIndex].selectedValue
        .countryAndCity,
      _.isEmpty
    )
  ) {
    toast.error(`Please Select One Option`, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  } else {
    setActiveIndex(activeIndex + 1);
    if (isSubmit) {
      return true;
    }
  }
};

export const checkValueAndValidityForSurvey = (
  surveySegmentsForActiveStep: any,
  toast: any
) => {
  for (let i = 0; i < surveySegmentsForActiveStep.selectedValue.length; i++) {
    const item = surveySegmentsForActiveStep.selectedValue[i];
    if (item.required === "true") {
      if (item.hasOwnProperty("checkbox")) {
        if (!item.checkbox.some((el: any) => el.choice == true)) {
          toast.error(`Please Answer For the Required marked fields`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          return false;
        }
      } else if (item.hasOwnProperty("multipleChoiceGrid")) {
        if (!item.multipleChoiceGrid.every((el: any) => el.multipleChoice)) {
          toast.error(`Please Answer For the Required marked fields`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          return false;
        }
      } else if (item.hasOwnProperty("checkBoxGrid")) {
        if (
          !item.checkBoxGrid.every(
            (el: any) =>
              el.checkbox &&
              Array.isArray(el.checkbox) &&
              el.checkbox.length > 0
          )
        ) {
          toast.error(`Please Answer For the Required marked fields`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          return false;
        }
      } else {
        let values = Object.values(item);
        if (
          values.some(
            (el, i: number) =>
              el == null || el == "" || el == undefined || el == 0
          )
        ) {
          toast.error(`Please Answer For the Required marked fields at ${i}`, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
          return false;
        }
      }
    }
  }
  return true;
};
