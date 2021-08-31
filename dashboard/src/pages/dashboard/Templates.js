import React, { useState } from "react";

// material
// hooks
import useAuth from "../../hooks/useAuth";
// components
import Page from "../../components/Page";

import { Box, Container, Grid, Divider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import TemplatePersonal from "./TemplatePersonal";
import CompanySection from "./CompanySection";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import BusinessIcon from "@material-ui/icons/Business";
import { TextField, Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import renderHTML from "react-render-html";
// ----------------------------------------------------------------------

export default function Templates() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTemplate("");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  const [template, setTemplate] = useState("");

  const changeText = (event, editor) => {
    const data = editor.getData();
    setTemplate(data);
  };

  return (
    <Page title="Templates | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{ marginLeft: "20px", float: 'right' }}
        >
          Add Template
        </Button>
        <AppBar
          position="static"
          color="default"
          style={{
            marginBottom: "20px",
            boxShadow: "none",
            background: "transparent",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<PermContactCalendarIcon />}
              label="Personal"
              {...a11yProps(0)}
              style={{
                marginLeft: "40px",
                "& .MuiTab-wrapper": {
                  display: "flex",
                },
              }}
            />
            <Tab
              icon={<BusinessIcon />}
              label="Team"
              {...a11yProps(1)}
              style={{ marginRight: "40px" }}
            />
            <Tab
              icon={<BusinessIcon />}
              label="Library"
              {...a11yProps(1)}
              style={{ marginRight: "40px" }}
            />
          </Tabs>
          
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            style={{ padding: 0 }}
          >
            <TemplatePersonal />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            style={{ padding: 0 }}
          >
            <TemplatePersonal />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            dir={theme.direction}
            style={{ padding: 0 }}
          >
            <TemplatePersonal />
          </TabPanel>
        </SwipeableViews>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
      >
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid md={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  style={{ margin: "10px 0" }}
                  fullWidth
                />
                <TextField
                  label="Subject"
                  variant="outlined"
                  style={{ margin: "10px 0" }}
                  fullWidth
                />

                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={changeText}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
                <div style={{ margin: "10px 0" }}>
                  <TextField
                    label="Add New Tag"
                    variant="outlined"
                    fullWidth
                    style={{ margin: "10px 0" }}
                  />
                </div>
              </Grid>
            </Grid>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleClose}
                color="primary"
                style={{ marginRight: "8px" }}
              >
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary" variant="outlined">
                Save Template
              </Button>
            </div>
          </DialogContent>
        </Container>
      </Dialog>
    </Page>
  );
}
