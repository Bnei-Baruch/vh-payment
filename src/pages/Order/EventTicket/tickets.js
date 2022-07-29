import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { getEventsProductBySlug } from "../../../services/productservice";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setProduct,
  setSelectedTicket,
  setSpecialSelectedOption,
} from "../../../redux/actions/orderActions";
import { useHistory } from "react-router-dom";
import Loader from "../../../components/Loader";
const TicketCard = styled(Grid)`
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 25px 20px;
  margin: 16px;

  @media (min-width: 768px) {
    max-width: 350px;
  }
`;
const Price = styled.div`
  color: #3376d6;
  font-weight: bold;
`;
const TicketGrid = styled(Grid)`
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 80%;
    margin: auto;
  }

  ul {
    padding-left: 20px;
    & > li {
      padding: 10px 0px;
    }
  }
`;
const CenterText = styled(Typography)`
  text-align: center;
  font-weight: normal;
`;
const CenterTextGrey = styled(Typography)`
  text-align: center;
  color: #777777;
  font-weight: normal;
`;
const CTAGrid = styled(Grid)`
  text-align: center;
`;

const marginLeftAuto = {
  marginLeft: "auto",
};

const marginRightAuto = {
  marginRight: "auto",
};

export default function Tickets() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { event_slug } = useParams();
  const isMobile = useMediaQuery("(max-width:767px)");

  const product = useSelector((state) => state.order.ticketProduct);
  const currency = useSelector((state) => state.currency);
  const membershipData = useSelector((state) => state.user.membershipdata);

  React.useEffect(() => {
    dispatch(setProduct(getEventsProductBySlug(event_slug)));
    // eslint-disable-next-line
  }, [event_slug]);

  const planSelected = (ticket) => {
    dispatch(setSelectedTicket(ticket));
    navigateToConfirmation(ticket);
  };

  const navigateToConfirmation = (ticket) => {
    const { name } = ticket;

    if (name === "helphaver") {
      const content = ticket.content[i18n.language] || ticket.content.en;
      const selectedOption = content.options.find(
        (item) => item.name === "helphaver"
      );
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(`/pay/order/ticket/payment/help/${event_slug}`);
    } else if (name === "special") {
      const content = ticket.content[i18n.language] || ticket.content.en;
      const selectedOption = content.options.find(
        (item) => item.name === "specialoption"
      );
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(`/pay/order/ticket/payment/special/${event_slug}`);
    } else if (name === "membership" && membershipData?.membership !== true) {
      const selectedOption = ticket.content[i18n.language] || ticket.content.en;
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(`/pay/order/ticket/payment/membership/${event_slug}`);
      return;
    } else {
      history.push(`/pay/order/ticket/payment/${event_slug}`);
    }
  };

  const getPlansInSortedFormat = (plans) => {
    let plan = plans.filter(
      (plan) => plan.membership === membershipData?.membership
    );
    return plan.sort((a, b) => parseInt(a.order) - parseInt(b.order));
  };

  if (!product) return <Loader />;

  const { content } = product;
  let plans = getPlansInSortedFormat(product.plans);
  const header =
    typeof content[i18n.language] !== "undefined"
      ? content[i18n.language]
      : content["en"];
  return (
    <TicketGrid container>
      <Grid item xs={12}>
        <br />
        <CenterText variant="h1">{header.title}</CenterText>
        <CenterTextGrey variant="h6">{header.subtitle}</CenterTextGrey>
        <br />
        <br />
        <CenterText variant="h6">{header.action}</CenterText>
      </Grid>
      <Grid container item xs={12}>
        {plans.map((plan, index) => {
          const planContent =
            typeof plan.content[i18n.language] !== "undefined"
              ? plan.content[i18n.language]
              : plan.content["en"];
          return (
            <Grid
              key={index}
              item
              xs={12}
              md={membershipData?.membership ? 4 : 6}
            >
              <TicketCard
                style={
                  !isMobile && !membershipData?.membership
                    ? index % 2 === 0
                      ? i18n.language !== "he"
                        ? marginLeftAuto
                        : marginRightAuto
                      : i18n.language !== "he"
                      ? marginRightAuto
                      : marginLeftAuto
                    : {}
                }
              >
                <CenterText variant="h2" style={{ fontWeight: "bold" }}>
                  {planContent.name}
                </CenterText>
                <br />
                <br />
                <CenterText variant="h2">
                  <Price>
                    {plan.isFree
                      ? t("help.financial_help")
                      : plan.name === "special"
                      ? `${t("specialOption.chose_your_option")}`
                      : currency.sign + " " + plan.price[currency.id].amount}
                  </Price>
                </CenterText>
                <Grid>
                  {planContent &&
                  planContent.description &&
                  planContent.description.length > 0 &&
                  planContent.description.length > 1 ? (
                    <ul>
                      {planContent.description.map((item, index) => (
                        <li key={index}>
                          <Typography variant="body1">{item}</Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ textAlign: "center", margin: "35px 0px" }}>
                      {planContent.description.join("\n")}
                    </div>
                  )}
                </Grid>
                {/* <Grid>
                    {planContent.options && (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          {t("common.select_option")}
                        </FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          value={specialOption}
                          onChange={(e) => setSpecialOption(e.target.value)}
                        >
                          {planContent.options.map((item, index) => (
                            <FormControlLabel
                              key={index}
                              value={item.name}
                              control={<Radio />}
                              label={item.label}
                            />
                          ))}
                        </RadioGroup>
                        <br />
                      </FormControl>
                    )}
                  </Grid> */}
                <CTAGrid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => planSelected(plan)}
                  >
                    {planContent.button_label}
                  </Button>
                </CTAGrid>
              </TicketCard>
            </Grid>
          );
        })}
      </Grid>
      {plans && (
        <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              (window.location.href = window.location.origin + "/dash/events")
            }
          >
            {i18n.language === "he" ? (
              <ArrowForwardIosIcon style={{ height: "12px", width: "12px" }} />
            ) : (
              <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />
            )}
            {t("order.back_to_event")}
          </Button>
        </Grid>
      )}
    </TicketGrid>
  );
}
