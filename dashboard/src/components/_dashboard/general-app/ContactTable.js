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
import Scrollbar from "../../Scrollbar";

import LockIcon from "@material-ui/icons/Lock";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FilterListIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// ----------------------------------------------------------------------

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

export default function ContactTable({ handleClickOpen }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };

  const GridContact = ({ label }) => {
    return (
      <Grid item md={6}>
        <TextField
          style={{ marginTop: "5px" }}
          label={label}
          variant="filled"
          size="small"
          fullWidth
        />
      </Grid>
    );
  };

  return (
    <Card>
      <Dialog fullScreen open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle id="form-dialog-title">
          <Container maxWidth="md">Add Contact</Container>
        </DialogTitle>
        <DialogContent>
          <br />
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <GridContact label="First Name" />
              <GridContact label="Last Name" />
              <GridContact label="Company" />
              <GridContact label="Email" />
              <Grid item md={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  style={{ marginTop: "5px" }}
                >
                  <InputLabel>Email Type</InputLabel>
                  <Select fullWidth size="small">
                    <MenuItem value={1}>Work</MenuItem>
                    <MenuItem value={2}>Personal</MenuItem>
                    <MenuItem value={3}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <GridContact label="Title" />
              <GridContact label="Phone" />
              <Grid item md={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  style={{ marginTop: "5px" }}
                >
                  <InputLabel>Phone Type</InputLabel>
                  <Select fullWidth size="small">
                    <MenuItem value={1}>Work</MenuItem>
                    <MenuItem value={2}>Home</MenuItem>
                    <MenuItem value={3}>Mobile</MenuItem>
                    <MenuItem value={4}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <GridContact label="Extn" />
              <Grid item md={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  style={{ marginTop: "5px" }}
                >
                  <InputLabel>Stage</InputLabel>
                  <Select fullWidth size="small">
                    <MenuItem value={1}>New</MenuItem>
                    <MenuItem value={2}>Cold</MenuItem>
                    <MenuItem value={3}>Bad Contact Info</MenuItem>
                    <MenuItem value={4}>Replied</MenuItem>
                    <MenuItem value={5}>Unresponsive</MenuItem>
                    <MenuItem value={6}>Interested</MenuItem>
                    <MenuItem value={7}>Not Interested</MenuItem>
                    <MenuItem value={8}>Do Not Contact</MenuItem>
                    <MenuItem value={9}>Opt-Out</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <GridContact label="Street Address" />
              <GridContact label="City" />
              <GridContact label="State/Region" />
              <GridContact label="Country" />
              <GridContact label="Postal Code" />
              <GridContact label="Linkedin" />
              <GridContact label="Facebook" />
              <GridContact label="Contact Owner (Users from the System)" />
              <GridContact label="Tags" />
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            Add
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
              </TableRow>
            </TableHead>
            <TableBody>
              {INVOICES.map((row) => (
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
                      {row.name.slice(0, 2)}
                    </Avatar>
                    <div>
                      <p style={{ fontWeight: "bold" }}>{row.name}</p>
                    </div>
                  </TableCell>
                  <TableCell style={tableCellStyle}>{row.company}</TableCell>
                  <TableCell align="center" style={tableCellStyle}>
                    <LockIcon />
                  </TableCell>
                  <TableCell align="center" style={tableCellStyle}>
                    <LockIcon />
                  </TableCell>
                  <TableCell align="center" style={tableCellStyle}>
                    {/* <LockIcon /> */}
                    Location
                  </TableCell>
                  <TableCell style={tableCellStyle} align="center">
                    <IconButton>
                      <MoreHorizIcon onClick={handleClick} />
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>
                          Not Interested
                        </MenuItem>
                      </Menu>
                    </IconButton>
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
