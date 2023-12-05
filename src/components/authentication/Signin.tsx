import React from "react";
import facebook_dark from "./../../images/svg/facebook_dark.svg";
import facebook_light from "./../../images/svg/facebook_light.svg";
import google_dark from "./../../images/svg/google_dark.svg";
import google_light from "./../../images/svg/google_light.svg";
import linkedin_dark from "./../../images/svg/linkedin_dark.svg";
import linkedin_light from "./../../images/svg/linkedin_light.svg";
import Image from "next/image";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useTheme,
  Link,
  Divider,
} from "@mui/material";
import { ComponentInputProps } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { REQUIRED } from "../../constants/error";
import FormValidationError from "../../utility/FormValidationError";

function SignInForm({ handleSubmitMethod }: ComponentInputProps) {
  const theme = useTheme();

  const [viewPwd, setViewPwd] = React.useState(false);

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

  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  const handleFacebookLogin = (e: any) => {
    e.preventDefault();
    window.open("http://localhost:3000/api/auth/facebook", "_self");
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
            {/* <Link href="#" onClick={handleFacebookLogin} className="social">
              <Image
                src={
                  theme.palette.mode === "dark" ? facebook_light : facebook_dark
                }
                width={20}
                height={20}
                sizes="100vw"
                alt="Login With Facebook"
              />
            </Link> */}
            <Link href="#" onClick={handleGoogleLogin} className="social">
              Sign in with Google
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
          <Divider sx={{ width: "100%" }}>or</Divider>
          <span>use your account</span>
          <OutlinedInput
            placeholder="Email"
            fullWidth
            size="small"
            sx={{ m: 1 }}
            error={!!errors?.email}
            {...register(`email` as const, {
              required: REQUIRED.EMAIL_REQUIRED_ONLY,
            })}
          />
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
          <Link style={{ m: 2 }} href="#">
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
