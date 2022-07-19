import React from "react";
import ContentLayout from "../../../layouts/ContentLayout";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getParticipantByEmail } from "../../../services/participants.service";
import styled from "styled-components";
const Container = styled(Grid)`
  padding: 40px 20px;
  background: url(/pay/images/illustration.svg);
  background-size: cover;
`;
export default function HelpHaver() {
  const history = useHistory();
  const { t } = useTranslation();
  const { event_slug, option } = useParams();

  const userProfileData = useSelector((state) => state.user.profileData);

  const getPariticpantDetail = () => {
    getParticipantByEmail(userProfileData.primary_email)
      .then((res) => {
        if (res) {
          const { id } = res;
          console.log(id);
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
    //TODO: Save the participant in the event
    history.push(
      `/pay/order/ticket/payment/special/${event_slug}/${option}/success`
    );
  };
  return (
    <ContentLayout>
      <Container container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" style={{ fontWeight: "normal" }}>
            {t("specialOption.titleIntersectial")} {option}
          </Typography>
          <br />
          <br />
          <Typography variant="body1">
            {option === "ukraine"
              ? t("specialOption.descriptionIntersectialUkraine")
              : t("specialOption.descriptionIntersectialRussia")}
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
          <Button variant="contained" color="primary" onClick={goToSuccess}>
            {t("common.next")} &nbsp;{" "}
            <ArrowForwardIosIcon style={{ height: "12px", width: "12px" }} />
          </Button>
        </Grid>
      </Container>
    </ContentLayout>
  );
}
