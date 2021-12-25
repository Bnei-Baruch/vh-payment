import React from "react";
import { Box, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import ContentLayout from "../../layouts/ContentLayout";
import HeaderLayout from "../../layouts/HeaderLayout";

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
  headerText : { fontSize: 36, marginBottom: 20 },
  messageText : { fontSize: 18, marginTop: 20 }
});

const NotFound = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <Paper elevation={0}>
          <CardContent>
            <Box component="header" className={classes.header}>
              {
                <Typography
                  variant="h1"
                  component="h1"
                  className={classes.headerText}
                >
                  {t("error.page_not_found")}
                </Typography>
              }
              <Typography className={classes.messageText}>
                {t("error.retry")}
              </Typography>
              <Typography className={classes.messageText}>
                {t("order.errortext2")}
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    </>
  );
};

export default NotFound;
