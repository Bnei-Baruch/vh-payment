import React from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import ContentLayout from "../../layouts/ContentLayout";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
export default function Needhelp() {
  const [submitted, setSubmitted] = React.useState(false);
  const { t } = useTranslation();
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
          <Grid item xs={12} style={{ textAlign: !submitted ? "right" : 'center' }}>
            {!submitted ? (
              <>
                {" "}
                <Button variant="contained" color="primary">
                  {t("common.confirm")}
                </Button>{" "}
                &nbsp;&nbsp;
                <Button variant="contained"> {t("common.cancel")}</Button>
              </>
            ) : (
              <Button variant="contained" color="primary">
                {t("common.ok")}
              </Button>
            )}
          </Grid>
        </Grid>
      </ContentLayout>
    </>
  );
}
