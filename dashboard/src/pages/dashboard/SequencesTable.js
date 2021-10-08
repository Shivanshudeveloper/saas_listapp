import React, { useState, useEffect } from "react";
import faker from "faker";
import renderHTML from "react-render-html";
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
  InputBase,
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
  const handleChangeEditor = (content, editor) => {
    setFormData({ ...formData, desc2: content });
  };

  const saveTask = async () => {
    const option =
      value === 0
        ? "Note"
        : value === 1
        ? "Call Log"
        : value === 2
        ? "Email"
        : "LinkedIn";
    await axios
      .post(`${API_SERVICE}/savetask`, {
        formData,
        option,
        value,
      })
      .then((res) => {
        console.log(res.data);
        handleCloseAdd();
        getcomingtasks();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    getcomingtasks();
  }, []);

  const getcompletedtasks = async () => {
    // await axios
    //   .get(`${API_SERVICE}/getcompletedtasks`)
    //   .then((res) => {
    //     setAllTasks(res.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const getcomingtasks = async () => {
    // await axios
    //   .get(`${API_SERVICE}/getcomingtasks`)
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

  const deleteRow = async (id) => {
    await axios
      .delete(`${API_SERVICE}/deletetask/${id}`)
      .then(() => {
        getcomingtasks();
      })
      .catch((err) => console.log(err));
  };

  const completeTask = async (id) => {
    await axios
      .patch(`${API_SERVICE}/completetask/${id}`)
      .then((res) => {
        console.log(res.data);
        getcomingtasks();
      })
      .catch((err) => console.log(err));
  };
  const notCompleteTask = async (id) => {
    await axios
      .patch(`${API_SERVICE}/notcompletetask/${id}`)
      .then((res) => {
        console.log(res.data);
        getcomingtasks();
      })
      .catch((err) => console.log(err));
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
        getcomingtasks();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setAllfiltertags([]);
    getcomingtasks();
    setOpen(true);
  };

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
    getcomingtasks();
    let index = allfiltertags.indexOf(tag);
    allfiltertags.splice(index, 1);
  };
  console.log(allfiltertags);

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
      <Dialog open={openTask} onClose={handleCloseAdd}>
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
                  {/* <Grid item xs={12}>
                    <TextField
                      label="Due Date and Time"
                      type="datetime-local"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={value === 0 ? formData.date0 : formData.date1}
                      onChange={(e) =>
                        value === 0
                          ? setFormData({ ...formData, date0: e.target.value })
                          : setFormData({ ...formData, date1: e.target.value })
                      }
                    />
                  </Grid> */}
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
                          step: 6000, // 5 min
                        }}
                        value={formData.time0}
                        onChange={(e) =>
                          setFormData({ ...formData, time0: e.target.value })
                        }
                      />
                    </Grid>
                  )}
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
            onClick={isEdit ? editTask : saveTask}
            color="primary"
            autoFocus
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            startIcon={<FilterListIcon />}
            style={{ marginLeft: "20px" }}
          >
            Filter
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              getcomingtasks();
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
            onClick={handleClickAdd}
          >
            Add
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
                getcomingtasks();
                setSearchField("");
                setAllfiltertags([]);
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
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

      <div style={{ marginBottom: "10px" }}>
        <Button onClick={() => getcomingtasks()} style={{ marginLeft: "20px" }}>
          Show Due
        </Button>
        <Button
          onClick={() => getcompletedtasks()}
          style={{ marginLeft: "20px" }}
        >
          Show Completed
        </Button>
      </div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell /> */}
                <TableCell>Action</TableCell>
                <TableCell>Contact Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTasks.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={tableCellStyle} align="left">
                    <IconButton onClick={() => startEdit(row)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    {row.completed === true ? (
                      <IconButton onClick={() => notCompleteTask(row._id)}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => completeTask(row._id)}>
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton onClick={() => deleteRow(row._id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    {/* <IconButton>
                      <EmailIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <MessageIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <CallIcon fontSize="small" />
                    </IconButton> */}
                  </TableCell>
                  <TableCell style={tableCellStyle}>{row.contact}</TableCell>
                  <TableCell style={tableCellStyle}>
                    {row.description != "" && row.description}
                    {row.notes != "" && row.notes}
                  </TableCell>
                  <TableCell style={tableCellStyle}>{row.type}</TableCell>
                  <TableCell style={tableCellStyle}>{row?.date}</TableCell>
                  <TableCell style={tableCellStyle} align="center">
                    {row.completed === true ? (
                      <Chip
                        label="Completed"
                        style={{
                          marginLeft: "10px",
                          background: "lightblue",
                        }}
                      />
                    ) : (
                      <Chip
                        label="Not Completed"
                        style={{
                          marginLeft: "10px",
                          background: "pink",
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  );
}
