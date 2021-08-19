import React, { useState } from "react";

// material
// hooks
import useAuth from "../../hooks/useAuth";
// components
import Page from "../../components/Page";

import { Box, Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import ContactSection from "./ContactSection";
import CompanySection from "./CompanySection";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import BusinessIcon from "@material-ui/icons/Business";
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
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  return (
    <Page title="Search | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <AppBar
          position="static"
          color="default"
          style={{
            marginBottom: "20px",
            width: "fit-content",
            boxShadow: "none",
            background: "transparent",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<BusinessIcon />}
              label="Contacts"
              {...a11yProps(0)}
              style={{
                marginLeft: "40px",
                "& .MuiTab-wrapper": {
                  display: "flex",
                },
              }}
            />
            <Tab
              icon={<PermContactCalendarIcon />}
              label="Company"
              {...a11yProps(1)}
              style={{ marginRight: "40px" }}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            style={{ padding: 0 }}
          >
            <ContactSection />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            style={{ padding: 0 }}
          >
            <CompanySection />
          </TabPanel>
        </SwipeableViews>
      </Container>
    </Page>
  );
}
