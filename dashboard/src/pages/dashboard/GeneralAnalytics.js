import React, { useState } from "react";

import {
  Box,
  Button,
  Divider,
  Container,
  Typography,
  TextField,
  IconButton,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from "@material-ui/core";
// components
import Page from "../../components/Page";
import LinearProgress from "@material-ui/core/LinearProgress";
import FilterListIcon from "@material-ui/icons/FilterList";
import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from "@material-ui/icons/GetApp";
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
import faker from "faker";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" flexDirection="column">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }

  const INVOICES = [
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      company: "Microsoft",
      website: "www.sample.com",
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      keyword: "Marketing",
      date: faker.date.recent(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      company: "Google",
      website: "www.sample.com",
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      keyword: "Marketing",
      date: faker.date.recent(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      company: "Microsoft",
      website: "www.sample.com",
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      keyword: "Marketing",
      date: faker.date.recent(),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = [
    { title: 1 },
    { title: 2 },
    { title: 3 },
    { title: 4 },
    { title: 5 },
  ];

  return (
    <Page title="General: Analytics | List App">
      <Container maxWidth="xl">
        <Box
          style={{
            margin: "30px auto",
            marginTop: "0px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Typography variant="h4">My Contacts</Typography>

          <div style={{ display: "flex" }}>
            {/* <LinearProgressWithLabel
              value="0"
              style={{ marginRight: "10px", width: "150px" }}
            /> */}
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Get Free Credits
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Upgrade to Unlimited
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Book a Demo
            </Button>
          </div>
        </Box>
        <Divider />
        <Box
          style={{
            margin: "30px auto",
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Box display="flex" alignItems="center">
            <TextField
              label="Search My Contacts"
              variant="filled"
              size="small"
            />
            <FilterListIcon
              onClick={handleClickOpen}
              style={{
                marginLeft: "10px",
                background: "rgba(145, 158, 171, 0.12)",
                padding: "11px",
                height: "100%",
                width: "48px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle id="form-dialog-title">Filter</DialogTitle>
              <DialogContent>
                <DialogContentText>Contact Name</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Contact Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <DialogContentText>Contact Title</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Contact Title"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <DialogContentText>Company Name</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Company Name"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <DialogContentText>Email</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <DialogContentText>Phone</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Phone"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <DialogContentText>Contact Location</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Contact Location"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <DialogContentText>Import Status</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Import Status"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <DialogContentText>Lists</DialogContentText>
                <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Lists"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                  Search
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box
            style={{
              background: "rgba(145, 158, 171, 0.12)",
              height: "100%",
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              padding: "1px",
            }}
          >
            <IconButton>
              <PublishIcon style={{ marginLeft: "5px" }} />
            </IconButton>
            <IconButton>
              <GetAppIcon style={{ marginLeft: "5px" }} />
            </IconButton>
            <IconButton>
              <ListIcon style={{ marginLeft: "5px" }} />
            </IconButton>
            <IconButton>
              <DeleteIcon style={{ marginLeft: "5px" }} />
            </IconButton>
          </Box>
        </Box>
        {/*  */}
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contact</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Intel</TableCell>
                <TableCell>Lists</TableCell>
                <TableCell>Research</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <p style={{ fontWeight: "bold" }}>{row.name}</p>
                    <p style={{ color: "grey" }}> {row.keyword}</p>
                  </TableCell>

                  <TableCell>
                    <p style={{ fontWeight: "bold" }}>{row.company}</p>
                    <p style={{ color: "grey" }}> {row.website}</p>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>New York, USA</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Set Lists</TableCell>
                  <TableCell>12/07/2021</TableCell>
                  <TableCell>
                    <MoreHorizIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
