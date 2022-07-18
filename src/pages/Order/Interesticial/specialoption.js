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
  background: url(/images/illustration.svg);
  background-size: cover;
`;
export default function HelpHaver() {
  const history = useHistory();
  const { event_slug, option } = useParams();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.user);
  const [submitting, setSubmitting] = React.useState(false);
  const userProfileData = useSelector((state) => state.user.profileData);
  const getUserProfileData = async () => {
    if (user && user.keycloak && user.keycloak.subject) {
      const userProfileData = await getProfile(user.keycloak.subject);
      //setUserProfileData(userProfileData);
    }
  };
  React.useEffect(() => {
    getUserProfileData();
    // eslint-disable-next-line
  }, []);

  const getPariticpantDetail = () => {
    getParticipantByEmail(userProfileData.primary_email)
      .then((res) => {
        if (res) {
          const { id } = res;
          //setParticipantId(id);
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

  const moveback = () => {
    history.goBack();
  };

  const goToSuccess = () => {
    history.push(
      `/pay/order/ticket/payment/special/${event_slug}/${option}/success`
    );
  };
  return (
    <ContentLayout>
      <Container container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" style={{ fontWeight: "normal" }}>
            {"For our friends from Ukraine"}
          </Typography>
          <br />
          <br />
          <Typography variant="body1">
            {
              "The leadership of the International Kabbalah Academy has decided that participation in this event is free for friends from Ukraine. You just need to register for the event."
            }
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
            <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />
            {t("common.back")}
          </Button>
          <Button
            disabled={submitting}
            variant="contained"
            color="primary"
            onClick={goToSuccess}
          >
            {t("common.next")} &nbsp;{" "}
            <ArrowForwardIosIcon style={{ height: "12px", width: "12px" }} />
          </Button>
        </Grid>
      </Container>
    </ContentLayout>
  );
}
