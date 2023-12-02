import {
  Avatar,
  Box,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { ComponentInputProps } from "../../types";
import { green } from "@mui/material/colors";
import HttpService from "../../services/@http/HttpClient";
import { useAuthenticatedUserData } from "../../hooks/useAuthenticatedUserDataContext";
import Router from "next/router";
const settings = ["Profile", "Account", "Settings", "Logout"];

function ProfileDisplay({ userData }: ComponentInputProps) {
  const http = new HttpService();
  const { authenticatedUser, setAuthenticatedUser } =
    useAuthenticatedUserData();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleEachMenu = (setting: any) => {
    switch (setting) {
      case "Logout":
        http.get("/auth/logout").then((resp) => {
          if (resp === "logout") {
            setAuthenticatedUser(null);
            Router.reload();
          }
        });
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{
            p: 0,
            mt: { xs: "12px", sm: "8px" },
            mb: { xs: "12px", sm: "8px" },
          }}
        >
          <Avatar
            variant="rounded"
            alt={userData?.fullName}
            sx={{
              width: { xs: 24, sm: 32 },
              height: { xs: 24, sm: 32 },
              ml: 2,
              backgroundColor: green[500],
            }}
            src={
              userData?.profileImgUrl
                ? userData?.profileImgUrl
                : "/static/images/avatar/1.jpg"
            }
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleEachMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default ProfileDisplay;
