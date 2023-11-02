import React from "react";
import facebook from "./../../images/svg/facebook.svg";
import google from "./../../images/svg/google.svg";
import linkedin from "./../../images/svg/linkedin.svg";
import Image from "next/image";
import { useTheme } from "@mui/material";

function SignUpForm() {
  const theme = useTheme();
  const [state, setState] = React.useState({
    name: "",
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

    const { name, email, password } = state;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form
        onSubmit={handleOnSubmit}
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <Image
              src={facebook}
              width={20}
              height={20}
              sizes="100vw"
              alt="Login With Facebook"
            />
          </a>
          <a href="#" className="social">
            <Image
              src={google}
              width={20}
              height={20}
              sizes="100vw"
              alt="Login With Google"
            />
          </a>
          <a href="#" className="social">
            <Image
              src={linkedin}
              width={20}
              height={20}
              sizes="100vw"
              alt="Login With Linkedin"
            />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
