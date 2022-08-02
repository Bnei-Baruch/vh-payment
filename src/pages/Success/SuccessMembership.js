import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ContentLayout from "../../layouts/ContentLayout";
import { useParams } from "react-router-dom";
import * as qs from "query-string";
import { paymentSuccess } from "../../services/orderservice";
import { getQueryParams } from "../../utils/common";
import Loader from "../../components/Loader";

const useStyles = makeStyles({
  header: {
    marginBottom: 40,
    justifyContent: "center",
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
const SuccessMembership = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pdt } = useParams();
  let help = getQueryParams("help");

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  /**
   * This Useeffect sends the payments detail
   * to backend after successful payment completion.
   */
  useEffect(() => {
    let q = qs.parse(window.location.search);
    if (user.authenticated && Object.keys(q).length !== 0) {
      paymentSuccess(q)
        .then(() => {
          if (pdt === "jan2022ticket") {
            setTimeout(() => {
              window.location.href = `${window.location.origin}/register/success`;
            }, 3000);
          }
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });
    }
  }, [pdt, user]);

  if (!user.authenticated || loading) {
    return <Loader />;
  }

  const returnToPersonalArea = () => {
    window.location.href = window.location.origin + "/dash/membership";
  };

  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            {
              <Typography
                variant="h1"
                component="h1"
                style={{ fontSize: 36, marginBottom: 20 }}
              >
                {t("order.thankyou")}
              </Typography>
            }

            {help ? (
              <Typography style={{ fontSize: 18 }}>
                {t("help.requestSubmitted")}
              </Typography>
            ) : (
              <Typography style={{ fontSize: 18 }}>
                {t("order.thxtext")}
              </Typography>
            )}
            <br />
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={returnToPersonalArea}
                color="primary"
                autoFocus
                style={{ margin: "auto" }}
                variant="contained"
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

export default SuccessMembership;
