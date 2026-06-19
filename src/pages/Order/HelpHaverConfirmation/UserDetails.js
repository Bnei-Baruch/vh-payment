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
import {
  requestHelpHaver,
  requestHelpHaverV2,
  saveUserProfileData,
} from "../../../services/userservice";
import { getMembershipMonthlyPricing } from "../../../services/productservice";
import moment from "moment";
const DetailGrid = styled(Grid)`
  max-width: 70%;
  margin: 0 auto;

  & .MuiFormLabel-root {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const language = [
  { code: "en", label: "English" },
  { code: "he", label: "Hebrew" },
  { code: "es", label: "Spanish" },
  { code: "ru", label: "Russian" },
  { code: "de", label: "German" },
];

export default function UserDetails() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const selectedSpecialOption = useSelector(
    (state) => state.order.specialSelectedOption
  );
  const [originProfileData, setOriginalProfileData] = React.useState(undefined);
  const [profileData, setProfiledata] = React.useState(undefined);
  const [requestData, setRequestData] = React.useState({
    period: 1,
    situation: "",
    type: "",
    discountPct: "",
  });
  // V1 members use the legacy profiles request flow; V2 members request a
  // discount grant stored in the orders service.
  const [pricingVersion, setPricingVersion] = React.useState(null);
  const [pricingFailed, setPricingFailed] = React.useState(false);
  const isV2 = pricingVersion === "v2";
  const pricingKnown = pricingVersion !== null; // resolved to "v1" or "v2"
  const pricingLoading = !pricingKnown && !pricingFailed; // fetch still in flight

  const periods = [...Array(isV2 ? 6 : 12)].map((_, i) => ({
    value: i + 1,
    name: String(i + 1),
  }));

  const [activeStep, setActionStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(undefined);

  const moveback = () => {
    if (activeStep === 0) {
      history.goBack();
    } else {
      setActionStep(activeStep - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (activeStep === 2) {
      if (isV2 && (!requestData.type || !requestData.discountPct)) return;
      if (originProfileData !== profileData) {
        // update profile

        saveUserProfileData({
          ...originProfileData,
          ...profileData,
          date_of_birth: moment(
            profileData.date_of_birth,
            "YYYY-MM-DD"
          ).toISOString(),
        });
      }
      confirmNeedsHelpMembership();
      return;
    }
    setActionStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePay = async () => {
    if (submitting) return; // guard against double-submit
    if (!pricingKnown) {
      // pricing hasn't resolved (loading or failed) — don't submit against an unknown plan
      setErrorMessage(t("errorMessage.generic"));
      return;
    }
    if (isV2 && (!requestData.type || !requestData.discountPct)) {
      // validation must hold at the POST site, not only in handleNext
      setErrorMessage(t("errorMessage.generic"));
      return;
    }
    setErrorMessage(undefined);
    setSubmitting(true);
    if (isV2) {
      requestHelpHaverV2({
        keycloak_id: user.keycloak.subject,
        type: requestData.type,
        requested_pct: parseInt(requestData.discountPct, 10),
        months: requestData.period,
        note: requestData.situation || undefined,
      })
        .then(() => {
          history.push("/pay/order/membership/successhelphaver");
        })
        .catch((er) => {
          console.log(er);
          setErrorMessage(t("errorMessage.generic"));
          setSubmitting(false);
        });
      return;
    }
    const data = {
      name: user.profile.firstName + " " + user.profile.lastName,
      keycloak_id: user.keycloak.subject,
      status: "REQUESTED",
      nb_month: requestData.period,
      request_note: requestData.situation,
      type: "hhmembership",
    };
    requestHelpHaver(data)
      .then(() => {
        history.push("/pay/order/membership/successhelphaver");
      })
      .catch((er) => {
        console.log(er);
      });
  };
  React.useEffect(() => {
    if (user && user.profileData && profileData === undefined) {
      setOriginalProfileData(user.profileData);
      setProfiledata(user.profileData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    if (user?.keycloak?.subject && pricingLoading) {
      getMembershipMonthlyPricing(user.keycloak.subject)
        .then((pricing) => setPricingVersion(pricing?.pricingVersion ?? "v1"))
        .catch((er) => {
          console.error(er);
          setPricingFailed(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const confirmNeedsHelpMembership = async () => {
    if (typeof selectedSpecialOption?.type === "undefined") {
      handlePay();
      return;
    }
  };

  return (
    <form onSubmit={handleNext}>
      <ContentLayout>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h1" style={{ textAlign: "center" }}>
              {t("userDetail.help_haver_title")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stepper activeStep={activeStep} alternativeLabel dir="ltr">
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
                      <FormLabel htmlFor="firstName">
                        {t("userDetail.firstName")}
                      </FormLabel>
                      <TextField
                        id="firstName"
                        variant="outlined"
                        value={profileData.first_name_vernacular}
                        required
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
                      <FormLabel htmlFor="lastName">
                        {t("userDetail.lastName")}
                      </FormLabel>
                      <TextField
                        id="lastName"
                        variant="outlined"
                        required
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
                      <FormLabel htmlFor="dateofBirth">
                        {t("userDetail.dateOfBirth")}
                      </FormLabel>
                      <TextField
                        id="dateofBirth"
                        type="date"
                        variant="outlined"
                        required
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
                      <FormLabel htmlFor="gender">
                        {t("userDetail.gender")}
                      </FormLabel>
                      <RadioGroup
                        id="gender"
                        aria-label="gender"
                        name="gender1"
                        required
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
                          label={t("userDetail.male")}
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label={t("userDetail.female")}
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
                        disabled
                        variant="outlined"
                        value={profileData.primary_email}
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
                      <FormLabel htmlFor="phone">
                        {t("userDetail.phone")}
                      </FormLabel>
                      <MuiPhoneInput
                        id="phone"
                        required
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
                      <FormLabel htmlFor="country">
                        {t("userDetail.country")}
                      </FormLabel>
                      <Select
                        labelId="country"
                        id="country"
                        required
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
                      <FormLabel htmlFor="firstLanguage">
                        {t("userDetail.firstLanguage")}
                      </FormLabel>
                      <Select
                        labelId="firstLanguage"
                        id="firstLanguage"
                        variant="outlined"
                        required
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
                      <FormLabel htmlFor="tenName">
                        {t("userDetail.tenName")}
                      </FormLabel>
                      <TextField
                        id="tenName"
                        variant="outlined"
                        required
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
                  {isV2 && (
                    <>
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <FormLabel htmlFor="requestType">
                            {t("userDetail.request_type")}
                          </FormLabel>
                          <Select
                            id="requestType"
                            value={requestData.type}
                            variant="outlined"
                            required
                            displayEmpty
                            onChange={(e) =>
                              setRequestData({ ...requestData, type: e.target.value })
                            }
                          >
                            <MenuItem value="" disabled>
                              {t("userDetail.request_type_placeholder")}
                            </MenuItem>
                            {profileData?.country === "IL" && (
                              <MenuItem value="hh-hayal">
                                {t("userDetail.type_hayal")}
                              </MenuItem>
                            )}
                            <MenuItem value="hh-gimlaj">
                              {t("userDetail.type_gimlay")}
                            </MenuItem>
                            <MenuItem value="hh-other">
                              {t("userDetail.type_other")}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel htmlFor="discountPct">
                            {t("userDetail.discount_pct")}
                          </FormLabel>
                          <RadioGroup
                            row
                            value={requestData.discountPct}
                            onChange={(e) =>
                              setRequestData({ ...requestData, discountPct: e.target.value })
                            }
                          >
                            {[25, 50, 75, 100].map((pct) => (
                              <FormControlLabel
                                key={pct}
                                value={String(pct)}
                                control={<Radio required />}
                                label={`${pct}%`}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="email">
                        {t("userDetail.month_needed")}
                      </FormLabel>
                      <Select
                        value={requestData.period}
                        variant="outlined"
                        required
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
                        {t(!isV2
                          ? "userDetail.explain_situation"
                          : requestData.type === "hh-other"
                          ? "userDetail.explain_situation_required"
                          : "userDetail.explain_situation_optional")}
                      </FormLabel>
                      <TextField
                        id="email"
                        variant="outlined"
                        multiline
                        required={!isV2 || requestData.type === "hh-other"}
                        minRows={4}
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

          {(errorMessage || pricingFailed) && (
            <Grid item xs={12}>
              <div style={{ color: "red" }}>{errorMessage || t("errorMessage.generic")}</div>
            </Grid>
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
                <ArrowForwardIosIcon
                  style={{ height: "12px", width: "12px" }}
                />
              ) : (
                <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />
              )}
              {t("common.back")}
            </Button>
            <Button variant="contained" color="primary" type="submit"
              disabled={submitting || (activeStep === 2 && !pricingKnown)}>
              {t("common.next")}
            </Button>
          </Grid>
        </Grid>
      </ContentLayout>
    </form>
  );
}
