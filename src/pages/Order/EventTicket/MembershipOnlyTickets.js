import { Avatar, Box, CardHeader, Paper, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import { orange } from '@material-ui/core/colors';
import { getEventsProductBySlug } from "../../../services/productservice";
import { setProduct } from "../../../redux/actions/orderActions";
import ContentLayout from "../../../layouts/ContentLayout";
import Loader from "../../../components/Loader";
import FastRegistration from "./FastRegistration";

const BoxContainer = styled(Box)`
  padding: 40px 20px;
  justify-content: center;
  text-align: center;
`;

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(orange[300]),
    backgroundColor: orange[300],
  },
}));

export default function MembershipOnlyTickets() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { event_slug } = useParams();
  const classes = useStyles();

  const product = useSelector((state) => state.order.ticketProduct);
  const membership = useSelector((state) => (
    window.APP_CONFIG.isMembershipV2 ? state.user.membershipdataV2 : state.user.membershipdata
  ));
  const active = !!(window.APP_CONFIG.isMembershipV2 ? membership.active : membership.membership);

  React.useEffect(() => {
    dispatch(setProduct(getEventsProductBySlug(event_slug)));
    // eslint-disable-next-line
  }, [event_slug]);

  if (!product) return <Loader />;

  const { content } = product;
  const header =
    typeof content[i18n.language] !== "undefined"
      ? content[i18n.language]
      : content["en"];

  if (active) {
    return <FastRegistration />;
  }

  return (
    <ContentLayout>
      <Paper elevation={0}>
        <BoxContainer component="header">
          <Typography
            variant="h1"
            component="h1"
            style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}>
            {header.title}
          </Typography>
          <Typography style={{ fontSize: 18 }}>
            {header.subtitle}
          </Typography>
        </BoxContainer>
        <CardHeader
          avatar={<Avatar className={classes.orange}><WarningOutlinedIcon /></Avatar>}
          title={<Typography variant="body1">
            {t("order.tickets_needs_membership")}
            <br />
            <a href="https://kli.one/dash/membership">{t("order.tickets_activate_membership")}</a>
          </Typography>}
        />
      </Paper>
    </ContentLayout>
  );
}
