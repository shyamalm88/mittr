import React from "react";
import facebook_dark from "./../../images/svg/facebook_dark.svg";
import facebook_light from "./../../images/svg/facebook_light.svg";
import google_dark from "./../../images/svg/google_dark.svg";
import google_light from "./../../images/svg/google_light.svg";
import linkedin_dark from "./../../images/svg/linkedin_dark.svg";
import linkedin_light from "./../../images/svg/linkedin_light.svg";
import Image from "next/image";
import { useTheme, TextField } from "@mui/material";

import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  PATTERN,
  PATTERN_EMAIL,
  PATTERN_PASSWORD,
  REQUIRED,
} from "../../constants/error";
import FormValidationError from "../../utility/FormValidationError";
import { useRouter } from "next/router";
import { ComponentInputProps } from "../../types";

function SignUpForm({ handleSubmitMethod }: ComponentInputProps) {
  const theme = useTheme();

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
  } = methods;

  const handleSignUpSubmit = (data: any) => {
    reset();
    handleSubmitMethod(data);
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
          <span>or use your email for registration</span>
          <TextField
            placeholder="Full Name"
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
          <TextField
            placeholder="john.doe@example.com"
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
              pattern: {
                value: PATTERN_PASSWORD,
                message: REQUIRED.PASSWORD,
              },
            })}
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
