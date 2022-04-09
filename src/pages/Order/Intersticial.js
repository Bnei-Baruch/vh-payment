import React from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import ContentLayout from "../../layouts/ContentLayout";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { handlePayment, updateStatus } from "../../services/orderservice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQueryParams } from "../../utils/common";
import { useHistory } from "react-router-dom";
import { getProfile } from "../../services/userservice";
export default function Intersticial() {
  const history = useHistory();
  const { event_slug } = useParams();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.user);
  let isMembership = getQueryParams("isMembership");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const currency = useSelector((state) => state.currency);
  const selectedTicket = useSelector((state) => state.order.selectedTicket);
  const [profileData, setUserProfileData] = React.useState(null);
  const selectedMembership = useSelector(
    (state) => state.order.selectedMembership
  );
  const selectedSpecialOption = useSelector(
    (state) => state.order.specialSelectedOption
  );
  const userProfileData = useSelector((state) => state.user.profileData);
  const getUserProfileData = async () => {
    if (user && user.keycloak && user.keycloak.subject) {
      const userProfileData = await getProfile(user.keycloak.subject);
      setUserProfileData(userProfileData);
    }
  };
  React.useEffect(() => {
    getUserProfileData();
  // eslint-disable-next-line
  }, []);
  const handlePay = async (redirect_url) => {
    const data = {
      // Account details
      AccountID: "-",
      FirstName: user.profile.firstName,
      LastName: user.profile.lastName,
      Email: user.profile.email,
      Phone: profileData?.mobile_number || "",
      Street: profileData?.street_address || "",
      City: profileData?.city || "",
      Postcode: profileData?.postal_code || "",
      State: profileData?.state_region || "",
      Country: profileData?.country || "",

      //Product details
      SKU: selectedMembership.product?.SKU,
      OrderLanguage: i18n.language?.toUpperCase(),
      Reference: selectedMembership.product?.reference,
      Organization: selectedMembership.product?.organization,
      UserKey: user.keycloak.subject,
      Currency: currency.id?.toUpperCase(),
      Amount: selectedMembership.price[currency.id]?.amount,
      // Amount: 1,
      Type: selectedMembership.product?.type,
      ProductType: selectedMembership.product?.productType,
      RecurringFreq: selectedMembership.product?.recurringFreq,
      PaymentType: "helphaver",
      //replace this with routing mechanism
      successUrl:
        window.APP_CONFIG.VH_BASE_URL +
        `/pay/order/register/userdetail/${event_slug}`,
      cancelUrl: window.APP_CONFIG.VH_BASE_URL,
      errorUrl: window.APP_CONFIG.VH_BASE_URL + "/pay/error",
    };
    handlePayment(data).then(() => {
      window.location.href = redirect_url;
    });
  };
  const confirmNeedsHelpEvent = async () => {
    setSubmitting(true);
    const { type, register_status, redirect_url } = selectedSpecialOption;
    if (isMembership && typeof type === "undefined") {
      handlePay(redirect_url);
      return;
    }
    if (typeof type === "undefined") {
      window.location.href = window.location.origin + redirect_url;
      return;
    }
    await updateStatus({
      choice: register_status || "help",
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
        if (type === "helphaver") {
          window.location.href = redirect_url;
          return;
        }
        history.push(`/pay/order/register/userdetail/${event_slug}`);
      })
      .catch((e) => {
        console.error(e);
        setSubmitting(false);
      });
  };
  const confirmNeedsHelpMembership = async () => {
    const { type, redirect_url } = selectedSpecialOption;
    if (isMembership && typeof type === "undefined") {
      handlePay(redirect_url);
      return;
    }
  };
  const moveback = () => {
    history.goBack();
  };
  if (!selectedSpecialOption) return <></>;
  const { intersticial } = selectedSpecialOption;
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h1" style={{ textAlign: "center" }}>
              {intersticial.title}
            </Typography>{" "}
            <br />
            <Divider /> <br />
            <Typography
              variant="body"
              style={{ color: "#777", fontWeight: "normal" }}
            >
              {intersticial.body}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: !submitted ? "right" : "center" }}
          >
            <Button
              disabled={submitting}
              variant="contained"
              color="primary"
              onClick={
                !isMembership
                  ? confirmNeedsHelpEvent
                  : confirmNeedsHelpMembership
              }
            >
              {t("common.confirm")}
            </Button>
            &nbsp;&nbsp;
            <Button variant="contained" onClick={moveback}>
              {t("common.back")}
            </Button>
          </Grid>
        </Grid>
      </ContentLayout>
    </>
  );
}
