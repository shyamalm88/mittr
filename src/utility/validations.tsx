import { toast } from "react-toastify";
export function validateQuestionCreation(validateState: any) {
  const whitelist = /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:'"|\\]*$/;
  if (!validateState.question.trim()) {
    console.error("Please add a question");
    toast.error(`Please add a question`, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
    return false;
  } else if (!validateState.question.trim().match(whitelist)) {
    console.error(
      `Only alpha numeric and few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`
    );
    toast.error(
      `Only alpha numeric and " few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
      {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      }
    );
    return false;
  }
  if (
    Array.isArray(validateState.options) &&
    validateState.options.length === 0
  ) {
    console.error("Please add options");
    toast.error(`Please add options`, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
    return false;
  } else if (validateState.options.length < 2) {
    console.error("Please add at-least 2 options");
    toast.error(`Please add at-least 2 options`, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
    return false;
  }
  if (
    Array.isArray(validateState.additionalQuestions) &&
    validateState.additionalQuestions.length > 0
  ) {
    let isValid = true;
    validateState.additionalQuestions.forEach((item: any, index: number) => {
      if (!item.question.trim()) {
        console.error(`Please specify question for ${index + 1} position`);
        toast.error(`Please specify question for ${index + 1} position`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
        isValid = false;
      } else if (!item.question.trim().match(whitelist)) {
        console.error(
          `Only alpha numeric and few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`
        );
        toast.error(
          `Only alpha numeric and " few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
          {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          }
        );
        isValid = false;
      }
      if (!item.answerType) {
        console.error(
          `Please select one type of answer type from dropdown for question${
            index + 1
          }`
        );
        toast.error(
          `Please select one type of answer type from dropdown for question no. ${
            index + 1
          }`,
          {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          }
        );
        isValid = false;
      }
      if (item.answerType === "range") {
        if (
          !item.rangeEndValue ||
          !item.rangeStartValue ||
          !item.rangeStepValue
        ) {
          console.error(
            `Please provide start value, end value and step value for the range for question no. ${
              index + 1
            }`
          );
          toast.error(
            `Please provide start value, end value and step value for the range for question no. ${
              index + 1
            }`,
            {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
            }
          );
          isValid = false;
        } else if (
          !item.rangeEndValue.trim().match(whitelist) ||
          !item.rangeStartValue.trim().match(whitelist) ||
          !item.rangeStepValue.trim().match(whitelist)
        ) {
          console.error(
            `Only alpha numeric and few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`
          );
          toast.error(
            `Only alpha numeric and " few special characters allowed. ">", "\`", "~", "{", "}", "[", "]", "'", "\"" are not allowed`,
            {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
            }
          );
          isValid = false;
        }
      }
      if (item.answerType === "choice") {
        if (!item.choices || item.choices.length < 2) {
          console.error(
            `Please provide at-least two choices for question no. ${index + 1}`
          );
          toast.error(
            `Please provide at-least two choices for question no. ${index + 1}`,
            {
              position: toast.POSITION.TOP_RIGHT,
              theme: "colored",
            }
          );
          isValid = false;
        }
      }
    });
    return isValid;
  }
  return true;
}
