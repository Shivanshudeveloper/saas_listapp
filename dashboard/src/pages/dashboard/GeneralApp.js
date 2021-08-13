// material
import { Container, Grid } from "@material-ui/core";
// hooks
import useAuth from "../../hooks/useAuth";
// components
import Page from "../../components/Page";
import { AppNewInvoice } from "../../components/_dashboard/general-app";

import { Box, Card, Typography, TextField, Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" flexDirection="column">
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}% to goal (0/100)`}</Typography>
        </Box>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }

  return (
    <Page title="Search | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Box
          style={{
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Search</Typography>

          <div style={{ display: "flex" }}>
            <LinearProgressWithLabel
              value="0"
              style={{ marginRight: "10px", width: "150px" }}
            />
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Get Free Credits
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Upgrade to Unlimited
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Book a Demo
            </Button>
          </div>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Typography variant="subtitle1">Filters</Typography>
              <br />
              <Box style={{ margin: "10px 0" }}>
                <Typography variant="subtitle2">Titles</Typography>
                <TextField
                  style={{ marginTop: "5px" }}
                  label="Marketing Manager"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box style={{ margin: "10px 0" }}>
                <Typography variant="subtitle2">
                  Companies or Website
                </Typography>
                <TextField
                  style={{ marginTop: "5px" }}
                  label="Nike or nike.com"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box style={{ margin: "10px 0" }}>
                <Typography variant="subtitle2">Keywords</Typography>
                <TextField
                  style={{ marginTop: "5px" }}
                  label="Healthcare"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box style={{ margin: "10px 0" }}>
                <Typography variant="subtitle2">Names</Typography>
                <TextField
                  style={{ marginTop: "5px" }}
                  label="John Wick"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Box>
              <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button color="primary">Clear</Button>
                <Button variant="contained" color="primary">
                  Search
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} lg={9}>
            <AppNewInvoice />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
