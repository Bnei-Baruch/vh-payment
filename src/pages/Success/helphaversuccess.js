import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import ContentLayout from "../../layouts/ContentLayout";
import { useSelector } from "react-redux";
import SuccessImage from "../../images/success.svg";
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
  const selectedSpecialOption = useSelector(
    (state) => state.order.specialSelectedOption
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !selectedSpecialOption) {
    return <Loader />;
  }

  const { redirect_url } = selectedSpecialOption;

  const redirectToUrlInNewTab = () => {
    window.open(redirect_url, "_blank");
  };

  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            <img src={SuccessImage} alt="success" />
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
                onClick={redirectToUrlInNewTab}
              >
                {t("help.enter_details_for_help")}
              </Button>
            </div>
          </Box>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
};

export default HelpHaverSuccess;
