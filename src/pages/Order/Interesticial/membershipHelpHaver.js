import React from "react";
import ContentLayout from "../../../layouts/ContentLayout";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { handlePayment } from "../../../services/orderservice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQueryParams } from "../../../utils/common";
import { useHistory } from "react-router-dom";
import { getProfile } from "../../../services/userservice";
import {
  addAParticipant,
  getParticipantByEmail,
} from "../../../services/participants.service";
import { getEventsProductBySlug } from "../../../services/productservice";
import { addPariticpantInEvent } from "../../../services/event.service";
import Loader from "../../../components/Loader";
import styled from "styled-components";
const Container = styled(Grid)`
  padding: 40px 20px;
  background-size: cover;
`;
export default function MembershipHelphaver() {
  const history = useHistory();
  const { event_slug } = useParams();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.user);
  let isMembership = getQueryParams("isMembership");
  // eslint-disable-next-line
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const currency = useSelector((state) => state.currency);
  const [profileData, setUserProfileData] = React.useState(null);
  const [participantId, setParticipantId] = React.useState(undefined);
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
        `/pay/membership/payment/${event_slug}/success?help=true`,
      cancelUrl: window.APP_CONFIG.VH_BASE_URL,
      errorUrl: window.APP_CONFIG.VH_BASE_URL + "/pay/error",
    };
    handlePayment(data).then(() => {
      window.location.href = redirect_url;
    });
  };
  const getPariticpantDetail = () => {
    getParticipantByEmail(userProfileData.primary_email)
      .then((res) => {
        if (res) {
          const { id } = res;
          setParticipantId(id);
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };
  React.useEffect(() => {
    if (userProfileData && userProfileData.primary_email) {
      getPariticpantDetail();
    }
    // eslint-disable-next-line
  }, [userProfileData]);
  const confirmNeedsHelpEvent = async () => {
    setSubmitting(true);
    const eventData = getEventsProductBySlug(event_slug);
    const { type, register_status, redirect_url } = selectedSpecialOption;
    if (typeof type === "undefined") {
      window.location.href = window.location.origin + redirect_url;
      return;
    }
    if (type === "helphaver") {
      if (participantId) {
        const data = {
          participation_option: register_status,
          participant_id: participantId,
          event_id: eventData.event.id,
          registration_date: new Date().toISOString(),
        };
        addPariticpantInEvent(data).then(() => {
          window.location.href = redirect_url;
        });
      } else {
        //SetUpdatedObject
        const data = {
          keycloak_id: user.keycloak.subject,
          first_language: profileData.first_language,
          email_language: i18n.language,
          dob: profileData.date_of_birth
            ? new Date(profileData.date_of_birth).toISOString()
            : new Date().toISOString(),
          gender: profileData.gender,
          email: profileData.primary_email,
          country: profileData.country,
          first_name: profileData.first_name_vernacular,
          last_name: profileData.last_name_vernacular,
        };
        addAParticipant(data).then((res) => {
          if (res) {
            setParticipantId(res.id);
            const data = {
              //Should be the option of the user pariticpant.
              participation_option: register_status,
              participant_id: res.id,
              event_id: eventData.event.id,
              registration_date: new Date().toISOString(),
            };
            addPariticpantInEvent(data).then((res) => {
              window.location.href = redirect_url;
            });
          }
        });
      }
    } else {
      history.push(
        `/pay/order/register/${register_status}/userdetail/${event_slug}?Manual=true`
      );
    }
  };
  const confirmNeedsHelpMembership = async () => {
    const { type, redirect_url } = selectedSpecialOption;
    if (isMembership && typeof type === "undefined") {
      //handlePay(redirect_url);
      history.push(`/pay/order/membership/${event_slug}/userdetail`);
      return;
    }
  };
  const moveback = () => {
    history.goBack();
  };
  if (!selectedSpecialOption) return <Loader />;
  const { intersticial } = selectedSpecialOption;
  return (
    <ContentLayout>
      <Container container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" style={{ fontWeight: "normal" }}>
            {intersticial.title}
          </Typography>
          <br />
          <br />
          <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: intersticial.body }}></div>
          </Typography>
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
          <Button
            disabled={submitting}
            variant="contained"
            color="primary"
            onClick={confirmNeedsHelpMembership}
          >
            {t("common.next")} &nbsp;{" "}
            {i18n.language === "he" ? (
              <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />
            ) : (
              <ArrowForwardIosIcon style={{ height: "12px", width: "12px" }} />
            )}
          </Button>
        </Grid>
      </Container>
    </ContentLayout>
  );
}
