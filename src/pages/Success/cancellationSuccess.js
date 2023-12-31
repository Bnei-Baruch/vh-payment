import React from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import ContentLayout from "../../layouts/ContentLayout";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  header: {
    marginBottom: 40,
    justifyContent: "center",
    textAlign: "center",
  },
  body: {
    marginTop: 40,
  },
  picker: {
    marginInlineEnd: 12,
    fontSize: 48,
  },
  actions: {
    justifyContent: "center",
  },
  secondaryFont: {
    fontFamily: "Abel",
  },
  agree: {
    fontFamily: "Abel",
    fontSize: 16,
  },
  payBtn: {
    fontFamily: "Abel",
    marginRight: 8,
  },
});
const CancellationSuccess = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const returnToMembershipArea = () => {
    window.location.href = window.location.origin + "/dash/membership";
  };

  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            <CheckCircleIcon
              style={{ color: "#0D9D0D", height: "45px", width: "45px" }}
            />
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}
            >
              {t("cancellation.cancellation_success")}
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              {t("cancellation.cancellation_success_text")}
            </Typography>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={returnToMembershipArea}
                color="primary"
                autoFocus
                style={{ margin: "auto" }}
                variant="contained"
              >
                {t("order.back_to_my_membership")}
              </Button>
            </div>
          </Box>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
};

export default CancellationSuccess;
