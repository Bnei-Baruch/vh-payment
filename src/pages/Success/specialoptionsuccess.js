import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ContentLayout from "../../layouts/ContentLayout";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  header: {
    padding: "40px 20px",
    justifyContent: "center",
    textAlign: "center",
    "@media (max-width: 768px)": {
      padding: "0px !important",
    },
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
  actionButtons: {
    "@media (max-width: 768px)": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  },
});

const SpecialOptionSuccess = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { option } = useParams();
  const [loading, setLoading] = useState(false);

  const selectedSpecialOption = useSelector(
    (state) => state.order.specialSelectedOption
  );
  const user = useSelector((state) => state.user);

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
              style={{ fontSize: 24, margin: "20px 0px", fontWeight: "normal" }}
            >
              {option === "ukraine"
                ? t("specialOption.successTitleUkraine")
                : t("specialOption.successTitleRussia")}
            </Typography>
            <Typography style={{ fontSize: 18, color: "rgba(90, 90, 90, 1)" }}>
              {option === "ukraine"
                ? t("specialOption.descriptionIntersectialUkraine")
                : t("specialOption.descriptionIntersectialRussia")}
            </Typography>
            <div className={classes.actionButtons}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={() => {
                  window.location.href =
                    window.location.origin + "/dash/events";
                }}
              >
                {t("order.back_to_event")}
              </Button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {option !== "ukraine" && (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    window.open(selectedSpecialOption.payment_url);
                  }}
                >
                  {t("common.buy_ticket")}
                </Button>
              )}
            </div>
          </Box>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
};

export default SpecialOptionSuccess;
