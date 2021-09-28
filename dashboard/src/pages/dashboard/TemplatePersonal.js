import React, { useState, useEffect } from "react";

import faker from "faker";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
// material
import { useTheme } from "@material-ui/core/styles";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  TableHead,
  CardHeader,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Toolbar,
  Paper,
  Chip,
  Tooltip,
  Grid,
  Switch,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Scrollbar from "../../components/Scrollbar";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ArchiveIcon from "@material-ui/icons/Archive";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import UploadFile from "@material-ui/icons/UploadFile";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import EditIcon from "@material-ui/icons/Edit";
import { Editor } from "@tinymce/tinymce-react";
import { API_SERVICE } from "../../config";
import axios from "axios";
import renderHTML from "react-render-html";
import Dropzone from "react-dropzone";
import { storage } from "../../Firebase/index";
import { v4 as uuid4 } from "uuid";
import CSVReader from "react-csv-reader";

// ----------------------------------------------------------------------
let allfiltertags = [];
// ----------------------------------------------------------------------

export default function TemplatePersonal({
  allTemplates,
  type,
  value,
  handleClickOpenPrev,
  setarchivestatus,
  showArchive,
  getMainTemp,
  archivestatus,
  setFormDataPrev,
}) {
  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        {/* <TableRow> */}
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Subject</TableCell>
        <TableCell align="center">Tasks</TableCell>
        <TableCell align="center">Date</TableCell>
        {/* </TableRow> */}
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.45),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: lighten(theme.palette.secondary.light, 0.45),
          },
  }));

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);
    const [tag, setTag] = React.useState("");
    const [tagDisplay, setTagDisplay] = React.useState([]);

    const handleClickOpen = (e) => {
      if (e.target.innerText === "Add") setIsAdd(true);
      if (e.target.innerText === "Remove") {
        setIsAdd(false);
        selected.map((each) => {
          const index = allTemplates.find((temp, index) => {
            if (temp._id == each) return true;
          });
          setTagDisplay(index.tag);
        });
      }
      setOpen(true);
    };

    const handleSubmitTag = () => {
      if (isAdd === true) {
        axios
          .patch(`${API_SERVICE}/addtagtotemplate`, { tag, selected, type })
          .then((res) => {
            getTemplates();
            setOpen(false);
            handleClose();
            setTag("");
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .patch(`${API_SERVICE}/removetagfromtemplate`, {
            tag,
            selected,
            type,
          })
          .then((res) => {
            getTemplates();
            setOpen(false);
            handleClose();
            setTag("");
          })
          .catch((err) => console.log(err));
      }
    };

    const handleCloseDialog = () => {
      setOpen(false);
    };
    // const [allfiltertags, setAllfiltertags] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    // const [hasDeleted, setHasDeleted] = useState(false);

    const search = () => {
      if (searchQuery !== "") {
        axios
          .post(`${API_SERVICE}/searchtemplate`, {
            searchQuery,
            type,
            archivestatus,
          })
          .then((res) => {
            setTemplates(res.data);
          })
          .catch((err) => console.log(err));
      } else setTemplates(allTemplates);
    };

    const deleteRow = () => {
      axios
        .post(`${API_SERVICE}/deletetemplate`, selected)
        .then((res) => {
          getTemplates();
          setUseFilter(false);
        })
        .catch((err) => console.log(err));
    };

    const getTemplates = async () => {
      setarchivestatus(false);
      var type = "personal";
      type = value === 0 ? "personal" : value === 1 ? "team" : "library";
      await axios
        .get(`${API_SERVICE}/getalltemplates/${type}`)
        .then((res) => {
          // console.log(res.data);
          // allTemplates = res.data;
          setTemplates(res.data);
        })
        .catch((err) => console.log(err));
    };
    const [useFilter, setUseFilter] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const handleClickOpenFilter = () => {
      allfiltertags = [];
      setTemplates(allTemplates);
      setOpenFilter(true);
    };
    const handleCloseFilter = () => {
      setOpenFilter(false);
    };

    const initialState = {
      name: "",
      subject: "",
      description: "",
      tag: "",
      type: type,
    };

    const [openEdit, setOpenEdit] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleChangeEditor = (content, editor) => {
      setFormData({ ...formData, description: content });
    };

    const handleClickOpenEdit = () => {
      setOpenEdit(true);
    };
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    const editTemplate = async () => {
      handleClickOpenEdit();
      await axios
        .get(`${API_SERVICE}/searchonetemplate/${selected[0]}`)
        .then((res) => {
          const allTags = res.data[0].tag.join();
          setFormData(res.data[0]);
          setFormData({ ...res.data[0], tag: allTags });
        })
        .catch((err) => console.log(err));
    };

    const saveEdit = async () => {
      await axios
        .patch(`${API_SERVICE}/edittemplate`, formData)
        .then((res) => {
          handleCloseEdit();
          getTemplates();
        })
        .catch((err) => console.log(err));
    };

    const [filterQuery, setfilterQuery] = useState({
      name: "",
      desc: "",
      tag: "",
    });

    const filterTemplate = async () => {
      setUseFilter(true);
      if (filterQuery.name !== "") {
        allfiltertags.push(filterQuery.name);
        // setAllfiltertags((prev) => [...prev, filterQuery.name]);
      }
      if (filterQuery.desc !== "") {
        allfiltertags.push(filterQuery.desc);
        // setAllfiltertags((prev) => [...prev, filterQuery.desc]);
      }
      if (filterQuery.tag !== "") {
        allfiltertags.push(filterQuery.tag);
        // setAllfiltertags((prev) => [...prev, filterQuery.tag]);
      }
      await axios
        .post(`${API_SERVICE}/filtertemplate`, {
          name: filterQuery.name || "none",
          desc: filterQuery.desc || "none",
          tag: filterQuery.tag || "none",
          type,
        })
        .then((res) => {
          console.log(res);
          setTemplates(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const [alltags, setalltags] = useState([]);

    React.useEffect(() => {
      getallTags();
    }, []);

    const getallTags = () => {
      axios
        .get(`${API_SERVICE}/getalltagstemplates`)
        .then((res) => {
          setalltags(res.data);
        })
        .catch((err) => console.log(err));
    };

    const removeFilterTag = (tag) => {
      setTemplates(allTemplates);
      let index = allfiltertags.indexOf(tag);
      allfiltertags.splice(index, 1);
    };

    const [openExport, setOpenExport] = React.useState(false);

    const handleClickOpenExport = () => {
      setOpenExport(true);
    };

    const handleCloseExport = () => {
      setOpenExport(false);
    };

    const [openImport, setOpenImport] = React.useState(false);

    const handleClickOpenImport = () => {
      setOpenImport(true);
    };

    const handleCloseImport = () => {
      setOpenImport(false);
    };

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleClickSnackbar = () => {
      setOpenSnackbar(true);
    };
    const handleCloseSnackbar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSnackbar(false);
    };

    const [file, setFile] = React.useState([]);
    const [downloadUrl, setDownloadUrl] = React.useState("");
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
      if (file.length > 0) {
        onSubmit();
      }
    }, [file]);

    const onSubmit = () => {
      if (file.length > 0) {
        file.forEach((file) => {
          const timeStamp = Date.now();
          var uniquetwoKey = uuid4();
          uniquetwoKey = uniquetwoKey + timeStamp;
          const uploadTask = storage
            .ref(`excel/${uniquetwoKey}/${file.name}`)
            .put(file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setMessage(`Uploading ${progress} %`);
            },
            (error) => {
              setMessage(error);
            },
            async () => {
              // When the Storage gets Completed
              const filePath = await uploadTask.snapshot.ref.getDownloadURL();
              setMessage("File Uploaded");
              setDownloadUrl(filePath);
            }
          );
        });
      } else {
        setMessage("No File Selected Yet");
      }
    };

    const handleDrop = async (acceptedFiles) => {
      setFile(acceptedFiles.map((file) => file));
    };

    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
    };

    const handleForce = async (data, fileInfo) => {
      setFile(data);
      setMessage("CSV Uploaded");
      var finalData = [];
      var type = "personal";
      type = value === 0 ? "personal" : value === 1 ? "team" : "library";
      data.map((d) => finalData.push({ ...d, tag: d?.tag?.split(","), type }));
      // setTemplates(finalData);

      await axios
        .post(`${API_SERVICE}/addtemplatefromexcel`, finalData)
        .then((res) => {
          setUseFilter(false);
          getTemplates();
        })
        .catch((err) => console.log(err));
    };

    const archiveRow = () => {
      axios
        .post(`${API_SERVICE}/archivetemplates`, selected)
        .then((res) => {
          getTemplates();
        })
        .catch((err) => console.log(err));
    };

    return (
      <>
        <Dialog
          open={openExport}
          onClose={handleCloseExport}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Export Data</DialogTitle>
          <DialogContent>
            <center style={{ marginBottom: "20px" }}>
              <img
                alt="Excel"
                src="https://img.icons8.com/color/68/000000/microsoft-excel-2019--v1.png"
              />
            </center>
            {templates && templates.length ? (
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="excelbutton"
                table="table-to-xls"
                filename="orders"
                sheet="orders"
                buttonText="Download as XLS"
              />
            ) : (
              <h5>No Data Found</h5>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseExport} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openImport}
          onClose={handleCloseImport}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Import Data</DialogTitle>
          <DialogContent>
            <center style={{ marginBottom: "20px" }}>
              {`${message}`}
              <a
                style={{ marginTop: "20px", marginBottom: "20px" }}
                className="excelbutton"
                href="https://res.cloudinary.com/dx9dnqzaj/raw/upload/v1632124257/saas_listapp/sample.csv"
                download
              >
                Download Sample CSV
              </a>
              <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
              {/* <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button
                      size="large"
                      startIcon={<UploadFile />}
                      color="primary"
                      variant="outlined"
                    >
                      Upload Excel
                    </Button>
                  </div>
                )}
              </Dropzone> */}

              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={handleForce}
                parserOptions={papaparseOptions}
              />
            </center>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImport} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Dialog
            open={openFilter}
            onClose={handleCloseFilter}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Filter</DialogTitle>
            <DialogContent>
              <br />
              <Box style={{ margin: "10px 0" }}>
                <Typography variant="subtitle2">Name</Typography>
                <TextField
                  style={{ marginTop: "5px" }}
                  label="Sample"
                  variant="filled"
                  size="small"
                  fullWidth
                  value={filterQuery.name}
                  onChange={(e) =>
                    setfilterQuery({ ...filterQuery, name: e.target.value })
                  }
                />
              </Box>
              <Box style={{ margin: "10px 0" }}>
                <Typography variant="subtitle2">Description</Typography>
                <TextField
                  style={{ marginTop: "5px" }}
                  label="Sample"
                  variant="filled"
                  size="small"
                  fullWidth
                  value={filterQuery.desc}
                  onChange={(e) =>
                    setfilterQuery({ ...filterQuery, desc: e.target.value })
                  }
                />
              </Box>
              <Box style={{ margin: "10px 0" }}>
                <Typography variant="subtitle2">Tags</Typography>
                <Autocomplete
                  style={{ marginTop: "5px" }}
                  id="combo-box-demo"
                  options={alltags}
                  onChange={(event, newValue) => {
                    setfilterQuery({ ...filterQuery, tag: newValue.t });
                  }}
                  getOptionLabel={(option) => option.t}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" variant="outlined" />
                  )}
                />
                {/* <TextField
                  style={{ marginTop: "5px" }}
                  label="Sample"
                  variant="filled"
                  size="small"
                  fullWidth
                  value={filterQuery.desc}
                  onChange={(e) =>
                    setfilterQuery({ ...filterQuery, desc: e.target.value })
                  }
                /> */}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseFilter} color="primary">
                Cancel
              </Button>
              <Button
                onClick={filterTemplate}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </DialogActions>
          </Dialog>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography className={classes.title} variant="h6" id="tableTitle">
              All Templates
            </Typography>
            {numSelected > 0 ? (
              <div style={{ display: "flex", marginLeft: "20px" }}>
                {numSelected < 2 && (
                  <>
                    <Tooltip title="Edit Template">
                      <IconButton>
                        <EditIcon onClick={editTemplate} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Clone">
                      <IconButton
                        onClick={() => {
                          const data = allTemplates.filter(
                            (temp) => temp._id === selected[0]
                          );
                          console.log({ ...data[0], tag: data[0].tag.join() });
                          setFormDataPrev({
                            name: data[0].name,
                            subject: data[0].subject,
                            description: data[0].description,
                            type: data[0].type,
                            tag: data[0].tag.join(),
                          });
                          handleClickOpenPrev();
                        }}
                      >
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                <Dialog
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby="form-dialog-title"
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle id="form-dialog-title">
                    Edit Template
                  </DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid md={12}>
                        <TextField
                          label="Name"
                          variant="outlined"
                          style={{ margin: "10px 0" }}
                          fullWidth
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <TextField
                          label="Subject"
                          variant="outlined"
                          style={{ margin: "10px 0" }}
                          fullWidth
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                        />

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
                        />
                        <div style={{ margin: "10px 0" }}>
                          <TextField
                            label="Add New Tag"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "10px 0" }}
                            value={formData.tag}
                            onChange={(e) =>
                              setFormData({ ...formData, tag: e.target.value })
                            }
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={saveEdit}
                      color="primary"
                      variant="contained"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                <Tooltip title="Add/Remove Tags">
                  <IconButton>
                    <LocalOfferIcon onClick={handleClick} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClickOpen}>Add</MenuItem>
                  <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle
                      id="form-dialog-title"
                      style={{ width: "500px" }}
                    >
                      {isAdd ? "Add Tag" : "Remove Tag"}
                    </DialogTitle>
                    <DialogContent>
                      {isAdd ? (
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Tag"
                          type="text"
                          fullWidth
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                        />
                      ) : (
                        <div>
                          {tagDisplay.map((tag) => (
                            <Chip
                              label={tag}
                              style={{
                                marginLeft: "10px",
                                background: "lightblue",
                              }}
                            />
                          ))}
                          <hr style={{ margin: "15px 0" }} />
                          <Typography
                            variant="body1"
                            style={{ margin: "10px 0" }}
                          >
                            Enter Tag Name
                          </Typography>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Tag"
                            type="text"
                            fullWidth
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                          />
                        </div>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitTag} color="primary">
                        {isAdd ? "Add" : "Remove "}
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <MenuItem onClick={handleClickOpen}>Remove</MenuItem>
                </Menu>
                <Tooltip title="Archive/Unarchive">
                  <IconButton onClick={archiveRow}>
                    <ArchiveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={deleteRow}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <Paper
                style={{
                  background: "#F4F6F8",
                  marginLeft: "18px",
                  paddingLeft: "5px",
                }}
              >
                <InputBase
                  placeholder="Search Templates"
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
                {allTemplates.length !== templates.length && useFilter && (
                  <Button onClick={() => setTemplates(allTemplates)}>
                    Reset
                  </Button>
                )}
              </Paper>
            )}
          </div>
          <Button
            variant="outlined"
            onClick={handleClickOpenFilter}
            startIcon={<FilterListIcon />}
            style={{ marginLeft: "20px" }}
          >
            Filter
          </Button>
        </Toolbar>
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
        <Button style={{ margin: "10px" }} onClick={handleClickOpenExport}>
          Export Data
        </Button>

        <Button style={{ margin: "10px" }} onClick={handleClickOpenImport}>
          Import Data
        </Button>

        {archivestatus ? (
          <Button onClick={getMainTemp} style={{ margin: "10px" }}>
            Show Templates
          </Button>
        ) : (
          <Button onClick={showArchive} style={{ margin: "10px" }}>
            Show Archive Templates
          </Button>
        )}
      </>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }));

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [templates, setTemplates] = useState(allTemplates);

  const List2 = ({ template }) => {
    return (
      <tr>
        <th>{template?.name}</th>
        <th>{template?.subject}</th>
        <th>{template?.description}</th>
        <th>{template?.date?.split("T")[0]}</th>
      </tr>
    );
  };

  const ShowList2 = () => {
    return templates.map((template) => {
      return <List2 template={template} key={template._id} />;
    });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = templates.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, templates.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              style={{ borderRadius: "0" }}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={templates.length}
            />
            <TableBody>
              {stableSort(templates, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell style={tableCellStyle}>{row.name}</TableCell>
                      <TableCell style={tableCellStyle}>
                        {row.subject}
                        {row?.tag.length > 0 &&
                          row?.tag.map((tag) => {
                            if (tag !== "")
                              return (
                                <Chip
                                  label={tag}
                                  style={{
                                    marginLeft: "10px",
                                    background: "lightblue",
                                  }}
                                />
                              );
                          })}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-end",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>0</div>
                          <div style={{ color: "grey" }}>Delivered</div>
                        </div>
                        &nbsp;/&nbsp;
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>0</div>
                          <div style={{ color: "grey" }}>Opens</div>
                        </div>
                        &nbsp;/&nbsp;
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>0</div>
                          <div style={{ color: "grey" }}>Clicks</div>
                        </div>
                        &nbsp;/&nbsp;
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>0</div>
                          <div style={{ color: "grey" }}>Replies</div>
                        </div>
                      </TableCell>
                      <TableCell style={tableCellStyle} align="center">
                        {row.date.split("T")[0]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <table hidden id="table-to-xls">
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
          <ShowList2 />
        </table>

        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={templates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
}
