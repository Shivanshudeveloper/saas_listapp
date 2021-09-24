import React, { useState, useEffect } from "react";

import faker from "faker";
import { useTheme } from "@material-ui/core/styles";
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  TextField,
  Typography,
  TableContainer,
  Grid,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dropzone from "react-dropzone";
import { firestore, storage } from "../../../Firebase/index";
import Scrollbar from "../../Scrollbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v4 as uuid4 } from "uuid";
import EditIcon from "@material-ui/icons/Edit";

// ----------------------------------------------------------------------

import { API_SERVICE } from "../../../config";
import axios from "axios";

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

// ----------------------------------------------------------------------

export default function CompanyTable({ handleClickOpen }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState([]);
  const [filePath, setFilePath] = useState("");
  const [message, setMessage] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const handleClose = () => {
    setAnchorEl(null);
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

  const GridCompany = ({ label, name }) => {
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
  const [open, setOpen] = useState(false);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
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
  };

  const editContact = (contact) => {
    setFormData(contact);
  };

  return (
    <Card>
      <Dialog fullScreen open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle id="form-dialog-title">
          <Container maxWidth="md">Add Company</Container>
        </DialogTitle>
        <DialogContent>
          <br />
          <Container maxWidth="md">
            <Snackbar
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
            />
            <Grid container spacing={2}>
              {GridCompany({ label: "Website", name: "website" })}
              {GridCompany({ label: "Name", name: "fullName" })}
              {GridCompany({ label: "Facebook", name: "facebook" })}
              {GridCompany({ label: "Twitter", name: "twitter" })}
              {GridCompany({ label: "Phone", name: "phone" })}
              {GridCompany({ label: "Industry", name: "industry" })}
              {GridCompany({ label: "About", name: "about" })}
              {GridCompany({ label: "Street Address", name: "address" })}
              {GridCompany({ label: "City", name: "city" })}
              {GridCompany({ label: "State", name: "state" })}
              {GridCompany({ label: "Country", name: "country" })}
              {GridCompany({ label: "Code", name: "code" })}
              {GridCompany({ label: "Linkedin", name: "linkedin" })}
              {GridCompany({ label: "Number of Employees", name: "numOfEmps" })}
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
          <Button onClick={addCompany} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          padding: "13px",
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
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
            onClick={handleClickOpen}
            startIcon={<FilterListIcon />}
            style={{ marginLeft: "20px" }}
          >
            Filter
          </Button>
        </div>
        <Button variant="contained" onClick={handleClickOpenDialog}>
          Add Company
        </Button>
      </div>

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
              {allCompanies.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={tableCellStyle}>
                    <p style={{ fontWeight: "bold" }}>{row.fullName}</p>
                  </TableCell>
                  <TableCell style={tableCellStyle}>{row.industry}</TableCell>
                  <TableCell style={tableCellStyle}>{row.numOfEmps}</TableCell>
                  <TableCell style={tableCellStyle}>
                    {row.city} {row.country}
                  </TableCell>
                  <TableCell style={tableCellStyle}>{row.about}</TableCell>
                  <TableCell align="center" style={tableCellStyle}>
                    <IconButton>
                      <EditIcon
                        onClick={() => editContact(row)}
                        fontSize="small"
                      />
                    </IconButton>
                    <Button variant="contained" style={{ marginRight: "10px" }}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
