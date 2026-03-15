import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ContentLayout from "../../layouts/ContentLayout";
import { useParams } from "react-router-dom";
import * as qs from "query-string";
import { paymentSuccess, retryWithBackoff } from "../../services/orderservice";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import * as Sentry from "@sentry/react";

const useStyles = makeStyles({
  header: {
    marginBottom: 40,
    justifyContent: "center",
    textAlign: "center",
  },
});

const SESSION_TIMEOUT_MS = 10000;

const SuccessMembership = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pdt } = useParams();
  const user = useSelector((state) => state.user);

  // null = pending, true = succeeded, false = failed
  const [confirmationStatus, setConfirmationStatus] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const posted = useRef(false);

  const returnToMembershipArea = () => {
    window.location.href = window.location.origin + "/dash/membership";
  };

  const confirmPayment = (q) => {
    posted.current = true;
    retryWithBackoff(() => paymentSuccess(q))
      .then(() => {
        setConfirmationStatus(true);
        if (pdt === "jan2022ticket") {
          setTimeout(() => {
            window.location.href = `${window.location.origin}/register/success`;
          }, 3000);
        }
      })
      .catch((error) => {
        setConfirmationStatus(false);
        Sentry.captureException(error, {
          tags: { flow: "membership_payment_confirmation" },
        });
      });
  };

  useEffect(() => {
    const q = qs.parse(window.location.search);
    const hasParams = Object.keys(q).length !== 0;

    if (!hasParams) {
      // No Pelecard params — session issue or direct navigation
      setTimedOut(true);
      return;
    }

    if (posted.current) return;

    if (user.authenticated) {
      confirmPayment(q);
      return;
    }

    // Wait for auth to resolve, with a fallback timeout
    const timer = setTimeout(() => {
      if (!posted.current) {
        setTimedOut(true);
      }
    }, SESSION_TIMEOUT_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [user]);

  // --- Timed out / no params ---
  if (timedOut) {
    return (
      <ContentLayout>
        <Paper elevation={0}>
          <CardContent>
            <Box component="header" className={classes.header}>
              <WarningIcon style={{ color: "orange", height: "45px", width: "45px" }} />
              <Typography
                variant="h1"
                component="h1"
                style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}
              >
                {t("order.confirmation_failed_title")}
              </Typography>
              <Typography style={{ fontSize: 18 }}>
                {t("order.session_expired")}
              </Typography>
              <br />
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={returnToMembershipArea}
                  color="primary"
                  variant="contained"
                  style={{ margin: "auto" }}
                >
                  {t("order.back_to_my_membership")}
                </Button>
              </div>
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    );
  }

  // --- Confirming payment (in-flight) ---
  if (confirmationStatus === null) {
    return (
      <ContentLayout>
        <Paper elevation={0}>
          <CardContent>
            <Box component="header" className={classes.header}>
              <CircularProgress style={{ marginBottom: 20 }} />
              <Typography style={{ fontSize: 18 }}>
                {t("order.confirming_payment")}
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    );
  }

  // --- Confirmation failed ---
  if (confirmationStatus === false) {
    const q = qs.parse(window.location.search);
    return (
      <ContentLayout>
        <Paper elevation={0}>
          <CardContent>
            <Box component="header" className={classes.header}>
              <WarningIcon style={{ color: "orange", height: "45px", width: "45px" }} />
              <Typography
                variant="h1"
                component="h1"
                style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}
              >
                {t("order.confirmation_failed_title")}
              </Typography>
              <Typography style={{ fontSize: 18 }}>
                {t("order.confirmation_failed")}
              </Typography>
              <br />
              <div style={{ textAlign: "center", display: "flex", gap: 12, justifyContent: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    posted.current = false;
                    setConfirmationStatus(null);
                    confirmPayment(q);
                  }}
                >
                  {t("error.try_again")}
                </Button>
                <Button variant="contained" onClick={returnToMembershipArea}>
                  {t("order.back_to_my_membership")}
                </Button>
              </div>
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    );
  }

  // --- Success ---
  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            <CheckCircleIcon style={{ color: "#0D9D0D", height: "45px", width: "45px" }} />
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}
            >
              {t("order.payment_success")}
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              {t("order.membershipPaymentSuccess")}
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

export default SuccessMembership;
