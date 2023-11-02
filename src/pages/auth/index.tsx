import { useTheme } from "@mui/material";
import SignInForm from "../../components/authentication/Signin";
import SignUpForm from "../../components/authentication/Signup";
import React from "react";
import { blue, green, purple } from "@mui/material/colors";

const Authentication = () => {
  const theme = useTheme();
  const [type, setType] = React.useState("signUp");
  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="authentication">
      <div
        className={containerClass}
        id="container"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div
            className="overlay"
            style={{
              background: `background-image: linear-gradient(120deg, ${blue[500]} 0%, ${purple[500]} 100%);`,
            }}
          >
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
