import React from "react";
import facebook from "./../../images/svg/facebook.svg";
import google from "./../../images/svg/google.svg";
import linkedin from "./../../images/svg/linkedin.svg";
import Image from "next/image";
import { useTheme } from "@mui/material";

function SignInForm() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
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
              src={facebook}
              width={20}
              height={20}
              alt="Login With Facebook"
            />
          </a>
          <a href="#" className="social">
            <Image
              src={google}
              width={20}
              height={20}
              alt="Login With Google"
            />
          </a>
          <a href="#" className="social">
            <Image
              src={linkedin}
              width={20}
              height={20}
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
