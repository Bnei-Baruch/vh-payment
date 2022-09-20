import React from "react";
import ContentLayout from "../../../layouts/ContentLayout";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
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

  const selectedSpecialOption = useSelector(
    (state) => state.order.specialSelectedOption
  );

  const redirectToUserDetails = async () => {
    const { type } = selectedSpecialOption;
    if (typeof type === "undefined") {
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
            variant="contained"
            color="primary"
            onClick={redirectToUserDetails}
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
