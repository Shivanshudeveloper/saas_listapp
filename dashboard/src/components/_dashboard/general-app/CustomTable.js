import React, { useState, useEffect } from "react";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  IconButton,
  Chip,
} from "@material-ui/core";
import Scrollbar from "../../Scrollbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import ClearIcon from "@material-ui/icons/Clear";

const CustomTable = ({ startEdit, valueSwipe }) => {
  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };
  const [allTasks, setAllTasks] = useState([]);

  console.log(valueSwipe);
  useEffect(() => {
    if (valueSwipe === 0) getTasks();
    if (valueSwipe === 1) getcomingtasks();
    if (valueSwipe === 2) getcompletedtasks();
  }, [valueSwipe]);

  const getTasks = async () => {
    await axios
      .get(`${API_SERVICE}/getalltasks`)
      .then((res) => {
        setAllTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getcomingtasks = async () => {
    await axios
      .get(`${API_SERVICE}/getcomingtasks`)
      .then((res) => {
        setAllTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getcompletedtasks = async () => {
    await axios
      .get(`${API_SERVICE}/getcompletedtasks`)
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
        getTasks();
      })
      .catch((err) => console.log(err));
  };

  const notCompleteTask = async (id) => {
    await axios
      .patch(`${API_SERVICE}/notcompletetask/${id}`)
      .then((res) => {
        getTasks();
      })
      .catch((err) => console.log(err));
  };

  return (
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
            {allTasks?.map((row) => (
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
  );
};

export default CustomTable;
