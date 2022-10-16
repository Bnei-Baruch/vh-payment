import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import WarningIcon from "@material-ui/icons/Warning";
import ContentLayout from "../../layouts/ContentLayout";
import * as qs from "query-string";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  header: {
    padding: "20px",
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

const MembershippaymentError = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  // const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(true);
  const [errorMesg, setErrorMesg] = useState("Unknown Error");

  useEffect(() => {
    let q = qs.parse(window.location.search);

    if (q.error != null && q.error.length > 0) {
      setErrorMesg(q.error);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  const membershipPayment = () => {
    history.push("/pay/membership");
  };

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
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={membershipPayment}
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

export default MembershippaymentError;
