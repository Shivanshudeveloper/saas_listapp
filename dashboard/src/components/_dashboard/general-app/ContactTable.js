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
  CardHeader,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
} from "@material-ui/core";
import Scrollbar from "../../Scrollbar";

import LockIcon from "@material-ui/icons/Lock";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FilterListIcon from "@material-ui/icons/FilterList";
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

  return (
    <Card>
      <div
        style={{
          padding: "13px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">All Contacts</Typography>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          startIcon={<FilterListIcon />}
        >
          Filter
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
                      padding: "10px",
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
                      <p style={{ color: "grey" }}> {row.keyword}</p>
                    </div>
                  </TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell align="center">
                    <LockIcon />
                  </TableCell>
                  <TableCell align="center">
                    <LockIcon />
                  </TableCell>
                  <TableCell align="center">
                    {/* <LockIcon /> */}
                    Location
                  </TableCell>
                  <TableCell>
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
