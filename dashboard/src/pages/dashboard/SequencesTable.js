import React, { useState, useEffect } from "react";
import faker from "faker";
import {
  Checkbox,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  IconButton,
  Typography,
  TextField,
  Grid,
  Box,
  Container,
  Autocomplete,
  Chip,
  Paper,
  Card,
  InputBase,
  StepLabel,
  Step,
  Stepper,
  Switch,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Scrollbar from "../../components/Scrollbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import FilterListIcon from "@material-ui/icons/FilterList";
import CallIcon from "@material-ui/icons/Call";
import CheckIcon from "@material-ui/icons/Check";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import SmsIcon from "@material-ui/icons/Sms";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Editor } from "@tinymce/tinymce-react";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { API_SERVICE } from "../../config";
import axios from "axios";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import renderHTML from "react-render-html";
import PropTypes from "prop-types";

import SequencesProspects from "./SequencesProspects";
import SequencesEmail from "./SequencesEmail";
import SequencesCall from "./SequencesCall";

export default function SequencesTable() {
  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };
  const [openTask, setOpenTask] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const userName = localStorage.getItem("userName");

  const handleClickAdd = () => {
    setValue(0);
    getContacts();
    setOpenTask(true);
  };
  const handleClickCall = () => {
    setOpenCall(true);
  };

  const handleCloseAdd = () => {
    setOpenTask(false);
    setOpenCall(false);
    setFormData(initialState);
    setIsEdit(true);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setFormData(initialState);
    setValue(newValue);
    setIsEdit(false);
  };

  const [allContacts, setAllContacts] = useState([]);
  const getContacts = async () => {
    await axios
      .get(`${API_SERVICE}/getallcontact`)
      .then((res) => {
        setAllContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const initialState = {
    type0: "",
    run0: "",
    checked0: false,
    time0: "",
    checked1: false,
    time1: "",
    checked2: false,
    time2: "",
    checked3: false,
    time3: "",
    templateName0: "",
    templateDesc0: "",
    instruction1: "",
    run1: "",
    priority1: "",
    type2: "",
    notes2: "",
    run2: "",
    priority2: "",
    type3: "",
    notes3: "",
    run3: "",
    priority3: "",
    type4: "",
    message4: "",
    run4: "",
    checked4: "",
    time4: "",
  };

  const [formData, setFormData] = useState(initialState);
  const Desc = (content, editor) => {
    setFormData({ ...formData, desc2: content });
  };

  const [allTasks, setAllTasks] = useState([]);

  const getcompletedtasks = async () => {
    // await axios
    //   .get(`${API_SERVICE}/getcompletedtasks`)
    //   .then((res) => {
    //     setAllTasks(res.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const getTasks = async () => {
    // await axios
    //   .get(`${API_SERVICE}/getalltasks`)
    //   .then((res) => {
    //     setAllTasks(res.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const [isEdit, setIsEdit] = useState(false);

  const startEdit = async (row) => {
    setIsEdit(true);
    setFormData({
      contact0: row.contact,
      notes0: row.notes,
      contact1: row.contact,
      call1: row.call,
      notes1: row.notes,
      contact2: row.contact,
      date0: row.date,
      date1: row.date,
      date2: row.date,
      desc2: row.description,
      contact3: row.contact,
      date3: row.date,
      action3: row.action,
      desc3: row.description,
      id: row._id,
    });
    setValue(row.value);
    setOpenTask(true);
  };

  const editTask = async () => {
    const option =
      value === 0
        ? "Email"
        : value === 1
        ? "Call Log"
        : value === 2
        ? "LinkedIn"
        : value === 4
        ? "Twitter"
        : "Message";
    await axios
      .patch(`${API_SERVICE}/edittask`, {
        formData,
        option,
        value,
      })
      .then((res) => {
        handleCloseAdd();
        // getStepsSeq();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setAllfiltertags([]);
  //   // getStepsSeq();
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const [searchQuery, setSearchQuery] = useState({
    contact: "",
    type: "",
    status: "",
  });

  const searchTask = async () => {
    if (searchQuery.contact !== "")
      setAllfiltertags((prev) => [...prev, searchQuery.contact]);

    if (searchQuery.type !== "")
      setAllfiltertags((prev) => [...prev, searchQuery.type]);

    if (searchQuery.status !== "")
      setAllfiltertags((prev) => [...prev, searchQuery.status]);

    await axios
      .post(`${API_SERVICE}/searchtask?`, {
        contact: searchQuery.contact || "none",
        type: searchQuery.type || "none",
        status: searchQuery.status || "none",
      })
      .then((res) => {
        setAllTasks(res.data);
        handleClose();
        setSearchQuery({
          contact: "",
          type: "",
          status: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const types = [
    { name: "Note" },
    { name: "Call Log" },
    { name: "Email" },
    { name: "Linkedin" },
  ];

  const [allfiltertags, setAllfiltertags] = useState([]);
  const removeFilterTag = (tag) => {
    // getStepsSeq();
    let index = allfiltertags.indexOf(tag);
    allfiltertags.splice(index, 1);
  };

  const completedTypes = [{ name: "Completed" }, { name: "Not Completed" }];

  const [searchField, setSearchField] = useState("");
  const search = () => {
    setSearchField("");
    if (searchField !== "") {
      setAllfiltertags((prev) => [...prev, searchField]);
      axios
        .post(`${API_SERVICE}/searchtasks`, {
          searchField,
        })
        .then((res) => {
          setAllTasks(res.data);
        })
        .catch((err) => console.log(err));
    } else getContacts();
  };

  const [addSeq, setAddSeq] = useState(false);
  const [sequenceId, setSequenceId] = useState("");
  const [sequence, setSequence] = useState([]);
  const [allSequence, setAllSequence] = useState([]);
  const [templates, setTemplates] = useState([]);

  const addTaskSequence = async () => {
    const option =
      value === 0
        ? "Email"
        : value === 1
        ? "Call"
        : value === 2
        ? "LinkedIn"
        : value === 3
        ? "Twitter"
        : "SMS";
    await axios
      .post(`${API_SERVICE}/addtasksequence`, {
        formData,
        option,
        value,
        sequenceId,
      })
      .then((res) => {
        console.log(res.data);
        handleCloseAdd();
        setFormData(initialState);
        getStepsSeq(sequenceId);
      })
      .catch((err) => console.log(err));
  };

  const newSequence = async () => {
    await axios
      .post(`${API_SERVICE}/newsequence`)
      .then((res) => {
        console.log(res.data);
        setSequenceId(res.data.id);
        getStepsSeq(res.data.id);
      })
      .catch((err) => console.log(err));
  };
  const deleteRow = async (id) => {
    await axios
      .delete(`${API_SERVICE}/deletesequence/${id}`)
      .then(() => {
        getSeqs();
      })
      .catch((err) => console.log(err));
  };

  const getStepsSeq = async (id) => {
    if (id !== undefined)
      await axios
        .get(`${API_SERVICE}/gettasksequence/${id}`)
        .then((res) => {
          console.log(res.data);
          setSequence(res.data);
        })
        .catch((err) => console.log(err));
  };
  const getSeqs = async () => {
    await axios
      .get(`${API_SERVICE}/getallsequence/`)
      .then((res) => {
        setAllSequence(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSeqs();
  }, []);

  const getAllTemplates = async () => {
    await axios
      .get(`${API_SERVICE}/getalltemplates/personal`)
      .then((res) => {
        setTemplates(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (addSeq === true) getStepsSeq();
    if (addSeq === true && value === 0) getAllTemplates();
  }, [addSeq]);

  const handleChangeEditorDesc = (content, editor) => {
    setFormData({ ...formData, templateDesc0: content });
  };
  console.log(sequence?.steps);

  //
  //
  //
  //
  //
  function TabPanelNew(props) {
    const { children, valueTab, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={valueTab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {valueTab === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanelNew.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    valueTab: PropTypes.number.isRequired,
  };

  function a11yPropsTab(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [valueTab, setValueTab] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const [testData, setTestData] = useState("");

  const testEvent = async () => {
    await axios.post(`${API_SERVICE}/testsequence`, { testData });
    handleCloseAdd();
    // .then((res) => {
    // })
    // .catch((err) => console.log(err));
  };

  return (
    <>
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
            <TextField
              style={{ marginTop: "5px" }}
              label="Contact"
              variant="filled"
              size="small"
              fullWidth
              name="contact"
              value={searchQuery.contact}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, contact: e.target.value })
              }
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Autocomplete
              inputValue={searchQuery.status}
              onInputChange={(event, newValue) => {
                setSearchQuery({ ...searchQuery, status: newValue });
              }}
              options={completedTypes}
              getOptionLabel={(option) => `${option.name}`}
              renderInput={(params) => (
                <TextField {...params} label="Status" variant="outlined" />
              )}
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Autocomplete
              inputValue={searchQuery.type}
              onInputChange={(event, newValue) => {
                setSearchQuery({ ...searchQuery, type: newValue });
              }}
              options={types}
              getOptionLabel={(option) => `${option.name}`}
              renderInput={(params) => (
                <TextField {...params} label="Type" variant="outlined" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={searchTask} color="primary" variant="contained">
            Search
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openTask} onClose={handleCloseAdd} maxWidth="md" fullWidth>
        <Container maxWidth="md">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<EmailIcon />} />
              <Tab icon={<CallIcon />} />
              <Tab icon={<LinkedInIcon />} />
              <Tab icon={<TwitterIcon />} />
              <Tab icon={<MessageIcon />} />
            </Tabs>
          </div>
          {value === 0 && (
            <>
              <DialogTitle>Add Email Step</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Test On A Interval"
                      fullWidth
                      value={testData}
                      onChange={(e) => setTestData(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "10px",
                    }}
                  >
                    <Button variant="contained" onClick={testEvent}>
                      Test
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.type0}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, type0: newValue });
                      }}
                      options={[{ message: "Auto" }, { message: "Manual" }]}
                      getOptionLabel={(option) => `${option.message}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Email Type"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Run this step on day"
                      fullWidth
                      value={formData.run0}
                      onChange={(e) =>
                        setFormData({ ...formData, run0: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      checked={formData.checked0}
                      onChange={(e) =>
                        setFormData({ ...formData, checked0: e.target.checked })
                      }
                    />
                    Send at a specific time
                  </Grid>
                  {formData?.checked0 === true && (
                    <Grid item xs={12}>
                      <TextField
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 60000, // 5 min
                        }}
                        value={formData.time0}
                        onChange={(e) =>
                          setFormData({ ...formData, time0: e.target.value })
                        }
                      />
                    </Grid>
                  )}
                  <br />
                  TEMPLATE
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.templateName0}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, templateName0: newValue });
                      }}
                      onChange={(event, newValue) => {
                        setFormData({
                          ...formData,
                          templateDesc0: newValue.description,
                          templateName0: newValue.name,
                        });
                      }}
                      options={templates}
                      getOptionLabel={(option) => `${option.name}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Template"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Editor
                      apiKey="azhogyuiz16q8om0wns0u816tu8k6517f6oqgs5mfl36hptu"
                      plugins="wordcount"
                      value={formData.templateDesc0}
                      init={{
                        height: 600,
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
                      onEditorChange={handleChangeEditorDesc}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
          {value === 1 && (
            <>
              <DialogTitle>Add Call Step</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Instructions"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.instruction1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          instruction1: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Run this step on day"
                      fullWidth
                      value={formData.run1}
                      onChange={(e) =>
                        setFormData({ ...formData, run1: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      checked={formData.checked1}
                      onChange={(e) =>
                        setFormData({ ...formData, checked1: e.target.checked })
                      }
                    />
                    Send at a specific time
                  </Grid>
                  {formData?.checked1 === true && (
                    <Grid item xs={12}>
                      <TextField
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 60000, // 5 min
                        }}
                        value={formData.time1}
                        onChange={(e) =>
                          setFormData({ ...formData, time1: e.target.value })
                        }
                      />
                    </Grid>
                  )}
                  <br />
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.priority1}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, priority1: newValue });
                      }}
                      options={[
                        { message: "Critical" },
                        { message: "High" },
                        { message: "Normal" },
                        { message: "Low" },
                      ]}
                      getOptionLabel={(option) => `${option.message}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Priority"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
          {value === 2 && (
            <>
              <DialogTitle>Add LinkedIn Step</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.type2}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, type2: newValue });
                      }}
                      options={[
                        { message: "View Profile" },
                        { message: "Connection Request" },
                        { message: "InMail" },
                        { message: "Other" },
                      ]}
                      getOptionLabel={(option) => `${option.message}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Touch Type"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Notes / Pointers"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.notes2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          notes2: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Run this step on day"
                      fullWidth
                      value={formData.run2}
                      onChange={(e) =>
                        setFormData({ ...formData, run2: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      checked={formData.checked2}
                      onChange={(e) =>
                        setFormData({ ...formData, checked2: e.target.checked })
                      }
                    />
                    Send at a specific time
                  </Grid>
                  {formData?.checked2 === true && (
                    <Grid item xs={12}>
                      <TextField
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 60000, // 5 min
                        }}
                        value={formData.time2}
                        onChange={(e) =>
                          setFormData({ ...formData, time2: e.target.value })
                        }
                      />
                    </Grid>
                  )}
                  <br />

                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.priority2}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, priority2: newValue });
                      }}
                      options={[
                        { message: "Critical" },
                        { message: "High" },
                        { message: "Normal" },
                        { message: "Low" },
                      ]}
                      getOptionLabel={(option) => `${option.message}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Priority"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
          {value === 3 && (
            <>
              <DialogTitle>Add Twitter Step</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.type3}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, type3: newValue });
                      }}
                      options={[
                        { message: "Follow" },
                        { message: "Retweet" },
                        { message: "Other" },
                      ]}
                      getOptionLabel={(option) => `${option.message}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Touch Type"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Notes / Pointers"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.notes3}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          notes3: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Run this step on day"
                      fullWidth
                      value={formData.run3}
                      onChange={(e) =>
                        setFormData({ ...formData, run3: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      checked={formData.checked3}
                      onChange={(e) =>
                        setFormData({ ...formData, checked3: e.target.checked })
                      }
                    />
                    Send at a specific time
                  </Grid>
                  {formData?.checked3 === true && (
                    <Grid item xs={12}>
                      <TextField
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 60000, // 5 min
                        }}
                        value={formData.time3}
                        onChange={(e) =>
                          setFormData({ ...formData, time3: e.target.value })
                        }
                      />
                    </Grid>
                  )}
                  <br />
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.priority3}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, priority3: newValue });
                      }}
                      options={[
                        { message: "Critical" },
                        { message: "High" },
                        { message: "Normal" },
                        { message: "Low" },
                      ]}
                      getOptionLabel={(option) => `${option.message}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Priority"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
          {value === 4 && (
            <>
              <DialogTitle>Add SMS Step</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.type4}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, type4: newValue });
                      }}
                      options={[{ message: "Auto" }, { message: "Manual" }]}
                      getOptionLabel={(option) => `${option.message}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="SMS Type"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Enter Your SMS"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.message4}
                      onChange={(e) =>
                        setFormData({ ...formData, message4: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Run this step on day"
                      fullWidth
                      value={formData.run4}
                      onChange={(e) =>
                        setFormData({ ...formData, run4: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      checked={formData.checked4}
                      onChange={(e) =>
                        setFormData({ ...formData, checked4: e.target.checked })
                      }
                    />
                    Send at a specific time
                  </Grid>
                  {formData?.checked4 === true && (
                    <Grid item xs={12}>
                      <TextField
                        label="Time"
                        type="time"
                        defaultValue="07:30"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 6000, // 5 min
                        }}
                        value={formData.time4}
                        onChange={(e) =>
                          setFormData({ ...formData, time4: e.target.value })
                        }
                      />
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
            </>
          )}
        </Container>
        <Box sx={{ flexGrow: 1 }} />
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button
            onClick={addTaskSequence}
            color="primary"
            autoFocus
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <>
        {!addSeq ? (
          <div
            style={{
              padding: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">All Sequences</Typography>
              {/* <Button
            variant="outlined"
            onClick={handleClickOpen}
            startIcon={<FilterListIcon />}
            style={{ marginLeft: "20px" }}
          >
            Filter
          </Button> */}

              <Button
                variant="outlined"
                onClick={() => {
                  getSeqs();
                  setAllfiltertags([]);
                }}
                style={{ marginLeft: "20px" }}
              >
                Refresh
              </Button>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  setAddSeq(true);
                  newSequence();
                }}
              >
                Add Sequence
              </Button>
              <Paper
                style={{
                  background: "#F4F6F8",
                  marginLeft: "18px",
                  paddingLeft: "5px",
                }}
              >
                <InputBase
                  placeholder="Search Sequences"
                  style={{ width: "250px" }}
                  value={searchField}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      search();
                    }
                  }}
                  onChange={(e) => {
                    setSearchField(e.target.value);
                  }}
                />
                <IconButton sx={{ p: 1 }} onClick={search}>
                  <SearchIcon />
                </IconButton>
                <IconButton
                  sx={{ p: 1 }}
                  onClick={() => {
                    setSearchField("");
                    setAllfiltertags([]);
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Sequences</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  setAddSeq(false);
                  getSeqs();
                }}
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
      </>
      <section style={{ margin: "10px" }}>
        {allfiltertags.length === 0 ? (
          <></>
        ) : (
          <>
            {allfiltertags.map((tag) => {
              return (
                <>
                  <Chip
                    onDelete={() => removeFilterTag(tag)}
                    style={{ marginRight: "10px", marginTop: "10px" }}
                    label={tag}
                  />
                </>
              );
            })}
          </>
        )}
      </section>
      {!addSeq && (
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Steps</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSequence.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell style={tableCellStyle}>Sequence</TableCell>
                    <TableCell style={tableCellStyle}>
                      {row?.steps?.length}
                    </TableCell>
                    <TableCell style={tableCellStyle}>{row._id}</TableCell>
                    <TableCell style={tableCellStyle} align="center">
                      <Button
                        onClick={() => {
                          setSequenceId(row._id);
                          setAddSeq(true);
                          getStepsSeq(row._id);
                        }}
                        variant="outlined"
                      >
                        View
                      </Button>
                      <IconButton onClick={() => deleteRow(row._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      )}
      {addSeq && (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="Steps" {...a11yPropsTab(0)} />
              <Tab label="Prospects" {...a11yPropsTab(1)} />
              <Tab label="Emails" {...a11yPropsTab(2)} />
              <Tab label="Calls" {...a11yPropsTab(3)} />
            </Tabs>
          </Box>
          <TabPanelNew valueTab={valueTab} index={0}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                style={{ marginLeft: "20px" }}
                onClick={handleClickAdd}
              >
                Add
              </Button>
            </div>
            <Paper sx={{ p: 5 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Number Of Steps : {sequence?.steps?.length}
              </Typography>

              {sequence?.steps?.map((seq) => (
                <Card
                  elevation={2}
                  style={{
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "10px !important",
                  }}
                >
                  <Typography variant="body1">
                    STEP #{seq?.stepNo} : {seq?.option} on day {seq?.run}
                  </Typography>
                  <br />
                  <div
                    style={{
                      paddingLeft: "70px",
                      marginLeft: "10px",
                    }}
                  >
                    {seq?.value === 0 && (
                      <div style={{ display: "flex" }}>
                        <div>
                          <Switch defaultChecked />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <Typography variant="body2">
                            {seq?.templateName}
                          </Typography>
                          <Typography variant="body2">
                            {renderHTML(seq?.templateDesc)}
                          </Typography>
                        </div>
                      </div>
                    )}
                    {seq?.value === 1 && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <Typography variant="body2">
                            Instuction: {seq?.instruction}
                          </Typography>
                        </div>
                        <div style={{ marginLeft: "30px" }}>
                          <Typography variant="body2">
                            Priority: {seq?.priority}
                          </Typography>
                        </div>
                      </div>
                    )}
                    {seq?.value > 1 && seq?.value < 4 && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <Typography variant="body2">
                            Notes: {seq?.notes}
                          </Typography>
                        </div>
                        <div style={{ marginLeft: "30px" }}>
                          <Typography variant="body2">
                            Priority: {seq?.priority}
                          </Typography>
                        </div>
                      </div>
                    )}
                    {seq?.value === 4 && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2">
                          Message: {seq?.message}
                        </Typography>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </Paper>
          </TabPanelNew>
          <TabPanelNew valueTab={valueTab} index={1}>
            <SequencesProspects
              sequence={sequence?.steps}
              sequenceId={sequenceId}
            />
          </TabPanelNew>
          <TabPanelNew valueTab={valueTab} index={2}>
            <SequencesEmail />
          </TabPanelNew>
          <TabPanelNew valueTab={valueTab} index={3}>
            <SequencesCall />
          </TabPanelNew>
        </Box>
      )}
    </>
  );
}
