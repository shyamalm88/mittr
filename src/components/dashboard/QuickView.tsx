import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { red, green, blue, purple } from "@mui/material/colors";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";

function QuickView() {
  return (
    <Grid container spacing={2} sx={{ my: 2, px: { xs: 2 } }}>
      <Grid item xs={12} sm={6} lg={3} sx={{ mt: { xs: 2 } }}>
        <Card
          sx={{
            overflow: "visible",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <CardHeader
            sx={{ position: "relative", pt: 2 }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: green[500],
                  position: "absolute",
                  top: "-15px",
                  width: 56,
                  height: 56,
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                }}
                variant="rounded"
              >
                <LeaderboardOutlinedIcon fontSize="large" />
              </Avatar>
            }
            title={<Typography align="right">Total Users Visit</Typography>}
            subheader={
              <Typography align="right" variant="h5" component="h2">
                43K
              </Typography>
            }
          />
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
      <Grid item xs={12} sm={6} lg={3} sx={{ mt: { xs: 2 } }}>
        <Card
          sx={{
            overflow: "visible",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <CardHeader
            sx={{ position: "relative", pt: 2 }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: blue[500],
                  position: "absolute",
                  top: "-15px",
                  width: 56,
                  height: 56,
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                }}
                variant="rounded"
              >
                <DonutLargeOutlinedIcon fontSize="large" />
              </Avatar>
            }
            title={<Typography align="right">Total Users Visit</Typography>}
            subheader={
              <Typography align="right" variant="h5" component="h2">
                43K
              </Typography>
            }
          />
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
              backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important`,
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
      <Grid item xs={12} sm={6} lg={3} sx={{ mt: { xs: 2 } }}>
        <Card
          sx={{
            overflow: "visible",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <CardHeader
            sx={{ position: "relative", pt: 2 }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: red[500],
                  position: "absolute",
                  top: "-15px",
                  width: 56,
                  height: 56,
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                }}
                variant="rounded"
              >
                <SignalCellularAltOutlinedIcon fontSize="large" />
              </Avatar>
            }
            title={<Typography align="right">Latest Impressions</Typography>}
            subheader={
              <Typography align="right" variant="h5" component="h2">
                670
              </Typography>
            }
          />
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
              backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important`,
            }}
          />
          <CardActions disableSpacing>
            <Typography variant="body1" color="error" sx={{ pr: 1 }}>
              -55%
            </Typography>
            than last week
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3} sx={{ mt: { xs: 2 } }}>
        <Card
          sx={{
            overflow: "visible",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
          }}
        >
          <CardHeader
            sx={{ position: "relative", pt: 2 }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: purple[500],
                  position: "absolute",
                  top: "-15px",
                  width: 56,
                  height: 56,
                  boxShadow:
                    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
                }}
                variant="rounded"
              >
                <SignalCellularAltOutlinedIcon fontSize="large" />
              </Avatar>
            }
            title={<Typography align="right">Latest Impressions</Typography>}
            subheader={
              <Typography align="right" variant="h5" component="h2">
                670
              </Typography>
            }
          />
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
              backgroundImage: `linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0)) !important`,
            }}
          />
          <CardActions disableSpacing>
            <Typography variant="body1" color="error" sx={{ pr: 1 }}>
              -55%
            </Typography>
            than last week
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default QuickView;
