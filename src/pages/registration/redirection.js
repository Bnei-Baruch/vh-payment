import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getEventsProductBySlug } from "../../services/productservice";
import { useTranslation } from "react-i18next";
const GreyText = styled(Typography)`
  color: #777777;
`;
export default function Redirection() {
  const { t } = useTranslation();
  const { event_slug } = useParams();
  const goToProfileArea = () => {
    const eventData = getEventsProductBySlug(event_slug);
    window.location.href = `${window.location.origin}/dash/events/tickets/${eventData.event.id}`;
  }
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
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
