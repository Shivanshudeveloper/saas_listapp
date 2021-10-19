import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import { API_SERVICE } from "../../config";
import axios from "axios";

const SequencesProspects = ({ sequence, sequenceId }) => {
  const data = [
    { amount: 0, name: "Total" },
    { amount: 0, name: "Pending" },
    { amount: 0, name: "In Progress" },
    { amount: 0, name: "Paused" },
    { amount: 0, name: "Finished" },
    { amount: 0, name: "Opened" },
    { amount: 0, name: "Clicked" },
    { amount: 0, name: "Replied" },
    { amount: 0, name: "Bounced" },
    { amount: 0, name: "Failed" },
    { amount: 0, name: "Called" },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialState);
  };

  useEffect(() => {
    getContacts();
    getProspect();
  }, []);

  const [allContacts, setAllContacts] = useState([]);

  const getContacts = async () => {
    await axios
      .get(`${API_SERVICE}/getallcontact`)
      .then((res) => {
        setAllContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const initialState = { contact: "", type: "", email: "" };
  const [formData, setFormData] = useState(initialState);

  const [prospects, setProspects] = useState([]);

  const getProspect = async () => {
    await axios
      .get(`${API_SERVICE}/getprospect/${sequenceId}`)
      .then((res) => {
        setProspects(res.data?.prospects);
      })
      .catch((err) => console.log(err));
  };
  const addProspect = async () => {
    await axios
      .post(`${API_SERVICE}/addprospect/${sequenceId}`, formData)
      .then((res) => {
        getProspect();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const [user, setUser] = useState({});

  const userId = "123456";
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    await axios
      .get(`${API_SERVICE}/getdetails/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  console.log(user);

  return (
    <div>
      {/* <div style={{ border: "1px solid grey", display: "flex" }}>
        {data?.map((field) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 30px",
              alignItems: "center",
              borderLeft: "1px solid grey",
              cursor: "pointer",
            }}
          >
            <Typography>{field.amount}</Typography>
            <Typography>{field.name}</Typography>
          </div>
        ))}
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          Add prospect
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Add Prospect</DialogTitle>
          <DialogContent>
            <Autocomplete
              inputValue={formData?.contact?.fName}
              onChange={(event, newValue) => {
                setFormData({ ...formData, contact: newValue });
              }}
              getOptionLabel={(option) => `${option.fName} ${option.lName}`}
              id="controllable-states-demo"
              options={allContacts}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Prospect" />
              )}
              sx={{ mb: 3 }}
            />
            <Autocomplete
              inputValue={formData?.type?.option}
              onChange={(event, newValue) => {
                setFormData({ ...formData, type: newValue });
              }}
              getOptionLabel={(option) =>
                `Day ${option.run} - STEP#${option.stepNo} - ${option.option}`
              }
              id="controllable-states-demo"
              options={sequence}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Type" />}
              sx={{ mb: 3 }}
            />
            <Autocomplete
              inputValue={formData?.email}
              onChange={(event, newValue) => {
                setFormData({ ...formData, email: newValue?.email });
              }}
              getOptionLabel={(option) => option.email}
              id="controllable-states-demo"
              options={user}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Email" />}
              sx={{ mb: 3 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={addProspect} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <TableContainer sx={{ minWidth: 720, mt: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receiver Contact Name</TableCell>
              <TableCell>Step Name</TableCell>
              <TableCell>Step Day</TableCell>
              <TableCell>From</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prospects?.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  {row?.contact?.fName} {row?.contact?.lName}
                </TableCell>
                <TableCell>{row?.type?.option}</TableCell>
                <TableCell>{row?.type?.run}</TableCell>
                <TableCell>{row?.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SequencesProspects;
