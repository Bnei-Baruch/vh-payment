import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
import MuiPhoneInput from "material-ui-phone-number";
import countries from "../../../shared/countries";
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

const language = [
  { code: "en", label: "English" },
  { code: "he", label: "Hebrew" },
  { code: "es", label: "Spanish" },
  { code: "ru", label: "Russian" },
  { code: "de", label: "German" },
];

const periods = [
  { value: 1, name: "1 month" },
  { value: 2, name: "2 month" },
  { value: 3, name: "3 month" },
  { value: 4, name: "4 month" },
  { value: 5, name: "5 month" },
  { value: 6, name: "6 month" },
  { value: 7, name: "7 month" },
  { value: 8, name: "8 month" },
  { value: 9, name: "9 month" },
  { value: 10, name: "10 months" },
  { value: 11, name: "11 months" },
  { value: 12, name: "12 months" },
];
export default function UserDetails() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const user = useSelector((state) => state.user.profileData);
  const [profileData, setProfiledata] = React.useState(undefined);
  const [requestData, setRequestData] = React.useState({
    period: 1,
    situation: "",
  });

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

  React.useEffect(() => {
    if (user && profileData === undefined) {
      setProfiledata(user);
    }
  }, [user]);
  console.log(user);
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
        {profileData && (
          <DetailGrid container item xs={12} spacing={3}>
            {activeStep === 0 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    {t("userDetail.personal")}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.firstName")}
                    </FormLabel>
                    <TextField
                      id="email"
                      variant="outlined"
                      value={profileData.first_name_vernacular}
                      onChange={(e) => {
                        setProfiledata({
                          ...profileData,
                          first_name_vernacular: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.lastName")}
                    </FormLabel>
                    <TextField
                      id="email"
                      variant="outlined"
                      value={profileData.last_name_vernacular}
                      onChange={(e) => {
                        setProfiledata({
                          ...profileData,
                          last_name_vernacular: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.dateOfBirth")}
                    </FormLabel>
                    <TextField
                      id="date"
                      type="date"
                      variant="outlined"
                      value={profileData.date_of_birth}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setProfiledata({
                          ...profileData,
                          date_of_birth: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.gender")}
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      style={{ flexDirection: "row" }}
                      value={profileData.gender}
                      onChange={(e) => {
                        setProfiledata({
                          ...profileData,
                          gender: e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.email")}
                    </FormLabel>
                    <TextField
                      id="email"
                      variant="outlined"
                      value={profileData.primary_email}
                      disabled
                    />
                  </FormControl>
                </Grid>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    {t("userDetail.contact")}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.firstName")}
                    </FormLabel>
                    <MuiPhoneInput
                      defaultCountry="us"
                      value={profileData.mobile_number}
                      onChange={(value) => {
                        setProfiledata({
                          ...profileData,
                          phone_number: value,
                        });
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <FormLabel htmlFor="email">
                      {t("userDetail.country")}
                    </FormLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={profileData.country}
                      variant="outlined"
                      onChange={(e) => {
                        setProfiledata({
                          ...profileData,
                          country: e.target.value,
                        });
                      }}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.ISO} value={country.ISO}>
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <FormLabel htmlFor="email">
                      {t("userDetail.firstLanguage")}
                    </FormLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      variant="outlined"
                      value={profileData.first_language}
                      onChange={(e) => {
                        setProfiledata({
                          ...profileData,
                          first_language: e.target.value,
                        });
                      }}
                    >
                      {language.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                          {lang.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.tenName")}
                    </FormLabel>
                    <TextField
                      variant="outlined"
                      value={profileData.name_ten_group}
                      onChange={(e) => {
                        setProfiledata({
                          ...profileData,
                          name_ten_group: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
              </>
            )}

            {activeStep === 2 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    {t("userDetail.details")}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.month_needed")}
                    </FormLabel>
                    <Select
                      value={requestData.period}
                      variant="outlined"
                      onChange={(event) => {
                        setRequestData({
                          ...requestData,
                          period: event.target.value,
                        });
                      }}
                    >
                      {periods.map((l) => (
                        <MenuItem key={l.value} value={l.value}>
                          {l.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel htmlFor="email">
                      {t("userDetail.explain_situation")}
                    </FormLabel>
                    <TextField
                      id="email"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={requestData.situation}
                      onChange={(e) => {
                        setRequestData({
                          ...requestData,
                          situation: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
              </>
            )}
          </DetailGrid>
        )}
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
