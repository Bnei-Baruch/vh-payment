import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import HeaderLayout from "../../../layouts/HeaderLayout";
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
  max-width: 500px;
  padding: 20px;
`;
const TicketGrid = styled(Grid)`
  margin: auto;
  max-width: 80%;

  ul {
    padding-left: 20px;
    & > li {
      padding: 10px 0px;
    }
  }
`;
const CenterText = styled(Typography)`
  text-align: center;
`;
const CenterTextGrey = styled(Typography)`
  text-align: center;
  color: #777777;
`;
const CTAGrid = styled(Grid)`
  text-align: center;
`;

const selectedStyle = {
  border: "2px solid #00bcd4",
};

const blurredStyle = {
  // opacity: "0.3",
};

export default function Tickets() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { event_slug } = useParams();
  const product = useSelector((state) => state.order.ticketProduct);
  const currency = useSelector((state) => state.currency);
  const selectedTicket = useSelector((state) => state.order.selectedTicket);
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
    if (name === 'special') {
      if (specialOption === '') {
        setErrorMessage(t('errorMessage.pleaseSelectOption'));
        return '';
      }
      const content =
        selectedTicket.content[i18n.language] || selectedTicket.content.en;
      const selectedOption = content.options.find(
        (item) => item.name === specialOption
      );
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(`/pay/order/ticket/payment/intersticial/${event_slug}`);
    } else if (name === "membership" && membershipData?.membership !== true) {
      const selectedOption =
        selectedTicket.content[i18n.language] || selectedTicket.content.en;
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(`/pay/order/ticket/payment/intersticial/${event_slug}`);
      return;
    } else {
      history.push(`/pay/order/ticket/payment/${event_slug}`);
    }
  };
  if (!product) return <Loader />;

  const getPlansInSortedFormat = (plans) => {
    let plan = plans.filter(
      (plan) => plan.membership === membershipData?.membership
    );
    return plan.sort((a, b) => parseInt(a.order) - parseInt(b.order));
  }

  const { content } = product;
  let plans = getPlansInSortedFormat(product.plans);
  const header =
    typeof content[i18n.language] !== "undefined"
      ? content[i18n.language]
      : content["en"];
  return (
    <>
      <HeaderLayout />
      <TicketGrid container spacing={6}>
        <Grid item xs={12}>
          <br />
          <CenterText variant="h1">{header.title}</CenterText>
          <CenterTextGrey variant="h6">{header.subtitle}</CenterTextGrey>
          <br />
          <Divider />
          <br />
          <CenterText variant="h6">{header.action}</CenterText>
        </Grid>
        {errorMessage && <Grid item xs={12}>
          <div style={{ color: 'red' }}>{errorMessage}</div>
        </Grid>}
        <Grid container item xs={12} spacing={6}>
          {plans.map((plan, index) => {
            const planContent =
              typeof plan.content[i18n.language] !== "undefined"
                ? plan.content[i18n.language]
                : plan.content["en"];
            return (
              <Grid key={index} item xs={12} md={4}>
                <TicketCard
                  style={
                    selectedTicket !== undefined
                      ? selectedTicket === plan
                        ? selectedStyle
                        : blurredStyle
                      : {}
                  }
                >
                  <CenterText variant="h1">{planContent.name}</CenterText>
                  <br />
                  <Divider />
                  <br />
                  <CenterTextGrey variant="h2">
                    {currency.sign + " " + plan.price[currency.id].amount}
                  </CenterTextGrey>
                  <Grid>
                    {planContent && planContent.description && planContent.description.length > 0 && <ul>
                      {planContent.description.map((item, index) => (
                        <li key={index}>
                          <Typography variant="body1">{item}</Typography>
                        </li>
                      ))}
                    </ul>}
                  </Grid>
                  <Grid>
                    {planContent.options && (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">{t('common.select_option')}</FormLabel>
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
                  </Grid>
                  <CTAGrid>
                    {(
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => planSelected(plan)}
                      >
                        {planContent.button_label}
                      </Button>
                    )}

                  </CTAGrid>
                </TicketCard>
              </Grid>
            );
          })}
        </Grid>
      </TicketGrid>
    </>
  );
}
