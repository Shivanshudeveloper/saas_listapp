import React from "react";

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
  Avatar,
  Typography,
} from "@material-ui/core";
import Scrollbar from "../../Scrollbar";

import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import FilterListIcon from "@material-ui/icons/FilterList";
import CheckIcon from "@material-ui/icons/Check";
import CallIcon from "@material-ui/icons/Call";
// ----------------------------------------------------------------------

const INVOICES = [
  {
    id: faker.datatype.uuid(),
    name: "ToDo is Due for John Doe",
    company: "This is a simple task!",
  },
];

// ----------------------------------------------------------------------

export default function TaskTable({ handleClickOpen }) {
  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };

  return (
    <>
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
          <Button variant="contained" style={{ marginLeft: "20px" }}>
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
              {INVOICES.map((row) => (
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
