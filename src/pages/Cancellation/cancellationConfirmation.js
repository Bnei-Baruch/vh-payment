import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import ContentLayout from "../../layouts/ContentLayout";
import WarningIcon from "@material-ui/icons/Warning";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { cancelMembership } from "../../services/userservice";
import { useSelector } from "react-redux";

const BoxContainer = styled(Box)`
  padding: 40px 20px;
  justify-content: center;
  text-align: center;
`;
export default function CancelConfirmation(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const moveToMembership = () => {
    window.location.href = `${window.location.origin}/dash/membership`;
  };
  const confirmCancellation = () => {
    cancelMembership({
      keycloak_id :user.keycloak.subject,
      cancellation_reason: props.location.state.state.reason,
      cancellation_description: props.location.state.state.additionalSuggestion,
    })
      .then(() => {
        history.push("/pay/membership/cancellation/success");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <BoxContainer component="header">
            <WarningIcon
              style={{ color: "red", height: "45px", width: "45px" }}
            />
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}
            >
              {t("cancellation.membership_cancellation")}
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              {t("cancellation.membership_cancellation_text")}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={moveToMembership}
            >
              {t("common.cancel")}
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
              onClick={confirmCancellation}
            >
              {t("cancellation.continue_cancellation")}
            </Button>
          </BoxContainer>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
}
