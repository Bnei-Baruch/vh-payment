import React from "react";
import ContentLayout from "../../../layouts/ContentLayout";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loader from "../../../components/Loader";
import styled from "styled-components";
const Container = styled(Grid)`
  padding: 40px 20px;
`;
export default function MembershipIntersticial() {
  const history = useHistory();
  const { t } = useTranslation();

  const selectedSpecialOption = useSelector(
    (state) => state.order.specialSelectedOption
  );

  const moveback = () => {
    history.goBack();
  };

  const goToMembership = () => {
    window.location.href = window.location.origin + `/dash/membership`;
  };

  if (!selectedSpecialOption) return <Loader />;

  const {intersticial} = selectedSpecialOption

  return (
    <ContentLayout>
      <Container container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" style={{ fontWeight: "normal" }}>
            {intersticial.title}
          </Typography>
          <br />
          <br />
          <Typography variant="body1">{intersticial.body}</Typography>
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
          <Button variant="contained" color="primary" onClick={goToMembership}>
            {t("order.become_a_member")}
          </Button>
        </Grid>
      </Container>
    </ContentLayout>
  );
}
