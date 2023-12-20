import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Chart } from "react-google-charts";
import { LineChart } from "../analytics/chart/LineChart";
import { AreaChart } from "../analytics/chart/AreaChart";
import { blue, green, purple, yellow } from "@mui/material/colors";

function DetailsView() {
  return (
    <>
      <Grid container spacing={2} sx={{ my: 2, px: { xs: 2 } }}>
        <Grid item xs={12} sm={6} lg={4} sx={{ mt: { xs: 2 } }}>
          <Card
            sx={{
              overflow: "visible",
              position: "relative",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <CardContent sx={{ position: "relative" }}>
              <Box
                sx={{
                  background: green[600],
                  position: "relative",
                  height: "200px",
                  top: "-30px",
                  borderRadius: "4px",
                  mb: "-30px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                }}
              >
                <AreaChart white noLegends single />
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="h2">
                Poll Interactions
              </Typography>
              <Typography variant="body2">
                Based on Recent Interactions
              </Typography>
            </CardContent>
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
            <CardActions disableSpacing>
              <Typography variant="body1" color="primary" sx={{ pr: 1 }}>
                +55%
              </Typography>
              than last week
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} sx={{ mt: { xs: 2 } }}>
          <Card
            sx={{
              overflow: "visible",
              position: "relative",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <CardContent sx={{ position: "relative" }}>
              <Box
                sx={{
                  background: blue[600],
                  position: "relative",
                  height: "200px",
                  top: "-30px",
                  borderRadius: "4px",
                  mb: "-30px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                }}
              >
                <LineChart noLegends single />
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="h2">
                Survey Participation
              </Typography>
              <Typography variant="body2">
                Individual Users Participation
              </Typography>
            </CardContent>
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
            <CardActions disableSpacing>
              <Typography variant="body1" color="primary" sx={{ pr: 1 }}>
                +55%
              </Typography>
              than last week
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} sx={{ mt: { xs: 2 } }}>
          <Card
            sx={{
              overflow: "visible",
              position: "relative",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
            }}
          >
            <CardContent sx={{ position: "relative" }}>
              <Box
                sx={{
                  background: purple[400],
                  position: "relative",
                  height: "200px",
                  top: "-30px",
                  borderRadius: "4px",
                  mb: "-30px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                }}
              >
                <LineChart noLegends single />
              </Box>
            </CardContent>
            <CardContent>
              <Typography variant="h5" component="h2">
                Survey Views
              </Typography>
              <Typography variant="body2">Survey Views</Typography>
            </CardContent>
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
            <CardActions disableSpacing>
              <Typography variant="body1" color="primary" sx={{ pr: 1 }}>
                +55%
              </Typography>
              than last week
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DetailsView;
