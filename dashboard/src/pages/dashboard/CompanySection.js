import React, { useState } from "react";

import { CompanyTable } from "../../components/_dashboard/general-app";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const CompanySection = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <CompanyTable handleClickOpen={handleClickOpen} />
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Filter</DialogTitle>
        <DialogContent>
          <br />
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Industries</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="Marketing Manager"
              variant="filled"
              size="small"
              fullWidth
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Employee Sizes</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="Nike or nike.com"
              variant="filled"
              size="small"
              fullWidth
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Employee Revenue</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="Healthcare"
              variant="filled"
              size="small"
              fullWidth
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Locations</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="John Wick"
              variant="filled"
              size="small"
              fullWidth
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Technologies</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="John Wick"
              variant="filled"
              size="small"
              fullWidth
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Companies or Websites</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="John Wick"
              variant="filled"
              size="small"
              fullWidth
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Company Keywords</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="John Wick"
              variant="filled"
              size="small"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CompanySection;
