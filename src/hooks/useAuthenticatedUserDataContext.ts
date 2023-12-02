import React from "react";
import { AuthenticatedUserDataContext } from "../providers/authenticatedUserData.provider";

export const useAuthenticatedUserData = (): any => {
  const { authenticatedUser, setAuthenticatedUser } = React.useContext(
    AuthenticatedUserDataContext
  );
  return { authenticatedUser, setAuthenticatedUser };
};
