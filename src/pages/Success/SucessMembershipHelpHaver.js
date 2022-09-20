import React from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import ContentLayout from "../../layouts/ContentLayout";
import InfoIcon from "@material-ui/icons/Info";
const useStyles = makeStyles({
  header: {
    padding: "40px 20px",
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

const SucessMembershipHelpHaver = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            <InfoIcon
              style={{ color: "#1976d2", height: "45px", width: "45px" }}
            />
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 36, margin: 20 }}
            >
              {t("help.request_received")}
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: t("help.request_received_text"),
                }}
              ></div>
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 40 }}
                onClick={() => {
                  window.location.href =
                    window.location.origin + "/dash/membership";
                }}
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

export default SucessMembershipHelpHaver;
