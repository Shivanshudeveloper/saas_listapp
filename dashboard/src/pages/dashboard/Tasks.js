import React, { useState } from "react";
import Page from "../../components/Page";
import { Container, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
// ----------------------------------------------------------------------
import { TaskTable } from "../../components/_dashboard/general-app";

export default function Tasks() {
  return (
    <Page title="Search | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <TaskTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
