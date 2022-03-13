import React from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
const GreyText = styled(Typography)`
  color: #777777;
`;
export default function Redirection() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4">
          Registration &gt; Convention 2022 &gt; Ticket
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={6}>
        <Grid item xs={12}>
          <GreyText variant="h6">
            Thanks You for the confirmation. Your details have been saved and
            ticket is generated. Please click on below link to view your event
            ticket.
          </GreyText>
        </Grid>
        <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary">
            View Event Ticket
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
