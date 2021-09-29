import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { API_SERVICE } from "../../config";
import axios from "axios";
import {
  Grid,
  Avatar,
  Typography,
  Container,
  AppBar,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";

const ViewContact = ({ id }) => {
  // const { id } = useParams();
  const [contact, setContact] = useState({});
  useEffect(async () => {
    await axios
      .get(`${API_SERVICE}/getcontact/${id}`)
      .then((res) => {
        setContact(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

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
        {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
      </div>
    );
  }
  return (
    <Grid>
      <Grid
        item
        md={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar>{contact?.fName?.slice(0, 2)}</Avatar>
          <Typography variant="h5" style={{ marginLeft: "10px" }}>
            {contact?.fName} {contact?.lName}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" style={{ marginLeft: "10px" }}>
            Company Name: {contact?.company}
          </Typography>
          <Typography variant="body1" style={{ marginLeft: "10px" }}>
            Email: {contact?.email}
          </Typography>
          <Typography variant="body1" style={{ marginLeft: "10px" }}>
            Phone: {contact?.phone}
          </Typography>
        </div>
      </Grid>
      <Grid item md={12} style={{ marginTop: "20px" }}>
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
                label="Activity"
                {...a11yProps(0)}
                style={{
                  marginLeft: "40px",
                  "& .MuiTab-wrapper": {
                    display: "flex",
                  },
                }}
              />
              <Tab
                label="Notes"
                {...a11yProps(1)}
                style={{ marginRight: "40px" }}
              />
              <Tab
                label="Emails"
                {...a11yProps(2)}
                style={{ marginRight: "40px" }}
              />
              <Tab
                label="Sequences"
                {...a11yProps(3)}
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
              <></>
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
              style={{ padding: 0 }}
            >
              <></>
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              dir={theme.direction}
              style={{ padding: 0 }}
            >
              <></>
            </TabPanel>
            <TabPanel
              value={value}
              index={3}
              dir={theme.direction}
              style={{ padding: 0 }}
            >
              <></>
            </TabPanel>
          </SwipeableViews>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ViewContact;
