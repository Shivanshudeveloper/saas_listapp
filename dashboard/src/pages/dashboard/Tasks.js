import React, { useState } from "react";
import Page from "../../components/Page";
import { Container } from "@material-ui/core";
import TaskSection from "./TaskSection";
import { useTheme } from "@material-ui/core/styles";
// ----------------------------------------------------------------------

export default function Tasks() {
  return (
    <Page title="Search | List App">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <TaskSection />
      </Container>
    </Page>
  );
}
