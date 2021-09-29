import React, { useState, useEffect, useReducer } from "react";
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
  Paper,
  InputBase,
  Chip,
  TablePagination,
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
import RefreshIcon from "@material-ui/icons/Refresh";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@material-ui/lab/Alert";
import { API_SERVICE } from "../../config";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Navigate, useNavigate } from "react-router";
// import TabView from "./TabView";
import Tab from "@material-ui/core/Tab";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Cancel from "@material-ui/icons/Cancel";
import ViewContact from "./ViewContact";
import { Link } from "react-scroll";
let allfiltertags = [];

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

  const [isEdit, setIsEdit] = useState("");

  const openEdit = (row) => {
    setIsEdit(row._id);
    setFormData(row);
    handleClickOpenDialog();
  };

  const editContact = async (_id) => {
    await axios
      .patch(`${API_SERVICE}/editcontact`, formData)
      .then((res) => {
        console.log(res);
        handleCloseDialog();
        getContacts();
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpen = () => {
    allfiltertags = [];
    getContacts();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
    if (formData.fName === "") {
      setmessage("First Name should be filled");
    } else if (formData.lName === "") {
      setmessage("Last Name should be filled");
    } else if (formData.phone === "") {
      setmessage("Phone Number should be filled");
    } else if (formData.company === "") {
      setmessage("Company Name should be filled");
    } else if (formData.email === "") {
      setmessage("Email should be filled");
    } else {
      await axios
        .post(`${API_SERVICE}/addcontact`, formData)
        .then((res) => {
          setmessage("Contact Added");
          handleClickS();
          handleCloseDialog();
          getContacts();
          setFormData(initialState);
        })
        .catch((err) => console.log(err));
    }
  };

  const GridContact = ({ label, name, value }) => {
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
          value={value}
        />
      </Grid>
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  const search = () => {
    if (searchQuery !== "") {
      axios
        .post(`${API_SERVICE}/searchcontact`, {
          searchQuery,
        })
        .then((res) => {
          setAllContacts(res.data);
        })
        .catch((err) => console.log(err));
    } else getContacts();
  };

  const initialFilter = { contact: "", company: "", location: "" };
  const [filterQuery, setFilterQuery] = useState(initialFilter);

  const removeFilterTag = (tag) => {
    getContacts();
    let index = allfiltertags.indexOf(tag);
    allfiltertags.splice(index, 1);
  };

  const filter = () => {
    if (filterQuery.contact !== "") {
      allfiltertags.push(filterQuery.contact);
      // setAllfiltertags((prev) => [...prev, filterQuery.name]);
    }
    if (filterQuery.company !== "") {
      allfiltertags.push(filterQuery.company);
      // setAllfiltertags((prev) => [...prev, filterQuery.desc]);
    }
    if (filterQuery.location !== "") {
      allfiltertags.push(filterQuery.location);
      // setAllfiltertags((prev) => [...prev, filterQuery.tag]);
    }
    axios
      .post(`${API_SERVICE}/filtercontact`, {
        filterQuery,
      })
      .then((res) => {
        setAllContacts(res.data);
        handleClose();
        setFilterQuery(initialFilter);
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  const deleteRow = (row) => {
    axios
      .delete(`${API_SERVICE}/deletecontact/${row._id}`)
      .then((res) => {
        console.log(res.data);
        getContacts();
      })
      .catch((err) => console.log(err));
  };

  function tabManagement(tabs, action) {
    switch (action.type) {
      case ACTIONS.NEW_TAB:
        const addNote = {
          id: tabs.length + 1,
          valueTab: valueTab + 1,
          details: {
            title: action.payload.name,
            content: action.payload.id,
          },
        };
        return [...tabs, addNote];
      case ACTIONS.CLOSE_TAB:
        return tabs.filter((tab) => tab.id != action.payload.id);
      case ACTIONS.SET_ACTIVE_TAB:
        return setValueTab(action.payload.newValue);
      default:
        return tabs;
    }
  }

  const ACTIONS = {
    NEW_TAB: "newTab",
    CLOSE_TAB: "closeTab",
    SET_ACTIVE_TAB: "setActiveTab",
  };

  const [valueTab, setValueTab] = useState(1);
  let initialTabs = [];
  const [tabs, dispatch] = useReducer(tabManagement, initialTabs);
  useEffect(() => {
    tabs.length > 0 ? setValueTab(tabs[tabs.length - 1].id) : setValueTab(0);
  }, [tabs]);
  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        <div sx={{ height: "100%" }}>
          <Dialog
            fullScreen
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
          >
            <DialogTitle id="form-dialog-title">
              <Container maxWidth="md">
                {isEdit !== "" ? "Edit" : "Add"} Contact
              </Container>
            </DialogTitle>
            <DialogContent>
              <br />
              <Container maxWidth="md">
                {message.includes("should be filled") ? (
                  <Alert severity="error">{message}</Alert>
                ) : null}

                <Grid container spacing={2}>
                  {GridContact({
                    label: "First Name",
                    name: "fName",
                    value: formData.fName,
                  })}
                  {GridContact({
                    label: "Last Name",
                    name: "lName",
                    value: formData.lName,
                  })}
                  {GridContact({
                    label: "Company",
                    name: "company",
                    value: formData.company,
                  })}
                  {GridContact({
                    label: "Email",
                    name: "email",
                    value: formData.email,
                  })}
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
                  {GridContact({
                    label: "Title",
                    name: "title",
                    value: formData.title,
                  })}
                  {GridContact({
                    label: "Phone",
                    name: "phone",
                    value: formData.phone,
                  })}
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
                  {GridContact({
                    label: "Extn",
                    name: "extn",
                    value: formData.extn,
                  })}
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
                  {GridContact({
                    label: "Street Address",
                    name: "street",
                    value: formData.street,
                  })}
                  {GridContact({
                    label: "City",
                    name: "city",
                    value: formData.city,
                  })}
                  {GridContact({
                    label: "State/Region",
                    name: "state",
                    value: formData.state,
                  })}
                  {GridContact({
                    label: "Country",
                    name: "country",
                    value: formData.country,
                  })}
                  {GridContact({
                    label: "Postal Code",
                    name: "code",
                    value: formData.code,
                  })}
                  {GridContact({
                    label: "Linkedin",
                    name: "linkedin",
                    value: formData.linkedin,
                  })}
                  {GridContact({
                    label: "Facebook",
                    name: "facebook",
                    value: formData.facebook,
                  })}
                  {GridContact({
                    label: "Contact Owner (Users from the System)",
                    name: "owner",
                    value: formData.owner,
                  })}
                  {GridContact({
                    label: "Tags",
                    name: "tags",
                    value: formData.tags,
                  })}
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={isEdit !== "" ? editContact : addContact}
                color="primary"
                variant="contained"
              >
                {isEdit !== "" ? "Edit" : "Add"}
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
                padding: "13px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">All Contacts</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  getContacts();
                  setSearchQuery("");
                  setFilterQuery(initialFilter);
                }}
                startIcon={<RefreshIcon />}
                style={{ marginLeft: "15px" }}
              >
                Refresh
              </Button>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<FilterListIcon />}
                style={{ marginLeft: "15px" }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: "15px" }}
                onClick={() => {
                  handleClickOpenDialog();
                  setIsEdit("");
                }}
              >
                Add Contact
              </Button>
            </div>

            <div
              style={{
                background: "#F4F6F8",
                marginLeft: "18px",
                paddingLeft: "5px",
                boxShadow: "none",
              }}
            >
              <InputBase
                placeholder="Search Contacts"
                style={{ width: "250px" }}
                value={searchQuery}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    search();
                  }
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <IconButton sx={{ p: 1 }} onClick={search}>
                <SearchIcon />
              </IconButton>
              <IconButton
                sx={{ p: 1 }}
                onClick={() => {
                  getContacts();
                  setSearchQuery("");
                }}
              >
                <RefreshIcon />
              </IconButton>
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
          <Scrollbar>
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
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allContacts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
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
                            <EditIcon
                              onClick={() => openEdit(row)}
                              fontSize="small"
                            />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon
                              onClick={() => deleteRow(row)}
                              fontSize="small"
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell style={tableCellStyle} align="center">
                          <Link
                            to="test1"
                            spy={true}
                            smooth={true}
                            offset={50}
                            duration={500}
                          >
                            <Button
                              variant="contained"
                              onClick={() =>
                                dispatch({
                                  type: ACTIONS.NEW_TAB,
                                  payload: {
                                    id: row._id,
                                    name: `${row.fName} ${row.lName}`,
                                  },
                                })
                              }
                            >
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            style={{ boxShadow: "none" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allContacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>

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
              {/* <Typography variant="subtitle2">Contact</Typography> */}
              <TextField
                style={{ marginTop: "5px" }}
                label="Contact"
                variant="filled"
                size="small"
                fullWidth
                value={filterQuery.contact}
                onChange={(e) =>
                  setFilterQuery({ ...filterQuery, contact: e.target.value })
                }
              />
            </Box>
            <Box style={{ margin: "10px 0" }}>
              {/* <Typography variant="subtitle2">Company</Typography> */}
              <TextField
                style={{ marginTop: "5px" }}
                label="Company"
                variant="filled"
                size="small"
                fullWidth
                value={filterQuery.company}
                onChange={(e) =>
                  setFilterQuery({ ...filterQuery, company: e.target.value })
                }
              />
            </Box>
            <Box style={{ margin: "10px 0" }}>
              {/* <Typography variant="subtitle2">Location</Typography> */}
              <TextField
                style={{ marginTop: "5px" }}
                label="Location"
                variant="filled"
                size="small"
                fullWidth
                value={filterQuery.location}
                onChange={(e) =>
                  setFilterQuery({ ...filterQuery, location: e.target.value })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={filter} color="primary" variant="contained">
              Search
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ marginTop: "20px" }} name="test1" className="element">
        <TabContext value={valueTab}>
          <div style={{ boxShadow: "none" }}>
            <TabList
              onChange={handleChangeTab}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {tabs.map((tab) => (
                <Tab
                  component="div"
                  key={tab.id}
                  label={
                    <span>
                      {tab.details.title}
                      <IconButton
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.CLOSE_TAB,
                            payload: { id: tab.id },
                          })
                        }
                      >
                        <Cancel />
                      </IconButton>
                    </span>
                  }
                  value={tab.id}
                />
              ))}
            </TabList>
          </div>
          ​
          {tabs.length > 0 && (
            <TabPanel value={valueTab}>
              <ViewContact
                id={
                  tabs.filter((t) => t.valueTab === valueTab)[0]?.details
                    ?.content
                }
              />
            </TabPanel>
          )}
        </TabContext>
      </div>
    </>
  );
};

export default ContactSection;
