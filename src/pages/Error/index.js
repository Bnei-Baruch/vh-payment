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

const Error = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  // const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(true);
  const [errorMesg, setErrorMesg] = useState("Unknown Error");

  useEffect(() => {
    let q = qs.parse(window.location.search);

    if (q.error != null && q.error.length > 0) {
      setErrorMesg(q.error);
    }

    // TODO: create backend for this
    // axios.post( window.APP_CONFIG.VH_ORDER, errinfo)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
            <WarningIcon
              style={{ color: "red", height: "45px", width: "45px" }}
            />
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}
            >
              {t("order.payment_error")}
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              {t("order.error_paid")} <br />
              {errorMesg}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: 20 }}
              >
                <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />{" "}
                {t("common.back")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
              >
                {t("error.try_again")}
              </Button>
            </div>
          </Box>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
};

export default Error;
