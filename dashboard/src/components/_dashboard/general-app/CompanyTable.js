import React, { useState } from "react";

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
  CardHeader,
  Typography,
  TableContainer,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import Scrollbar from "../../Scrollbar";

import LockIcon from "@material-ui/icons/Lock";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
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

export default function CompanyTable({ handleClickOpen }) {
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
        <Typography variant="h6">All Companies</Typography>
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
                <TableCell>Company</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Sizes</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Technologies</TableCell>
                <TableCell>Intel</TableCell>
                <TableCell>Lists</TableCell>
                <TableCell>Save</TableCell>
                <TableCell>Find Contacts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <p style={{ fontWeight: "bold" }}>{row.name}</p>
                    <p style={{ color: "grey" }}> {row.keyword}</p>
                  </TableCell>
                  <TableCell>Accounting</TableCell>
                  <TableCell>1000-1500 employees</TableCell>
                  <TableCell>New York, US</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">
                    <LockIcon />
                  </TableCell>
                  <TableCell align="center">
                    <LockIcon />
                  </TableCell>
                  <TableCell align="center">
                    <Button color="primary" startIcon={<AddIcon />}>
                      Save
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<SearchIcon />}
                    >
                      Find
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
