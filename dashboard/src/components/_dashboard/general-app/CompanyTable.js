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

  const tableCellStyle = { paddingTop: "5px", paddingBottom: "5px" };

  return (
    <Card>
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
                <TableCell align="center">Lists</TableCell>
                <TableCell align="center">Save</TableCell>
                <TableCell align="center">Find Contacts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={tableCellStyle}>
                    <p style={{ fontWeight: "bold" }}>{row.name}</p>
                  </TableCell>
                  <TableCell style={tableCellStyle}>Accounting</TableCell>
                  <TableCell style={tableCellStyle}>1000-1500</TableCell>
                  <TableCell style={tableCellStyle}>New York, US</TableCell>
                  <TableCell style={tableCellStyle}>Technologies</TableCell>
                  {/* <TableCell align="center" style={tableCellStyle}>
                    <LockIcon />
                  </TableCell> */}
                  <TableCell align="center" style={tableCellStyle}>
                    <LockIcon />
                  </TableCell>
                  <TableCell align="center" style={tableCellStyle}>
                    <Button color="primary" startIcon={<AddIcon />}>
                      Save
                    </Button>
                  </TableCell>
                  <TableCell align="center" style={tableCellStyle}>
                    <Button color="primary" startIcon={<SearchIcon />}>
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
