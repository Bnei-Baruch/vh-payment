import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getEventsProductBySlug } from "../../../services/productservice";
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

  @media (min-width: 768px) {
    max-width: 350px;
  }
`;
const Price = styled.div`
  color: #3376d6;
  font-weight: bold;
`;
const TicketGrid = styled(Grid)`
  margin: auto;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 80%;
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

  const product = useSelector((state) => state.order.ticketProduct);
  const currency = useSelector((state) => state.currency);
  const membershipData = useSelector((state) => state.user.membershipdata);

  const [specialOption, setSpecialOption] = React.useState("helphaver");
  const [errorMessage, setErrorMessage] = React.useState(undefined);

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
    if (name === "special") {
      if (specialOption === "") {
        setErrorMessage(t("errorMessage.pleaseSelectOption"));
        return "";
      }
      const content = ticket.content[i18n.language] || ticket.content.en;
      const selectedOption = content.options.find(
        (item) => item.name === specialOption
      );
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(`/pay/order/ticket/payment/intersticial/${event_slug}`);
    } else if (name === "membership" && membershipData?.membership !== true) {
      const selectedOption = ticket.content[i18n.language] || ticket.content.en;
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(`/pay/order/ticket/payment/intersticial/${event_slug}`);
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
    <TicketGrid container spacing={6}>
      <Grid item xs={12}>
        <br />
        <CenterText variant="h1">{header.title}</CenterText>
        <CenterTextGrey variant="h6">{header.subtitle}</CenterTextGrey>
        <br />
        <br />
        <CenterText variant="h6">{header.action}</CenterText>
      </Grid>
      {errorMessage && (
        <Grid item xs={12}>
          <div style={{ color: "red" }}>{errorMessage}</div>
        </Grid>
      )}
      <Grid container item xs={12} spacing={6}>
        {plans.map((plan, index) => {
          const planContent =
            typeof plan.content[i18n.language] !== "undefined"
              ? plan.content[i18n.language]
              : plan.content["en"];
          return (
            <Grid key={index} item xs={12} md={6}>
              <TicketCard
                style={index % 2 === 0 ? marginLeftAuto : marginRightAuto}
              >
                <CenterText variant="h2" style={{ fontWeight: "bold" }}>
                  {planContent.name}
                </CenterText>
                <br />
                <br />
                <CenterText variant="h2">
                  <Price>
                    {currency.sign + " " + plan.price[currency.id].amount}
                  </Price>
                </CenterText>
                <Grid>
                  {planContent &&
                    planContent.description &&
                    planContent.description.length > 0 && (
                      <ul>
                        {planContent.description.map((item, index) => (
                          <li key={index}>
                            <Typography variant="body1">{item}</Typography>
                          </li>
                        ))}
                      </ul>
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
    </TicketGrid>
  );
}
