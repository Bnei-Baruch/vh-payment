import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
const GreyText = styled(Typography)`
  color: #777777;
`;
const goToProfileArea = () => {
  window.location.href = window.location.origin + "/dash/events";
}
export default function Redirection() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4">
          {t('common.successHeader')}
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={6}>
        <Grid item xs={12}>
          <GreyText variant="h6">
          {t('common.successDescription')}
          </GreyText>
        </Grid>
        <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={goToProfileArea}>
          {t('common.viewTicket')}
            View Event Ticket
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
