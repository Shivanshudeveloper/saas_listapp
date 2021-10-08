import React, { useState } from "react";
import Page from "../../components/Page";
import { Container, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
// ----------------------------------------------------------------------
import SequencesTable from "./SequencesTable";

export default function Sequences() {
  return (
    <Page title="Sequences | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <SequencesTable />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
