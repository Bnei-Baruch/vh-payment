import React from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import ContentLayout from "../../layouts/ContentLayout";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { updateStatus } from "../../services/orderservice";
import { useSelector } from "react-redux";
import { useStyles } from "./index";
import { getQueryParams } from "../../utils/common";
import { useHistory } from "react-router-dom";
export default function Needhelp() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  let isMembership = getQueryParams("isMembership");
  const classes = useStyles();
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const user = useSelector((state) => state.user);
  const selectedTicket = useSelector((state) => state.order.selectedTicket);
  const userProfileData = useSelector((state) => state.user.profileData);
  const redirectToPersonalArea = () => {
    window.location.href = window.location.origin + "/dash";
  };
  const confirmNeedsHelpEvent = async () => {
    setSubmitting(true);
    await updateStatus({
      choice: "help",
      communication_language: i18n.language?.toUpperCase(),
      country: userProfileData?.country,
      dob: userProfileData?.date_of_birth,
      email: userProfileData?.primary_email,
      event: selectedTicket.product?.productType,
      first_language: userProfileData?.first_language || i18n.language,
      first_name: userProfileData?.first_name_vernacular || user.firstName,
      gender: userProfileData?.gender,
      keycloakid: user?.keycloak?.subject,
      lang: i18n.language.toUpperCase(),
      last_name: userProfileData?.last_name_vernacular || user.lastName,
    })
      .then(() => {
        setSubmitted(true);
        setSubmitting(false);
      })
      .catch((e) => {
        console.error(e);
        setSubmitting(false);
      });
  };
  const confirmNeedsHelpMembership = async () => {
    //
  };
  const moveback = () => {
    history.goBack();
  };
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <Grid container spacing={6}>
          {!submitted ? (
            <Grid item xs={12}>
              <Typography variant="h1" style={{ textAlign: "center" }}>
                {t("help.header")}
              </Typography>{" "}
              <br />
              <Divider /> <br />
              <Typography variant="h2" style={{ fontWeight: "normal" }}>
                {t("help.requestHelp")}
              </Typography>
              <br />
              <Typography
                variant="body"
                style={{ color: "#777", fontWeight: "normal" }}
              >
                {t("help.helpDescription")}
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography variant="h1" style={{ textAlign: "center" }}>
                {t("help.submittedHeader")}
              </Typography>{" "}
              <br />
              <Divider /> <br />
              <Typography variant="h2" style={{ fontWeight: "normal" }}>
                {t("help.requestSubmitted")}
              </Typography>
              <br />
              <br />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            style={{ textAlign: !submitted ? "right" : "center" }}
          >
            {!submitted ? (
              <>
                {" "}
                <Button
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                  onClick={
                    isMembership
                      ? confirmNeedsHelpEvent
                      : confirmNeedsHelpMembership
                  }
                >
                  {submitting ? (
                    <>
                      {" "}
                      <CircularProgress m={2} className={classes.loader} />{" "}
                      &nbsp; {t("order.processing")}{" "}
                    </>
                  ) : (
                    t("common.confirm")
                  )}
                </Button>{" "}
                &nbsp;&nbsp;
                <Button variant="contained" onClick={moveback}>
                  {" "}
                  {t("common.cancel")}
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={redirectToPersonalArea}
              >
                {t("help.return_to_personal_area")}
              </Button>
            )}
          </Grid>
        </Grid>
      </ContentLayout>
    </>
  );
}
