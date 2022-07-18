import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ContentLayout from "../../layouts/ContentLayout";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useParams } from "react-router-dom";
import * as qs from "query-string";
import { paymentSuccess } from "../../services/orderservice";

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

const SpecialOptionSuccess = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  /**
   * This Useeffect sends the payments detail
   * to backend after successful payment completion.
   */
  useEffect(() => {
    setLoading(false);
  }, []);

  if (!user.authenticated || loading) {
    return <Loader />;
  }

  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            <CheckCircleIcon
              style={{ color: "#0D9D0D", height: "45px", width: "45px" }}
            />
            <Typography
              variant="h2"
              style={{ fontSize: 24, margin: 20, fontWeight: "normal" }}
            >
              {"You have successfully registered for the event!"}
            </Typography>
            <Typography style={{ fontSize: 18, color: "rgba(90, 90, 90, 1)" }}>
              {
                "After registration, we will send you a ticket to the event by email."
              }
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />{" "}
              {t("order.back_to_event")}
            </Button>
          </Box>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
};

export default SpecialOptionSuccess;
