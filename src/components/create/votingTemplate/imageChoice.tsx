import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { ComponentInputProps } from "../../../types";
import { useTheme } from "@mui/material";
import FormValidationError from "../../../utility/FormValidationError";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HttpService from "../../../services/@http/HttpClient";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { v4 as uuidv4 } from "uuid";
import { useFieldArray } from "react-hook-form";
import OptionActions from "../common/optionActions";
import { PATTERN, REQUIRED } from "../../../constants/error";
import { usePollOrSurveyContext } from "../../../hooks/usePollOrSurveyContext";
import { useQuestionTypeContext } from "../../../hooks/useQuestionTypeContext";

function ImageChoice({
  control,
  errors,
  register,
  fieldName,
  getValues,
  isSubmitSuccessful,
  reset,
  setValue,
  selectedValue,
  index,
}: ComponentInputProps) {
  const theme = useTheme();
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const { questionType, setQuestionType } = useQuestionTypeContext();

  const http = new HttpService();

  const [imageValue, setImageValue] = React.useState<any[]>([]);
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    update,
    replace,
  } = useFieldArray({
    control,
    name: `${fieldName}`,
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setImageValue([]);
    }
  }, [isSubmitSuccessful]);

  const handleChange = async (e: any, index: number) => {
    onSubmit(e.target.files[0], index);
  };

  const handleRemove = (e: any, index: number) => {
    const items = [...imageValue];
    items[index] = null;
    setImageValue(items);
  };

  const onSubmit = async (fileData: any, index: number) => {
    const formData: any = new FormData();
    formData.append("image", fileData);
    try {
      const response: any = await http
        .service()
        .postMultipart(`/survey/image`, formData);
      const items = [...imageValue];
      items[index] = response.body;
      setImageValue(items);
    } catch (error) {
      console.log(error);
    }
  };

  const addOption = () => {
    const temp = {
      id: uuidv4(),
      label: "Option",
      enabled: true,
      option: "",
    };
    append(temp);
  };

  const addOtherOption = () => {
    const temp = { id: uuidv4(), label: "Other", enabled: false, option: "" };
    append(temp);
    setValue(fieldName, "Other");
  };

  React.useEffect(() => {
    if (!fields.length) {
      addOption();
    }
    return () => {
      // unregister()
    };
  }, []);

  const deleteOption = (index: number) => {
    remove(index);
  };

  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="subtitle2"
        sx={{ my: 1, color: theme.palette.text.primary }}
      >
        Answer Options Image
      </Typography>
      {fields.map((item: any, index: number) => {
        const fieldName = `options.${index}`;
        return (
          <Box sx={{ mb: 2 }} key={item.id}>
            <Grid
              container
              spacing={2}
              sx={{
                alignItems: "stretch",
                alignSelf: "center",
                display: "flex",
              }}
            >
              <Grid
                item
                xs={7}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  alignSelf: "center",
                }}
              >
                <FormControl
                  sx={{
                    mb: 1,
                    width: "100%",
                    color: theme.palette.text.primary,
                  }}
                  variant="outlined"
                >
                  <fieldset
                    name={fieldName}
                    style={{
                      border: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <OutlinedInput
                      size="small"
                      margin="dense"
                      sx={{
                        borderRadius: "4px",
                      }}
                      className="input"
                      error={
                        !!(errors as any)?.[fieldName.split(".")[0]]?.[index]
                          ?.option?.message
                      }
                      {...register(`${fieldName}.option` as const, {
                        required: REQUIRED.POLL_OPTION,
                        pattern: {
                          value: PATTERN,
                          message: REQUIRED.PATTERN,
                        },
                      })}
                      multiline
                      readOnly={!item?.enabled}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          sx={{ color: theme.palette.action.active }}
                        ></InputAdornment>
                      }
                      placeholder={`${item?.label} ${index + 1}`}
                    />
                    <FormValidationError
                      errorText={
                        (errors as any)?.options?.[index]?.option?.message
                      }
                    />
                  </fieldset>
                </FormControl>
                {item.enabled && (
                  <FormControl
                    sx={{
                      mb: 1,
                      width: "100%",
                      color: theme.palette.text.primary,
                    }}
                    variant="outlined"
                  >
                    <fieldset
                      name={fieldName}
                      style={{
                        border: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <OutlinedInput
                        size="small"
                        margin="dense"
                        sx={{
                          borderRadius: "4px",
                        }}
                        className="input"
                        error={
                          !!(errors as any)?.[fieldName.split(".")[0]]?.[index]
                            ?.description?.message
                        }
                        {...register(`${fieldName}.description` as const, {
                          pattern: {
                            value: PATTERN,
                            message: REQUIRED.PATTERN,
                          },
                        })}
                        multiline
                        readOnly={!item?.enabled}
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ color: theme.palette.action.active }}
                          ></InputAdornment>
                        }
                        placeholder={`Description ${index + 1} (optional)`}
                      />
                      <FormValidationError
                        errorText={
                          (errors as any)?.options?.[index]?.description
                            ?.message
                        }
                      />
                    </fieldset>
                  </FormControl>
                )}
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  alignSelf: "center",
                }}
              >
                {item.enabled && (
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="stretch"
                      sx={{ display: "flex" }}
                    >
                      {!imageValue[index] ? (
                        <>
                          <input
                            accept="image/*"
                            style={{ display: "none" }}
                            type="file"
                            id={item.id}
                            {...register(`${fieldName}.image` as const, {
                              onChange: (e: any) => {
                                handleChange(e, index);
                              },
                              required: REQUIRED.POLL_IMAGE,
                            })}
                          />

                          <label htmlFor={item.id}>
                            <Button
                              component="span"
                              fullWidth
                              sx={{ border: "1px dashed" }}
                            >
                              <Stack
                                spacing={1}
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ display: "flex" }}
                              >
                                <Typography variant="button">
                                  Click to Upload
                                </Typography>
                                <CloudUploadOutlinedIcon />
                              </Stack>
                            </Button>
                          </label>
                          <FormValidationError
                            errorText={
                              (errors as any)?.options?.[index]?.image?.message
                            }
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="hidden"
                            value={imageValue[index].imageId}
                            {...register(`${fieldName}.imageId` as const, {
                              required: REQUIRED.POLL_IMAGE,
                            })}
                          />
                          <Card sx={{ position: "relative", height: "100%" }}>
                            <CardMedia
                              component="img"
                              sx={{
                                minHeight: "100px",
                                maxHeight: "auto",
                                backgroundSize: "contain",
                                backgroundPosition: "top",
                              }}
                              loading="lazy"
                              image={
                                imageValue[index].destination +
                                "/" +
                                imageValue[index].filename
                              }
                              title="green iguana"
                            />
                            <CardActions>
                              <IconButton
                                aria-label="delete"
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                                onClick={(e) => handleRemove(e, index)}
                              >
                                <CloseRoundedIcon />
                              </IconButton>
                            </CardActions>
                          </Card>
                        </>
                      )}
                    </Stack>
                  </Card>
                )}
              </Grid>
              <Grid
                item
                xs={1}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                sx={{
                  display: "flex",
                  pl: "0px !important",
                  textAlign: "center",
                  flexWrap: "wrap",
                }}
              >
                <IconButton
                  aria-label="Delete Option"
                  edge="end"
                  sx={{ color: "inherit" }}
                  onClick={() => deleteOption(index)}
                  disabled={getValues("options").length === 1}
                  key={`${item.id}_delete`}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <OptionActions
        addOption={addOption}
        addOtherOption={addOtherOption}
        getValues={getValues}
        fieldName={fieldName}
        selectedValue={
          pollOrSurvey === "poll" ? questionType : questionType[index]
        }
        index={index}
      />
    </React.Fragment>
  );
}

export default ImageChoice;
