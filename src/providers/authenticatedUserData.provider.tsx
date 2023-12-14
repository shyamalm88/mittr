import React from "react";
import { ComponentInputProps } from "../types";
import HttpService from "../services/@http/HttpClient";

export const AuthenticatedUserDataContext = React.createContext<{
  authenticatedUser: any;
  setAuthenticatedUser: Function;
}>({ authenticatedUser: null, setAuthenticatedUser: () => {} });

function AuthenticatedUserDataProvider({ children }: ComponentInputProps) {
  const [authenticatedUser, setAuthenticatedUser] = React.useState<any | null>(
    null
  );
  const http = new HttpService();
  React.useEffect(() => {
    http
      .get("/auth/request-user")
      .then((res) => {
        // // console.log(res);
        setAuthenticatedUser(res);
      })
      .catch((err) => setAuthenticatedUser(null));
  }, []);
  return (
    <AuthenticatedUserDataContext.Provider
      value={{ authenticatedUser, setAuthenticatedUser }}
    >
      {children}
    </AuthenticatedUserDataContext.Provider>
  );
}

export default AuthenticatedUserDataProvider;
