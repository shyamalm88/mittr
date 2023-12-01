import { Button, useTheme } from "@mui/material";
import SignInForm from "../../components/authentication/Signin";
import SignUpForm from "../../components/authentication/Signup";
import React from "react";
import { blue, green, purple } from "@mui/material/colors";
import HttpService from "../../services/@http/HttpClient";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Authentication = () => {
  const router = useRouter();
  const http = new HttpService();
  const theme = useTheme();
  const [type, setType] = React.useState("signUp");
  const handleOnClick = (text: string) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const handleSignUpSubmit = async (data: any) => {
    try {
      const response = await http.service().post(`/auth/signup`, data);
      console.log(response);
      if (response) {
        toast.success(`You have successfully registered.`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          autoClose: 700,
        });

        toast.onChange((payload) => {
          if (
            payload.status === "removed" &&
            payload.type === toast.TYPE.SUCCESS
          ) {
            setType("login");
          }
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSignInSubmit = async (data: any) => {
    try {
      const response = await http.service().post(`/auth/signin`, data);
      console.log(response);
      if (response) {
        toast.success(`You have successfully Signed In.`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          autoClose: 700,
        });

        toast.onChange((payload) => {
          if (
            payload.status === "removed" &&
            payload.type === toast.TYPE.SUCCESS
          ) {
            router.push("/dashboard");
          }
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
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
        <SignUpForm handleSubmitMethod={handleSignUpSubmit} />
        <SignInForm handleSubmitMethod={handleSignInSubmit} />
        <div className="overlay-container">
          <div
            className="overlay"
            style={{
              backgroundImage: `linear-gradient(120deg, ${blue[500]} 0%, ${purple[500]} 100%)`,
            }}
          >
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <Button
                className="ghost"
                id="signIn"
                variant="contained"
                color="secondary"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Button
                className="ghost"
                id="signUp"
                variant="contained"
                color="error"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
