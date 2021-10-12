import React, { useState } from "react";
import renderHTML from "react-render-html";

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
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import LockIcon from "@material-ui/icons/Lock";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import { Editor } from "@tinymce/tinymce-react";
import InputBase from "@material-ui/core/InputBase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { API_SERVICE } from "../../config";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

let allfiltertags = [];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SnippetPersonal({
  allSnippets,
  type,
  getSnippets,
  showArchive,
  archivestatus,
  handleClickOpenPrev,
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
    const [openFilter, setOpenFilter] = useState(false);

    const handleClickOpenFilter = () => {
      allfiltertags = [];
      setSnippets(allSnippets);
      setOpenFilter(true);
    };
    const handleCloseFilter = () => {
      setOpenFilter(false);
    };

    const [searchQuery, setSearchQuery] = useState("");

    const search = () => {
      setSearchQuery("");
      if (searchQuery !== "") {
        allfiltertags.push(searchQuery);
        axios
          .post(`${API_SERVICE}/searchsnippet`, {
            searchQuery,
            type,
          })
          .then((res) => {
            setSnippets(res.data);
          })
          .catch((err) => console.log(err));
      } else setSnippets(allSnippets);
    };
    const deleteRow = () => {
      axios
        .post(`${API_SERVICE}/deletesnippet`, selected)
        .then((res) => {
          getSnippets();
        })
        .catch((err) => console.log(err));
    };

    const archiveRow = () => {
      axios
        .post(`${API_SERVICE}/archivesnippet`, selected)
        .then((res) => {
          getSnippets();
        })
        .catch((err) => console.log(err));
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
        .get(`${API_SERVICE}/searchonesnippet/${selected[0]}`)
        .then((res) => {
          const allTags = res.data[0].tag.join();
          setFormData(res.data[0]);
          setFormData({ ...res.data[0], tag: allTags });
        })
        .catch((err) => console.log(err));
    };
    const saveEdit = async () => {
      await axios
        .patch(`${API_SERVICE}/editsnippet`, formData)
        .then((res) => {
          handleCloseEdit();
          getSnippets();
        })
        .catch((err) => console.log(err));
    };

    const [filterQuery, setfilterQuery] = useState({
      name: "",
      desc: "",
      tag: "",
    });

    const filterSnippet = async () => {
      // allfiltertags = [];
      if (filterQuery.name !== "") {
        allfiltertags.push(filterQuery.name);
      }
      if (filterQuery.desc !== "") {
        allfiltertags.push(filterQuery.desc);
      }
      if (filterQuery.tag !== "") {
        allfiltertags.push(filterQuery.tag);
      }
      await axios
        .post(`${API_SERVICE}/filtersnippet`, {
          name: filterQuery.name || "none",
          desc: filterQuery.desc || "none",
          tag: filterQuery.tag || "none",
          type,
        })
        .then((res) => {
          console.log(res);
          setSnippets(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleDelete = () => {
      console.info("You clicked the delete icon.");
    };

    const [alltags, setalltags] = useState([]);

    React.useEffect(() => {
      getallTags();
    }, []);

    const getallTags = () => {
      axios
        .get(`${API_SERVICE}/getalltags`)
        .then((res) => {
          setalltags(res.data);
        })
        .catch((err) => console.log(err));
    };

    const removeFilterTag = (tag) => {
      setSnippets(allSnippets);
      let index = allfiltertags.indexOf(tag);
      allfiltertags.splice(index, 1);
    };

    const [openS, setOpenS] = React.useState(false);

    const handleClickS = () => {
      setOpenS(true);
    };

    const handleCloseS = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenS(false);
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
          const index = allSnippets.find((temp, index) => {
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
          .patch(`${API_SERVICE}/addtagtosnippet`, { tag, selected, type })
          .then((res) => {
            getSnippets();
            setOpen(false);
            handleClose();
            setTag("");
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .patch(`${API_SERVICE}/removetagfromsnippet`, {
            tag,
            selected,
            type,
          })
          .then((res) => {
            getSnippets();
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
          message="Snippet Added to Archive"
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
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseFilter} color="primary">
                Cancel
              </Button>
              <Button
                onClick={filterSnippet}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </DialogActions>
          </Dialog>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography className={classes.title} variant="h6" id="tableTitle">
              All Snippets
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
                          const data = allSnippets.filter(
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

                {/* TAGS */}

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

                {/* TAGS */}

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
                            height: "400px",
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton sx={{ p: 1 }} onClick={search}>
                  <SearchIcon />
                </IconButton>
                {allSnippets.length !== snippets.length && (
                  <Button
                    onClick={() => {
                      setSnippets(allSnippets);
                      allfiltertags = [];
                    }}
                  >
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
        {archivestatus ? (
          <Button onClick={getSnippets} style={{ margin: "10px" }}>
            Show Snippets
          </Button>
        ) : (
          <Button onClick={showArchive} style={{ margin: "10px" }}>
            Show Archive Snippets
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
  const [snippets, setSnippets] = useState(allSnippets);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = snippets.map((n) => n._id);
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
    rowsPerPage - Math.min(rowsPerPage, snippets.length - page * rowsPerPage);

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
              rowCount={snippets.length}
            />
            <TableBody>
              {stableSort(snippets, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {renderHTML(row.description.slice(0, 20))}
                          {row.description.slice(20).length > 0 && "..."}
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
                        </div>
                      </TableCell>
                      <TableCell style={tableCellStyle} align="center">
                        Aug 22
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={snippets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
