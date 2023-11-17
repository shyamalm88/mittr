import React from "react";
import facebook_dark from "./../../images/svg/facebook_dark.svg";
import facebook_light from "./../../images/svg/facebook_light.svg";
import google_dark from "./../../images/svg/google_dark.svg";
import google_light from "./../../images/svg/google_light.svg";
import linkedin_dark from "./../../images/svg/linkedin_dark.svg";
import linkedin_light from "./../../images/svg/linkedin_light.svg";
import Image from "next/image";
import { useTheme } from "@mui/material";

function SignInForm() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt: any) => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form
        onSubmit={handleOnSubmit}
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
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
