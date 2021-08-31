import React, { useState } from "react";

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
  FormControlLabel,
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
import clsx from "clsx";

import LockIcon from "@material-ui/icons/Lock";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
// ----------------------------------------------------------------------

const DATA = [
  {
    id: faker.datatype.uuid(),
    name: "Sample Template",
    desc: "This is a samp...",
    company: "Microsoft",
    keyword: "Marketing",
  },
  {
    id: faker.datatype.uuid(),
    name: "Sample Template",
    desc: "This is a samp...",
    company: "Microsoft",
  },
  {
    id: faker.datatype.uuid(),
    name: "Sample Template",
    desc: "This is a samp...",
    company: "Microsoft",
    keyword: "Marketing",
  },
];

// ----------------------------------------------------------------------

export default function TemplatePersonal() {
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

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Dessert (100g serving)",
    },
    { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
    { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
    { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "Protein (g)",
    },
  ];

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
        <TableCell>Description</TableCell>
        <TableCell align="center">Tasks</TableCell>
        <TableCell align="center">Email</TableCell>
        <TableCell align="center">Customer</TableCell>
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

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleCloseDialog = () => {
      setOpen(false);
    };

    const [openFilter, setOpenFilter] = useState(false);

    const handleClickOpenFilter = () => {
      setOpen(true);
    };

    const handleCloseFilter = () => {
      setOpen(false);
    };
    return (
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography className={classes.title} variant="h6" id="tableTitle">
            All Templates
          </Typography>
          {numSelected > 0 ? (
            <div style={{ display: "flex", marginLeft: "20px" }}>
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
                    Add Tag
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Tag"
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
                <MenuItem onClick={handleClose}>Remove</MenuItem>
              </Menu>
              <Tooltip title="Archive">
                <IconButton>
                  <ArchiveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Clone">
                <IconButton>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
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
              />
              <IconButton sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = DATA.map((n) => n.id);
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
    rowsPerPage - Math.min(rowsPerPage, DATA.length - page * rowsPerPage);

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
              rowCount={DATA.length}
            />
            <TableBody>
              {stableSort(DATA, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
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
                        {row.desc}
                        {row?.keyword?.length > 0 && (
                          <Chip
                            label={row.keyword}
                            style={{
                              marginLeft: "10px",
                              background: "lightblue",
                            }}
                          />
                        )}
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
                      <TableCell align="center" style={tableCellStyle}>
                        <LockIcon />
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          paddingTop: "5px",
                          paddingBottom: "5px",
                        }}
                      >
                        <Avatar
                          style={{
                            width: "37px",
                            height: "37px",
                            margin: "0 auto",
                            textTransform: "uppercase",
                          }}
                        >
                          AB
                        </Avatar>
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
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
}
