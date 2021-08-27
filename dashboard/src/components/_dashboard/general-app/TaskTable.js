import React, { useState } from "react";
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
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Scrollbar from "../../Scrollbar";

import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import FilterListIcon from "@material-ui/icons/FilterList";
import CallIcon from "@material-ui/icons/Call";

import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import SmsIcon from "@material-ui/icons/Sms";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function TaskTable({ handleClickOpen }) {
  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };
  const [openTask, setOpenTask] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: faker.datatype.uuid(),
      name: "ToDo is Due for John Doe",
      company: "This is a simple task!",
    },
  ]);

  const handleClickAdd = () => {
    setOpenTask(true);
  };
  const handleClickCall = () => {
    setOpenCall(true);
  };

  const handleCloseAdd = () => {
    setOpenTask(false);
    setOpenCall(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog fullScreen open={openTask} onClose={handleCloseAdd}>
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
              <Tab icon={<SmsIcon />} />
              <Tab icon={<LinkedInIcon />} />
            </Tabs>
          </div>
          {value === 0 && (
            <>
              <DialogTitle>{"Add New Task"}</DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField label="Contacts" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Title" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Due Date and Time"
                      type="datetime-local"
                      defaultValue="2021-08-24T10:30"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Type" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Assign To" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Notes"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
            </>
          )}
          {value > 0 && value < 3 && (
            <>
              <DialogTitle>
                Add New {value === 2 ? "Email" : "Call"} Log
              </DialogTitle>
              <DialogContent style={{ minWidth: "500px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="Contact" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    {value === 2 && (
                      <TextField
                        label="Date"
                        type="date"
                        defaultValue="2021-08-28"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                    {value === 1 && (
                      <TextField
                        defaultValue=""
                        label="Template"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
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
            onClick={handleCloseAdd}
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
                <TableCell />
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                  <TableCell style={tableCellStyle}>{row.name}</TableCell>
                  <TableCell style={tableCellStyle}>{row.company}</TableCell>
                  <TableCell style={tableCellStyle}>To-Do Task</TableCell>
                  <TableCell style={tableCellStyle}>Date</TableCell>
                  <TableCell style={tableCellStyle} align="center">
                    <IconButton>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <EmailIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <MessageIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <CallIcon fontSize="small" />
                    </IconButton>
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
