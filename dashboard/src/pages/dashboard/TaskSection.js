import React, { useState } from "react";

import { TaskTable } from "../../components/_dashboard/general-app";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
const TaskSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <TaskTable />
      </Grid>
    </Grid>
  );
};

export default TaskSection;
