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
  ButtonGroup,
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

export default function TaskTable({ handleClickOpen }) {
  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };
  const [tasks, setTasks] = useState([
    {
      id: faker.datatype.uuid(),
      name: "ToDo is Due for John Doe",
      company: "This is a simple task!",
    },
  ]);
  const [open, setOpen] = React.useState(false);

  const handleClickAdd = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => {
    setOpen(false);
  };
  console.log(new Date());

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add New Task"}</DialogTitle>
        <DialogContent style={{ minWidth: "500px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <ButtonGroup color="primary">
                <Button>
                  <FormatListNumberedIcon />
                </Button>
                <Button>
                  <CallIcon />
                </Button>
                <Button>
                  <EmailIcon />
                </Button>
                <Button>
                  <SmsIcon />
                </Button>
                <Button>
                  <LinkedInIcon />
                </Button>
              </ButtonGroup>
            </Grid>
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
              <TextField label="Notes" variant="outlined" fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
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
            Add
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
            Add Task
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
