import React, { useState } from "react";
import Page from "../../components/Page";
import { Container, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
// ----------------------------------------------------------------------
import SequencesTable from "./SequencesTable";
import SequencesProspects from "./SequencesProspects";
import SequencesEmail from "./SequencesEmail";
import SequencesCall from "./SequencesCall";

export default function Sequences() {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Sequences | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        {/* <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Steps" {...a11yProps(0)} />
              <Tab label="Prospects" {...a11yProps(1)} />
              <Tab label="Emails" {...a11yProps(2)} />
              <Tab label="Calls" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SequencesProspects />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SequencesEmail />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <SequencesCall />
          </TabPanel>
        </Box> */}
        <SequencesTable />
      </Container>
    </Page>
  );
}
