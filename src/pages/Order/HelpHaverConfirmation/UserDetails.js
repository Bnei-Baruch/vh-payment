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

export default function UserDetails() {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const [activeStep, setActionStep] = React.useState(0);

  const saveDetails = () => {
    console.log("saveupdateddetails");
  };

  const moveback = () => {
    history.goBack();
  };

  const handleNext = () => {
    if (activeStep === 2) {
      setActionStep((prevActiveStep) => prevActiveStep + 1);
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
        <Grid item xs={12}>
          {activeStep === 0 && (
            <>
              <Typography variant="h3">Contact</Typography>
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField id="email" variant="outlined" />
              </FormControl>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Typography variant="h3">Contact</Typography>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Typography variant="h3">Contact</Typography>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
            </>
          )}
        </Grid>
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
