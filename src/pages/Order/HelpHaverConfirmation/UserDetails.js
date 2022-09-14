import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ContentLayout from "../../../layouts/ContentLayout";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useSelector } from "react-redux";
import styled from "styled-components";
const DetailGrid = styled(Grid)`
  max-width: 70%;
  margin: 0 auto;

  & .MuiFormLabel-root {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export default function UserDetails() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [activeStep, setActionStep] = React.useState(0);

  const saveDetails = () => {
    console.log("saveupdateddetails");
  };

  const moveback = () => {
    history.goBack();
  };

  const handleNext = () => {
    setActionStep((prevActiveStep) => prevActiveStep + 1);
    if (!activeStep === 2) {
      return;
    }
    saveDetails();
  };
  return (
    <ContentLayout>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" style={{ textAlign: "center" }}>
            Help Haver for Membership
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {["1", "2", "3"].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <DetailGrid container item xs={12} spacing={3}>
          {activeStep === 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h3">{t("userDetail.personal")}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.firstName")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.lastName")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.dateOfBirth")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.gender")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">{t("userDetail.email")}</FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h3">{t("userDetail.personal")}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.firstName")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.lastName")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.dateOfBirth")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.gender")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">{t("userDetail.email")}</FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h3">{t("userDetail.personal")}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.firstName")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.lastName")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.dateOfBirth")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">
                    {t("userDetail.gender")}
                  </FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">{t("userDetail.email")}</FormLabel>
                  <TextField id="email" variant="outlined" />
                </FormControl>
              </Grid>
            </>
          )}
        </DetailGrid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <Button variant="outlined" color="primary" onClick={moveback}>
            {i18n.language === "he" ? (
              <ArrowForwardIosIcon style={{ height: "12px", width: "12px" }} />
            ) : (
              <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />
            )}
            {t("common.back")}
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {t("common.next")}
          </Button>
        </Grid>
      </Grid>
    </ContentLayout>
  );
}
