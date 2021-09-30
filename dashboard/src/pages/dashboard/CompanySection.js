import React, { useState, useEffect, useReducer } from "react";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  Container,
  Snackbar,
  Paper,
  InputBase,
  Alert,
  Chip,
  TablePagination,
} from "@material-ui/core";
import { firestore, storage } from "../../Firebase/index";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import Dropzone from "react-dropzone";
import { v4 as uuid4 } from "uuid";
import Dialog from "@material-ui/core/Dialog";
import Scrollbar from "../../components/Scrollbar";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { API_SERVICE } from "../../config";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router";
import DeleteIcon from "@material-ui/icons/Delete";
import Tab from "@material-ui/core/Tab";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Cancel from "@material-ui/icons/Cancel";
import { Link } from "react-scroll";
import ViewCompany from "./ViewCompany";
let allfiltertags = [];
const CompanySection = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    allfiltertags = [];
    getCompanies();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [file, setFile] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [message, setMessage] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    if (file.length > 0) {
      onSubmit();
    }
  }, [file]);

  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map((file) => file));
  };

  const onSubmit = () => {
    if (file.length > 0) {
      file.forEach((file) => {
        const timeStamp = Date.now();
        var uniquetwoKey = uuid4();
        uniquetwoKey = uniquetwoKey + timeStamp;
        const uploadTask = storage
          .ref(`pictures/products/${uniquetwoKey}/${file.name}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            handleClickSnack();
            setMessage(`Uploading ${progress} %`);
          },
          (error) => {
            setMessage(error);
            handleClickSnack();
          },
          async () => {
            // When the Storage gets Completed
            const fp = await uploadTask.snapshot.ref.getDownloadURL();
            setFilePath(fp);
            setFormData({ ...formData, filePath: fp });
            handleClickSnack();
            setMessage("File Uploaded");
          }
        );
      });
    } else {
      setMessage("No File Selected Yet");
    }
  };

  const handleClickSnack = () => {
    setOpenSnack(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const initialState = {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
    code: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    website: "",
    industry: "",
    about: "",
    numOfEmps: "",
    filePath: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GridCompany = ({ label, name, value }) => {
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
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    await axios
      .get(`${API_SERVICE}/getallcompanies`)
      .then((res) => {
        setAllCompanies(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addCompany = async () => {
    if (formData.fullName === "") {
      setMessage("Company Name should be filled");
    } else if (formData.website === "") {
      setMessage("Website Name should be filled");
    } else if (formData.numOfEmps === "") {
      setMessage("Number of employees should be filled");
    } else {
      await axios
        .post(`${API_SERVICE}/addcompany`, formData)
        .then((res) => {
          handleClickSnack();
          setMessage("Company Added");
          handleCloseDialog();
          getCompanies();
          setFile([]);
          setFilePath("");
          setFormData(initialState);
        })
        .catch((err) => console.log(err));
    }
  };

  const [isEdit, setIsEdit] = useState("");

  const openEdit = (row) => {
    setIsEdit(row._id);
    setFormData(row);
    handleClickOpenDialog();
  };

  const editCompany = async (_id) => {
    await axios
      .patch(`${API_SERVICE}/editcompany`, formData)
      .then((res) => {
        console.log(res);
        handleCloseDialog();
        getCompanies();
      })
      .catch((err) => console.log(err));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const search = () => {
    setSearchQuery("");
    if (searchQuery !== "") {
      allfiltertags.push(searchQuery);
      axios
        .post(`${API_SERVICE}/searchcompany`, {
          searchQuery,
        })
        .then((res) => {
          setAllCompanies(res.data);
        })
        .catch((err) => console.log(err));
    } else getCompanies();
  };

  const initialFilter = {
    company: "",
    industry: "",
    location: "",
    technologies: "",
  };
  const [filterQuery, setFilterQuery] = useState(initialFilter);

  const removeFilterTag = (tag) => {
    getCompanies();
    let index = allfiltertags.indexOf(tag);
    allfiltertags.splice(index, 1);
  };

  const filter = () => {
    if (filterQuery.company !== "") {
      allfiltertags.push(filterQuery.company);
      // setAllfiltertags((prev) => [...prev, filterQuery.name]);
    }
    if (filterQuery.industry !== "") {
      allfiltertags.push(filterQuery.industry);
      // setAllfiltertags((prev) => [...prev, filterQuery.desc]);
    }
    if (filterQuery.location !== "") {
      allfiltertags.push(filterQuery.location);
      // setAllfiltertags((prev) => [...prev, filterQuery.tag]);
    }
    if (filterQuery.technologies !== "") {
      allfiltertags.push(filterQuery.technologies);
      // setAllfiltertags((prev) => [...prev, filterQuery.tag]);
    }
    axios
      .post(`${API_SERVICE}/filtercompany`, {
        filterQuery,
      })
      .then((res) => {
        setAllCompanies(res.data);
        handleClose();
        setFilterQuery(initialFilter);
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  const deleteRow = (row) => {
    axios
      .delete(`${API_SERVICE}/deletecompany/${row._id}`)
      .then((res) => {
        getCompanies();
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
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <div>
            <Dialog
              fullScreen
              open={openDialog}
              onClose={handleCloseDialog}
              fullWidth
            >
              <DialogTitle id="form-dialog-title">
                <Container maxWidth="md">Add Company</Container>
              </DialogTitle>
              <DialogContent>
                <br />
                <Container maxWidth="md">
                  {message.includes("should be filled") ? (
                    <Alert severity="error">{message}</Alert>
                  ) : null}
                  {/* <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  open={openSnack}
                  autoHideDuration={2000}
                  onClose={handleCloseSnack}
                  message={message}
                  action={
                    <React.Fragment>
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseSnack}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                /> */}
                  <Grid container spacing={2}>
                    {GridCompany({
                      label: "Website",
                      name: "website",
                      value: formData.website,
                    })}
                    {GridCompany({
                      label: "Name",
                      name: "fullName",
                      value: formData.fullName,
                    })}
                    {GridCompany({
                      label: "Facebook",
                      name: "facebook",
                      value: formData.facebook,
                    })}
                    {GridCompany({
                      label: "Twitter",
                      name: "twitter",
                      value: formData.twitter,
                    })}
                    {GridCompany({
                      label: "Phone",
                      name: "phone",
                      value: formData.phone,
                    })}
                    {GridCompany({
                      label: "Industry",
                      name: "industry",
                      value: formData.industry,
                    })}
                    {GridCompany({
                      label: "About",
                      name: "about",
                      value: formData.about,
                    })}
                    {GridCompany({
                      label: "Street Address",
                      name: "address",
                      value: formData.address,
                    })}
                    {GridCompany({
                      label: "City",
                      name: "city",
                      value: formData.city,
                    })}
                    {GridCompany({
                      label: "State",
                      name: "state",
                      value: formData.state,
                    })}
                    {GridCompany({
                      label: "Country",
                      name: "country",
                      value: formData.country,
                    })}
                    {GridCompany({
                      label: "Code",
                      name: "code",
                      value: formData.code,
                    })}
                    {GridCompany({
                      label: "Linkedin",
                      name: "linkedin",
                      value: formData.linkedin,
                    })}
                    {GridCompany({
                      label: "Number of Employees",
                      name: "numOfEmps",
                      value: formData.numOfEmps,
                    })}
                    <Grid item md={12}>
                      <center>
                        {file.length === 0 ? (
                          <Dropzone onDrop={handleDrop}>
                            {({ getRootProps, getInputProps }) => (
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <Button
                                  style={{ marginTop: "10px" }}
                                  size="large"
                                  color="primary"
                                  variant="contained"
                                  fullWidth
                                >
                                  Upload Profile Photo
                                </Button>
                              </div>
                            )}
                          </Dropzone>
                        ) : (
                          <Button
                            style={{ marginTop: "10px" }}
                            size="large"
                            color="primary"
                            variant="outlined"
                            fullWidth
                            onClick={() => {
                              setFile([]);
                              setFilePath("");
                            }}
                          >
                            Remove Photo
                          </Button>
                        )}
                      </center>
                    </Grid>
                  </Grid>
                </Container>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>

                <Button
                  onClick={isEdit !== "" ? editCompany : addCompany}
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
                <Typography variant="h6">All Companies</Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    getCompanies();
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
                  onClick={handleClickOpenDialog}
                >
                  Add Company
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
                  placeholder="Search Companies"
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
                    getCompanies();
                    setSearchQuery("");
                    allfiltertags = [];
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
                      <TableCell>Company</TableCell>
                      <TableCell>Industry</TableCell>
                      <TableCell>Sizes</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Technologies</TableCell>
                      {/* <TableCell align="center">Intel</TableCell> */}
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCompanies
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell style={tableCellStyle}>
                            <p style={{ fontWeight: "bold" }}>{row.fullName}</p>
                          </TableCell>
                          <TableCell style={tableCellStyle}>
                            {row.industry}
                          </TableCell>
                          <TableCell style={tableCellStyle}>
                            {row.numOfEmps}
                          </TableCell>
                          <TableCell style={tableCellStyle}>
                            {row.city} {row.country}
                          </TableCell>
                          <TableCell style={tableCellStyle}>
                            {row.about}
                          </TableCell>
                          <TableCell align="center" style={tableCellStyle}>
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
                            <Link
                              to="test1"
                              spy={true}
                              smooth={true}
                              offset={50}
                              duration={500}
                            >
                              <Button
                                variant="contained"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  dispatch({
                                    type: ACTIONS.NEW_TAB,
                                    payload: {
                                      id: row._id,
                                      name: `${row.fullName}`,
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
              count={allCompanies.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Grid>

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
                label="Company Name"
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
              <TextField
                style={{ marginTop: "5px" }}
                label="Industry"
                variant="filled"
                size="small"
                fullWidth
                value={filterQuery.industry}
                onChange={(e) =>
                  setFilterQuery({ ...filterQuery, industry: e.target.value })
                }
              />
            </Box>
            <Box style={{ margin: "10px 0" }}>
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
            <Box style={{ margin: "10px 0" }}>
              <TextField
                style={{ marginTop: "5px" }}
                label="Technologies"
                variant="filled"
                size="small"
                fullWidth
                value={filterQuery.technologies}
                onChange={(e) =>
                  setFilterQuery({
                    ...filterQuery,
                    technologies: e.target.value,
                  })
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
      </Grid>
      <div
        style={{ marginTop: "20px", marginLeft: "10px" }}
        name="test1"
        className="element"
      >
        <TabContext value={valueTab}>
          <div style={{ boxShadow: "none !important" }}>
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
              <ViewCompany
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

export default CompanySection;
