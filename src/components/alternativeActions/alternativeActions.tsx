import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import { Divider } from "@mui/material";

function AlternativeActions() {
  return (
    <MenuList>
      <MenuItem sx={{ pl: 1 }}>
        <ListItemIcon>
          <RemoveRedEyeOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ fontSize: ".85em" }}>Preview</Typography>
        </ListItemText>
      </MenuItem>
      <Divider
        sx={{
          flexShrink: 0,
          opacity: 0.25,
          borderTop: "0px solid rgba(0, 0, 0, 0.12)",
          borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
          borderRight: "0px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "transparent",
          height: "0.0625rem",
          margin: "1rem 0px",
          borderBottom: "none",
          backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.3), rgba(52, 71, 103, 0)) !important`,
        }}
      />
      <MenuItem sx={{ pl: 1 }}>
        <ListItemIcon>
          <RouteOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ fontSize: ".85em" }}>Logic</Typography>
        </ListItemText>
      </MenuItem>
      <Divider
        sx={{
          flexShrink: 0,
          opacity: 0.25,
          borderTop: "0px solid rgba(0, 0, 0, 0.12)",
          borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
          borderRight: "0px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "transparent",
          height: "0.0625rem",
          margin: "1rem 0px",
          borderBottom: "none",
          backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.3), rgba(52, 71, 103, 0)) !important`,
        }}
      />
      <MenuItem sx={{ pl: 1 }}>
        <ListItemIcon>
          <ViewComfyOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ fontSize: ".85em" }}>Template</Typography>
        </ListItemText>
      </MenuItem>
      <Divider
        sx={{
          flexShrink: 0,
          opacity: 0.25,
          borderTop: "0px solid rgba(0, 0, 0, 0.12)",
          borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
          borderRight: "0px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "transparent",
          height: "0.0625rem",
          margin: "1rem 0px",
          borderBottom: "none",
          backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.3), rgba(52, 71, 103, 0)) !important`,
        }}
      />
      <MenuItem sx={{ pl: 1 }}>
        <ListItemIcon>
          <BrushOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ fontSize: ".85em" }}>Design</Typography>
        </ListItemText>
      </MenuItem>
      <Divider
        sx={{
          flexShrink: 0,
          opacity: 0.25,
          borderTop: "0px solid rgba(0, 0, 0, 0.12)",
          borderLeft: "0px solid rgba(0, 0, 0, 0.12)",
          borderRight: "0px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "transparent",
          height: "0.0625rem",
          margin: "1rem 0px",
          borderBottom: "none",
          backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.3), rgba(52, 71, 103, 0)) !important`,
        }}
      />
      <MenuItem sx={{ pl: 1 }}>
        <ListItemIcon>
          <Inventory2OutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ fontSize: ".85em" }}>Query Vault</Typography>
        </ListItemText>
      </MenuItem>
    </MenuList>
  );
}

export default AlternativeActions;
