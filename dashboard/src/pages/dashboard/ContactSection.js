import React, { useState } from "react";

import { ContactTable } from "../../components/_dashboard/general-app";

import { TextField, Button, Grid, Box, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const ContactSection = () => {
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
        <ContactTable handleClickOpen={handleClickOpen} />
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

export default ContactSection;
