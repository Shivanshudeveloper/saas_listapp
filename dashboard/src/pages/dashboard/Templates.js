import React, { useState, useEffect } from "react";

// material
// hooks
import useAuth from "../../hooks/useAuth";
// components
import Page from "../../components/Page";

import { Box, Container, Grid, IconButton, Chip } from "@material-ui/core";
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
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Editor } from "@tinymce/tinymce-react";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { API_SERVICE } from "../../config";
import axios from "axios";
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

  const [openS, setOpenS] = React.useState(false);

  const handleClickS = () => {
    setOpenS(true);
  };

  const handleCloseS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenS(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFormData({
      ...formData,
      type: newValue === 0 ? "personal" : newValue === 1 ? "team" : "library",
    });
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

  const handleChangeEditor = (content, editor) => {
    setFormData({ ...formData, description: content });
  };

  const initialState = {
    name: "",
    subject: "",
    description: "",
    tag: "",
    type: "personal",
  };

  const [formData, setFormData] = useState(initialState);
  const [allSnippest, setallSnippest] = useState([]);

  useEffect(() => {
    getTemplates();
  }, [value]);

  useEffect(() => {
    getSnippests();
  }, []);

  const getSnippests = () => {
    axios
      .get(`${API_SERVICE}/getallsnippestfortemplates`)
      .then((res) => {
        setallSnippest(res.data);
      })
      .catch((err) => console.log(err));
  }

  const addTemplate = async () => {
    await axios
      .post(`${API_SERVICE}/addtemplate`, formData)
      .then((res) => {
        console.log(res);
        setFormData(initialState);
        handleClose();
        handleClickS();
        getTemplates();
      })
      .catch((err) => console.log(err));
  };

  const [allTemplates, setAllTemplates] = useState([]);

  const getTemplates = async () => {
    var type = "personal";
    type = value === 0 ? "personal" : value === 1 ? "team" : "library";
    await axios
      .get(`${API_SERVICE}/getalltemplates/${type}`)
      .then((res) => {
        setAllTemplates(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addSnippetTemplate = (descriptionadd) => {
    console.log(descriptionadd);
    setFormData({ ...formData, description: descriptionadd })
  }


  const [alltags, setalltags] = useState([]);


  useEffect(() => {
    getallTags();
  }, []);

  const getallTags = () => {
    axios
      .get(`${API_SERVICE}/getalltagstemplates`)
      .then((res) => {
        setalltags(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }


  return (
    <Page title="Templates | List App">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openS}
        autoHideDuration={6000}
        onClose={handleCloseS}
        message="Template Added"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseS}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{ marginLeft: "20px", float: "right" }}
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
            <TemplatePersonal
              handleClickOpenPrev={handleClickOpen}
              allTemplates={allTemplates}
              type={value === 0 ? "personal" : value === 1 ? "team" : "library"}
              setFormDataPrev={setFormData}
              value={value}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            style={{ padding: 0 }}
          >
            <TemplatePersonal
              handleClickOpenPrev={handleClickOpen}
              allTemplates={allTemplates}
              type={value === 0 ? "personal" : value === 1 ? "team" : "library"}
              setFormDataPrev={setFormData}
              value={value}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            dir={theme.direction}
            style={{ padding: 0 }}
          >
            <TemplatePersonal
              allTemplates={allTemplates}
              value={value}
              handleClickOpenPrev={handleClickOpen}
              type={value === 0 ? "personal" : value === 1 ? "team" : "library"}
              setFormDataPrev={setFormData}
            />
          </TabPanel>
        </SwipeableViews>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
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
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <TextField
                  label="Subject"
                  variant="outlined"
                  style={{ margin: "10px 0" }}
                  fullWidth
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />

                <div style={{ margin: "10px 0" }}>
                  {
                    allSnippest.length === 0 ? (
                      <>
                        No Snippets Found
                      </>
                    ) : (
                      <>
                      <Autocomplete
                        id="combo-box-demo"
                        options={allSnippest}
                        onChange={(event, newValue) => {
                          addSnippetTemplate(newValue.description)
                        }}
                        getOptionLabel={(option) => option.name}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="Add Snippets" variant="outlined" />}
                      />
                      </>
                    )
                  }
                </div>

                <Editor
                  apiKey="azhogyuiz16q8om0wns0u816tu8k6517f6oqgs5mfl36hptu"
                  plugins="wordcount"
                  value={formData.description}
                  init={{
                    height: '400px',
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={handleChangeEditor}
                />
                
                <div style={{ margin: "10px 0" }}>
                  <TextField
                    label="Add New Tag"
                    variant="outlined"
                    fullWidth
                    style={{ margin: "10px 0" }}
                    value={formData.tag}
                    onChange={(e) =>
                      setFormData({ ...formData, tag: e.target.value })
                    }
                  />
                </div>
                
                <div style={{ margin: "10px 0" }}>
                  {
                    alltags.length === 0 ? (
                      <>
                        No Available Tags Found
                      </>
                    ) : (
                      <>
                      <h5>Available Tags</h5>
                      {alltags.map((tag) => {
                        return (
                          <>
                            <Chip clickable onClick={() => setFormData({ ...formData, tag: tag.t })} style={{ marginRight: '10px', marginTop: '10px' }} label={tag.t} />
                          </>
                        )
                      })}
                      </>
                    )
                  }
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
              <Button onClick={addTemplate} color="primary" variant="outlined">
                Save Template
              </Button>
            </div>
          </DialogContent>
        </Container>
      </Dialog>
    </Page>
  );
}
