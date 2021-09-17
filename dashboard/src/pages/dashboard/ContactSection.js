import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Container,
} from "@material-ui/core";
import faker from "faker";
import LockIcon from "@material-ui/icons/Lock";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FilterListIcon from "@material-ui/icons/FilterList";
import Scrollbar from "../../components/Scrollbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Alert from '@material-ui/lab/Alert'
import { API_SERVICE } from "../../config";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";

const INVOICES = [
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: "Microsoft",
    keyword: "Marketing",
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: "Google",
    keyword: "Marketing",
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: "Microsoft",
    keyword: "Marketing",
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: "Microsoft",
    keyword: "Marketing",
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: "Microsoft",
    keyword: "Marketing",
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: "Microsoft",
    keyword: "Marketing",
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: "Microsoft",
    keyword: "Marketing",
  },
];

const ContactSection = () => {
  const [open, setOpen] = useState(false);
  const [allContacts, setAllContacts] = useState([]);

  const [openS, setOpenS] = React.useState(false);
  const [message, setmessage] = React.useState("");

  const handleClickS = () => {
    setOpenS(true);
  };

  const handleCloseS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenS(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    await axios
      .get(`${API_SERVICE}/getallcontact`)
      .then((res) => {
        setAllContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //
  //
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickA = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseA = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };

  const initialState = {
    fName: "",
    lName: "",
    company: "",
    email: "",
    emailType: "",
    title: "",
    phone: "",
    extn: "",
    phoneType: "",
    stage: "",
    street: "",
    city: "",
    state: "",
    country: "",
    code: "",
    linkedin: "",
    facebook: "",
    owner: "",
    tags: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addContact = async () => {
    setmessage("");
    if (formData.fName === "" || formData.lName === ""|| formData.phone === "" || formData.company === "" || formData.email === "") {
      setmessage("Empty Fields Found");
    } else {
      await axios
      .post(`${API_SERVICE}/addcontact`, formData)
        .then((res) => {
          setmessage("Contact Added");
          handleClickS();
          handleCloseDialog();
          getContacts();
        })
        .catch((err) => console.log(err));
    }
  };

  const GridContact = ({ label, name }) => {
    return (
      <Grid item md={6}>
        <TextField
          style={{ marginTop: "5px" }}
          label={label}
          variant="filled"
          size="small"
          fullWidth
          name={name}
          onChange={handleChange}
          value={formData.name}
        />
      </Grid>
    );
  };

  const editContact = (contact) => {
    setFormData(contact);
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openS}
        autoHideDuration={6000}
        onClose={handleCloseS}
        message={message}
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
      <div style={{ height: "100%" }}>
        <Card sx={{ height: "100%" }}>
          <Dialog
            fullScreen
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
          >
            <DialogTitle id="form-dialog-title">
              <Container maxWidth="md">Add Contact</Container>
            </DialogTitle>
            <DialogContent>
              <br />
              <Container maxWidth="md">
                {
                  message === "Empty Fields Found" ? (
                    <Alert severity="error">Empty Fields Found</Alert>
                  ) : null
                }


                <Grid container spacing={2}>
                  {/* <GridContact label="First Name" name="fName" /> */}
                  {GridContact({ label: "First Name", name: "fName" })}
                  {GridContact({ label: "Last Name", name: "lName" })}
                  {GridContact({ label: "Company", name: "company" })}
                  {GridContact({ label: "Email", name: "email" })}
                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      variant="filled"
                      style={{ marginTop: "5px" }}
                    >
                      <InputLabel>Email Type</InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        name="emailType"
                        value={formData.emailType}
                      >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {GridContact({ label: "Title", name: "title" })}
                  {GridContact({ label: "Phone", name: "phone" })}
                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      variant="filled"
                      style={{ marginTop: "5px" }}
                    >
                      <InputLabel>Phone Type</InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        name="phoneType"
                        value={formData.phoneType}
                      >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Home">Home</MenuItem>
                        <MenuItem value="Mobile">Mobile</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {GridContact({ label: "Extn", name: "extn" })}
                  <Grid item md={6}>
                    <FormControl
                      fullWidth
                      variant="filled"
                      style={{ marginTop: "5px" }}
                    >
                      <InputLabel>Stage</InputLabel>
                      <Select
                        fullWidth
                        size="small"
                        onChange={handleChange}
                        name="stage"
                        value={formData.stage}
                      >
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Cold">Cold</MenuItem>
                        <MenuItem value="Bad Contact Info">
                          Bad Contact Info
                        </MenuItem>
                        <MenuItem value="Replied">Replied</MenuItem>
                        <MenuItem value="Unresponsive">Unresponsive</MenuItem>
                        <MenuItem value="Interested">Interested</MenuItem>
                        <MenuItem value="Not Interested">
                          Not Interested
                        </MenuItem>
                        <MenuItem value="Do Not Contact">
                          Do Not Contact
                        </MenuItem>
                        <MenuItem value="Opt-Out">Opt-Out</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {GridContact({ label: "Street Address", name: "street" })}
                  {GridContact({ label: "City", name: "city" })}
                  {GridContact({ label: "State/Region", name: "state" })}
                  {GridContact({ label: "Country", name: "country" })}
                  {GridContact({ label: "Postal Code", name: "code" })}
                  {GridContact({ label: "Linkedin", name: "linkedin" })}
                  {GridContact({ label: "Facebook", name: "facebook" })}
                  {GridContact({
                    label: "Contact Owner (Users from the System)",
                    name: "owner",
                  })}
                  {GridContact({ label: "Tags", name: "tags" })}
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={addContact} color="primary" variant="contained">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <div
            style={{
              padding: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                padding: "13px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">All Contacts</Typography>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<FilterListIcon />}
                style={{ marginLeft: "20px" }}
              >
                Filter
              </Button>
            </div>
            <Button variant="contained" onClick={handleClickOpenDialog}>
              Add Contact
            </Button>
          </div>
          <Scrollbar sx={{ minHeight: "55vh" }}>
            <TableContainer sx={{ minWidth: 720 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Contact</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allContacts.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "5px",
                          paddingLeft: "20px",
                        }}
                      >
                        <Avatar
                          style={{
                            width: "42px",
                            height: "42px",
                            marginRight: "10px",
                            textTransform: "uppercase",
                          }}
                        >
                          {row.fName.slice(0, 1)}
                          {row.lName.slice(0, 1)}
                        </Avatar>
                        <div>
                          <p style={{ fontWeight: "bold" }}>
                            {row.fName} {row.lName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell style={tableCellStyle}>
                        {row.company}
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        {row.email}
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        {row.phone}
                      </TableCell>
                      <TableCell align="center" style={tableCellStyle}>
                        {/* <LockIcon /> */}
                        {row.state}
                      </TableCell>
                      <TableCell style={tableCellStyle} align="center">
                        <IconButton>
                          <EditIcon onClick={() => editContact(row)} fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

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
              <Typography variant="subtitle2">Titles</Typography>
              <TextField
                style={{ marginTop: "5px" }}
                label="Marketing Manager"
                variant="filled"
                size="small"
                fullWidth
              />
            </Box>
            <Box style={{ margin: "10px 0" }}>
              <Typography variant="subtitle2">Companies or Website</Typography>
              <TextField
                style={{ marginTop: "5px" }}
                label="Nike or nike.com"
                variant="filled"
                size="small"
                fullWidth
              />
            </Box>
            <Box style={{ margin: "10px 0" }}>
              <Typography variant="subtitle2">Keywords</Typography>
              <TextField
                style={{ marginTop: "5px" }}
                label="Healthcare"
                variant="filled"
                size="small"
                fullWidth
              />
            </Box>
            <Box style={{ margin: "10px 0" }}>
              <Typography variant="subtitle2">Names</Typography>
              <TextField
                style={{ marginTop: "5px" }}
                label="John Wick"
                variant="filled"
                size="small"
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Search
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ContactSection;
