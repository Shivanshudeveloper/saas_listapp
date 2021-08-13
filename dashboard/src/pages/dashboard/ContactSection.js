import React from "react";
import { ContactTable } from "../../components/_dashboard/general-app";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";

const ContactSection = () => {
  return (
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
            <Typography variant="subtitle2">Companies or Website</Typography>
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
        <ContactTable />
      </Grid>
    </Grid>
  );
};

export default ContactSection;