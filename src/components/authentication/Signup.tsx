import React from "react";
import facebook_dark from "./../../images/svg/facebook_dark.svg";
import facebook_light from "./../../images/svg/facebook_light.svg";
import google_dark from "./../../images/svg/google_dark.svg";
import google_light from "./../../images/svg/google_light.svg";
import linkedin_dark from "./../../images/svg/linkedin_dark.svg";
import linkedin_light from "./../../images/svg/linkedin_light.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import Image from "next/image";
import {
  useTheme,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText,
  Link,
} from "@mui/material";

import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  PATTERN,
  PATTERN_EMAIL,
  PATTERN_PASSWORD,
  REQUIRED,
} from "../../constants/error";
import FormValidationError from "../../utility/FormValidationError";
import { ComponentInputProps } from "../../types";
import HttpService from "../../services/@http/HttpClient";

function SignUpForm({ handleSubmitMethod }: ComponentInputProps) {
  const theme = useTheme();
  const http = new HttpService();
  const [viewPwd, setViewPwd] = React.useState(false);
  const [emailExist, setEmailExist] = React.useState<null | boolean>(null);

  const methods = useForm<any>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isDirty, dirtyFields, touchedFields },
    register,
    reset,
    getValues,
  } = methods;

  const handleSignUpSubmit = (data: any) => {
    reset();
    handleSubmitMethod(data);
  };

  const checkEmailIsAlreadyPresent = async () => {
    console.log(getValues("email"));
    if (getValues("email").match(PATTERN_EMAIL)) {
      const res = await http.post("/auth/check-email-exists", {
        email: getValues("email"),
      });
      if ((res as any).userExist) {
        setEmailExist(true);
      } else {
        setEmailExist(false);
      }
    }
  };

  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  return (
    <FormProvider {...methods}>
      <div className="form-container sign-up-container">
        <form
          onSubmit={handleSubmit(handleSignUpSubmit)}
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <h1>Create Account</h1>
          <div className="social-container">
            {/* <a href="#" className="social">
              <Image
                src={
                  theme.palette.mode === "dark" ? facebook_light : facebook_dark
                }
                width={20}
                height={20}
                sizes="100vw"
                alt="Login With Facebook"
              />
            </a> */}
            <Link href="#" onClick={handleGoogleLogin} className="social">
              <Image
                src={theme.palette.mode === "dark" ? google_light : google_dark}
                width={20}
                height={20}
                sizes="100vw"
                alt="Login With Google"
              />
            </Link>
            {/* <a href="#" className="social">
              <Image
                src={
                  theme.palette.mode === "dark" ? linkedin_light : linkedin_dark
                }
                width={20}
                height={20}
                sizes="100vw"
                alt="Login With Linkedin"
              />
            </a> */}
          </div>
          <span>or use your email for registration</span>
          <OutlinedInput
            placeholder="Full Name"
            fullWidth
            size="small"
            sx={{ m: 1 }}
            error={!!errors?.name}
            {...register(`name` as const, {
              required: REQUIRED.NAME_REQUIRED_ONLY,
              pattern: {
                value: PATTERN,
                message: REQUIRED.PATTERN,
              },
            })}
          />
          <FormValidationError errorText={errors?.name?.message} />
          <OutlinedInput
            placeholder="john.doe@example.com"
            fullWidth
            size="small"
            sx={{ m: 1 }}
            error={!!errors?.email}
            {...register(`email` as const, {
              required: REQUIRED.EMAIL_REQUIRED_ONLY,
              pattern: {
                value: PATTERN_EMAIL,
                message: REQUIRED.EMAIL,
              },
            })}
            onBlur={checkEmailIsAlreadyPresent}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setViewPwd(!viewPwd)}
                  edge="end"
                >
                  {emailExist === null ? (
                    <></>
                  ) : emailExist === false ? (
                    <DoneIcon color="success" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {emailExist && (
            <FormHelperText error variant="outlined">
              Email Already Exist
            </FormHelperText>
          )}
          <FormValidationError errorText={errors?.email?.message} />

          <OutlinedInput
            placeholder="Password"
            fullWidth
            type={viewPwd ? "text" : "password"}
            size="small"
            sx={{ m: 1 }}
            error={!!errors?.password}
            {...register(`password` as const, {
              required: REQUIRED.PASSWORD_REQUIRED_ONLY,
              pattern: {
                value: PATTERN_PASSWORD,
                message: REQUIRED.PASSWORD,
              },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setViewPwd(!viewPwd)}
                  edge="end"
                >
                  {viewPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormValidationError errorText={errors?.password?.message} />

          <Button
            variant="contained"
            color="error"
            className="signUp"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}

export default SignUpForm;
