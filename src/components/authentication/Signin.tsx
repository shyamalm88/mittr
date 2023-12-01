import React from "react";
import facebook_dark from "./../../images/svg/facebook_dark.svg";
import facebook_light from "./../../images/svg/facebook_light.svg";
import google_dark from "./../../images/svg/google_dark.svg";
import google_light from "./../../images/svg/google_light.svg";
import linkedin_dark from "./../../images/svg/linkedin_dark.svg";
import linkedin_light from "./../../images/svg/linkedin_light.svg";
import Image from "next/image";
import { Button, Link, TextField, useTheme } from "@mui/material";
import { ComponentInputProps, CreatePollSubmittedValueType } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import {
  PATTERN_EMAIL,
  PATTERN_PASSWORD,
  REQUIRED,
} from "../../constants/error";
import FormValidationError from "../../utility/FormValidationError";

function SignInForm({ handleSubmitMethod }: ComponentInputProps) {
  const theme = useTheme();

  const methods = useForm<any>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isDirty, dirtyFields, touchedFields },
    register,
    reset,
  } = methods;

  const handleSignInSubmit = (data: any) => {
    reset();
    handleSubmitMethod(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="form-container sign-in-container">
        <form
          onSubmit={handleSubmit(handleSignInSubmit)}
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <Image
                src={
                  theme.palette.mode === "dark" ? facebook_light : facebook_dark
                }
                width={20}
                height={20}
                sizes="100vw"
                alt="Login With Facebook"
              />
            </a>
            <a href="#" className="social">
              <Image
                src={theme.palette.mode === "dark" ? google_light : google_dark}
                width={20}
                height={20}
                sizes="100vw"
                alt="Login With Google"
              />
            </a>
            <a href="#" className="social">
              <Image
                src={
                  theme.palette.mode === "dark" ? linkedin_light : linkedin_dark
                }
                width={20}
                height={20}
                sizes="100vw"
                alt="Login With Linkedin"
              />
            </a>
          </div>
          <span>or use your account</span>
          <TextField
            placeholder="Email"
            size="small"
            sx={{ m: 1 }}
            error={!!errors?.email}
            {...register(`email` as const, {
              required: REQUIRED.EMAIL_REQUIRED_ONLY,
            })}
          />
          <FormValidationError errorText={errors?.email?.message} />
          <TextField
            placeholder="Password"
            type="password"
            size="small"
            sx={{ m: 1 }}
            error={!!errors?.password}
            {...register(`password` as const, {
              required: REQUIRED.PASSWORD_REQUIRED_ONLY,
            })}
          />
          <FormValidationError errorText={errors?.password?.message} />
          <Link sx={{ m: 2 }} href="#">
            Forgot your password?
          </Link>
          <Button
            variant="contained"
            color="secondary"
            className="signIn"
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}

export default SignInForm;
