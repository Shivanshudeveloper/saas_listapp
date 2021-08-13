import React, { useState } from "react";

// material
// hooks
import useAuth from "../../hooks/useAuth";
// components
import Page from "../../components/Page";

import { Box, Typography, Button, Divider, Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContactSection from "./ContactSection";
import CompanySection from "./CompanySection";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" flexDirection="column">
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}% to goal (0/100)`}</Typography>
        </Box>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
      </Box>
    );
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Page title="Search | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
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
          <Typography variant="h4">Search</Typography>

          <div style={{ display: "flex" }}>
            <LinearProgressWithLabel
              value="0"
              style={{ marginRight: "10px", width: "150px" }}
            />
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

        {/*  */}

        <AppBar
          position="static"
          color="default"
          style={{ marginBottom: "20px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Contacts" {...a11yProps(0)} />
            <Tab label="Company" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ContactSection />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CompanySection />
          </TabPanel>
        </SwipeableViews>
      </Container>
    </Page>
  );
}
