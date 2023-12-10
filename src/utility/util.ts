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
      getValues().additionalQuestionsAnswers[activeIndex].selectedValue
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
