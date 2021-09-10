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
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Scrollbar from "../../Scrollbar";
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
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Editor } from "@tinymce/tinymce-react";

import { API_SERVICE } from "../../../config";
import axios from "axios";

export default function TaskTable() {
  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };
  const [openTask, setOpenTask] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: faker.datatype.uuid(),
      name: "ToDo is Due for John Doe",
      company: "This is a simple task!",
    },
  ]);

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
    contact0: "",
    notes0: "",
    contact1: "",
    call1: "",
    notes1: "",
    contact2: "",
    date2: "",
    desc2: "",
    contact3: "",
    date3: "",
    action3: "",
    desc3: "",
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
        getTasks();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    await axios
      .get(`${API_SERVICE}/getalltasks`)
      .then((res) => {
        setAllTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteRow = async (id) => {
    await axios
      .delete(`${API_SERVICE}/deletetask/${id}`)
      .then(() => {
        getTasks();
      })
      .catch((err) => console.log(err));
  };

  const completeTask = async (id) => {
    await axios
      .patch(`${API_SERVICE}/completetask/${id}`)
      .then((res) => {
        console.log(res.data);
        getTasks();
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
        ? "Note"
        : value === 1
        ? "Call Log"
        : value === 2
        ? "Email"
        : "LinkedIn";
    await axios
      .patch(`${API_SERVICE}/edittask`, {
        formData,
        option,
        value,
      })
      .then((res) => {
        handleCloseAdd();
        getTasks();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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
            <Typography variant="subtitle2">Contact</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="John Due"
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
            <Typography variant="subtitle2">Type</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="LinkedIn"
              variant="filled"
              size="small"
              fullWidth
              name="type"
              value={searchQuery.type}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, type: e.target.value })
              }
            />
          </Box>
          <Box style={{ margin: "10px 0" }}>
            <Typography variant="subtitle2">Status</Typography>
            <TextField
              style={{ marginTop: "5px" }}
              label="Completed"
              variant="filled"
              size="small"
              fullWidth
              name="status"
              value={searchQuery.status}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, status: e.target.value })
              }
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
              <Tab icon={<FormatListNumberedIcon />} />
              <Tab icon={<CallIcon />} />
              <Tab icon={<EmailIcon />} />
              <Tab icon={<LinkedInIcon />} />
            </Tabs>
          </div>
          {value > -1 && value < 2 && (
            <>
              <DialogTitle>Add New {value === 0 ? "Note" : "Call"}</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={
                        value === 0 ? formData.contact0 : formData.contact1
                      }
                      onInputChange={(event, newValue) => {
                        {
                          value === 0
                            ? setFormData({ ...formData, contact0: newValue })
                            : setFormData({ ...formData, contact1: newValue });
                        }
                      }}
                      options={allContacts}
                      getOptionLabel={(option) =>
                        `${option.fName} ${option.lName}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Contacts"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  {value === 1 && (
                    <Grid item xs={12}>
                      <Autocomplete
                        inputValue={formData.call1}
                        onInputChange={(event, newValue) => {
                          setFormData({ ...formData, call1: newValue });
                        }}
                        options={[
                          { name: "No Answer" },
                          { name: "Busy" },
                          { name: "Wrong Number" },
                          { name: "Connected" },
                          { name: "Voicemail" },
                          { name: "Gatekeeper" },
                        ]}
                        getOptionLabel={(option) => `${option.name}`}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Call Result"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      label="Notes"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={value === 0 ? formData.notes0 : formData.notes1}
                      onChange={(e) => {
                        {
                          value === 0
                            ? setFormData({
                                ...formData,
                                notes0: e.target.value,
                              })
                            : setFormData({
                                ...formData,
                                notes1: e.target.value,
                              });
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
          {value === 3 && (
            <>
              <DialogTitle>Add New LinkedIn</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.contact3}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, contact3: newValue });
                      }}
                      options={allContacts}
                      getOptionLabel={(option) =>
                        `${option.fName} ${option.lName}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Contacts"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Due Date and Time"
                      type="datetime-local"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.date3}
                      onChange={(e) =>
                        setFormData({ ...formData, date3: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.action3}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, action3: newValue });
                      }}
                      options={[
                        { name: "Message" },
                        { name: "Connection Request Sent" },
                        { name: "Connection Request Accepted" },
                      ]}
                      getOptionLabel={(option) => `${option.name}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Action"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.desc3}
                      onChange={(e) =>
                        setFormData({ ...formData, desc3: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
          {value === 2 && (
            <>
              <DialogTitle>Add New Email Log</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      inputValue={formData.contact2}
                      onInputChange={(event, newValue) => {
                        setFormData({ ...formData, contact2: newValue });
                      }}
                      options={allContacts}
                      getOptionLabel={(option) =>
                        `${option.fName} ${option.lName}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Contacts"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.date2}
                      onChange={(e) =>
                        setFormData({ ...formData, date2: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Editor
                      apiKey="azhogyuiz16q8om0wns0u816tu8k6517f6oqgs5mfl36hptu"
                      plugins="wordcount"
                      value={formData.description}
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
                      onEditorChange={handleChangeEditor}
                      value={formData.desc2}
                    />
                  </Grid>
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
          <Typography variant="h6">All Tasks</Typography>
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
            onClick={() => getTasks()}
            style={{ marginLeft: "20px" }}
          >
            Refresh
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            style={{ marginLeft: "20px" }}
            onClick={handleClickAdd}
          >
            Add
          </Button>
        </div>
      </div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell /> */}
                <TableCell>Contact</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTasks.map((row) => (
                <TableRow key={row.id}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell> */}
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
                  <TableCell style={tableCellStyle} align="center">
                    <IconButton onClick={() => startEdit(row)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => completeTask(row._id)}>
                      <CheckIcon fontSize="small" />
                    </IconButton>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </>
  );
}
