export const REQUIRED = {
  QUESTION: "Please provide a Question",
  DATE: "Please Provide date and time for scheduled end.",
  PATTERN:
    "Please enter a valid text. Only few special characters allowed. '>', '\\','`', '~', '{', '}', '[', ']' are not allowed",
  ADDITIONAL_QUESTION: "Please provide at-least One Additional Question",
  CHOICE: "Please provide Choice Value",
  SURVEY_TITLE: "Please provide a Survey Title",
  SECTION_TITLE: "Please provide a Section Title",
  SURVEY_CHOICE: "Please provide  Survey Checkbox Options",
  SURVEY_DROPDOWN:
    "Please provide  Survey Dropdown Options as comma separated values",
  SURVEY_ROW: "Please provide  Survey Row Choices for Grid",
  SURVEY_COLUMNS: "Please provide  Survey Column Choices for Grid",
  POLL_OPTION: "Please provide  Poll Option",
  POLL_IMAGE: "Please provide  Poll Image",
  LINEAR_SCALE_FROM: "Please provide Survey Linear Scale from Value",
  LINEAR_SCALE_TO: "Please provide Survey Linear Scale to Value",
  RANGE_STEP_VALUE: "Please Provide Range Step Value",
  RANGE_START_VALUE: "Please Provide Range Start Value",
  RANGE_END_VALUE: "Please Provide Range End Value",
  STAR_COUNT: "Please provide  Survey Star Rating Count Value",
  STAR_COLOR: "Please provide  Survey Star Rating Color Value",
  STAR_ICON: "Please provide  Survey Star Rating Icon Value",
  STAR_PRECISION: "Please provide  Survey Star Rating Precision Value",
  NAME: "Please provide your full Name",
  NAME_REQUIRED_ONLY: "Please provide your Full Name",
  EMAIL: "Please Provide a Valid Email address",
  EMAIL_REQUIRED_ONLY: "Please provide Email address",
  PASSWORD: "Please Provide a valid password which matches below criteria.",
  PASSWORD_REQUIRED_ONLY: "Please provide password.",
};
export const PATTERN = /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=;:\'\"|\\]*$/;
export const PATTERN_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const PATTERN_PASSWORD =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/g;
