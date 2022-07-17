import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import WarningIcon from "@material-ui/icons/Warning";
import ContentLayout from "../../layouts/ContentLayout";
import * as qs from "query-string";

const useStyles = makeStyles({
  header: {
    padding: "40px",
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

const HelpHaverSuccess = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            <img src="/images/success.svg" />
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 36, margin: 20 }}
            >
              {t("help.submittedHeader")}
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              {t("help.requestSubmitted")}
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 40 }}
              >
                {t("order.returnToPersonalArea")}
              </Button>
            </div>
          </Box>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
};

export default HelpHaverSuccess;
