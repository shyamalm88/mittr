import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

import AllCreatedItemList from "./allCreatedItem";
import { ComponentInputProps } from "../../../types";

const MyRecentCreatedPollTemplate = ({ data }: ComponentInputProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        mb: 2,
        display: { xs: "none", sm: "none", lg: "block" },
      }}
    >
      <Divider sx={{ my: 1 }} />
      <AllCreatedItemList data={data} />
    </Box>
  );
};

export default MyRecentCreatedPollTemplate;
