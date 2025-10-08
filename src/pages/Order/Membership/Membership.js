import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setSelectedMembership,
  setSpecialSelectedOption,
} from "../../../redux/actions/orderActions";
import { useHistory } from "react-router-dom";
import { getMembershipProduct } from "../../../services/productservice";
import Loader from "../../../components/Loader";
const TicketCard = styled(Grid)`
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  padding: 20px;
  min-height: 300px;
  position: relative;

  @media (max-width: 960px) {
    margin: auto;
  }
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

const Description = styled.div`
  text-align: center;
  margin-top: 20px;
  line-height: 24px;
`;
const CenterText = styled(Typography)`
  text-align: center;
`;
const CenterTextGrey = styled(Typography)`
  font-weight: normal !important;
  color: #777777;
`;
const CurrencyText = styled(Typography)`
  font-weight: 500 !important;
  color: #2f6dc7;
  text-align: center;
`;
const TenureText = styled.span`
  font-size: 16px;
`;
const CTAGrid = styled(Grid)`
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0%);

  > button {
    background-color: #2f6dc7 !important;
  }
`;

const selectedStyle = {
  border: "2px solid #00bcd4",
};

const blurredStyle = {
  // opacity: "0.3",
};

export default function Membership() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const keycloak = useSelector((state) => state.user.keycloak);
  const currency = useSelector((state) => state.currency);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const selectedMembership = useSelector(
    (state) => state.order.selectedMembership
  );
  const [specialOption, setSpecialOption] = React.useState("Help Haver");
  const [membership, setMembership] = React.useState(undefined);
  React.useEffect(() => {
    const fetch = async () => {
      setMembership(await getMembershipProduct(keycloak.subject));
    };
    if (keycloak) {
      fetch();
    }
  }, [keycloak]);

  const planSelected = (membership) => {
    dispatch(setSelectedMembership(membership));
    navigateToConfirmation(membership);
  };

  const navigateToConfirmation = (membership) => {
    if (membership.flow.type === "redirect") {
      if (specialOption === "") {
        setErrorMessage(t("errorMessage.pleaseSelectOption"));
        return "";
      }
      const selectedOption =
        membership.content[i18n.language] || membership.content.en;
      dispatch(setSpecialSelectedOption(selectedOption));
      history.push(
        `/pay/order/membership/payment/intersticial/${membership.name}?isMembership=true`
      );
    } else if (membership.flow.type === "checkout") {
      history.push("/pay/membership/payment/" + membership.name);
    }
  };
  if (!membership) return <Loader />;

  const { content, plans } = membership;
  const header =
    typeof content[i18n.language] !== "undefined"
      ? content[i18n.language]
      : content["en"];
  return (
    <TicketGrid container spacing={6}>
      <Grid item xs={12}>
        <br />
        <Typography variant="h3">{header.title}</Typography>
        <CenterTextGrey variant="h6">{header.subtitle}</CenterTextGrey>
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
            <Grid key={index} item xs={12} md={4}>
              <TicketCard
                style={
                  selectedMembership !== undefined
                    ? selectedMembership === plan
                      ? selectedStyle
                      : blurredStyle
                    : {}
                }
              >
                <CenterText variant="h1">{planContent.name}</CenterText>
                <br />
                <CurrencyText variant="h2">
                  {plan.isFree ? (
                    t("help.financial_help")
                  ) : (
                    <>
                      {" "}
                      {currency.sign +
                        " " +
                        plan.price[currency.id].amount +
                        " "}{" "}
                      <TenureText>{t("common.per_month")}</TenureText>
                    </>
                  )}
                </CurrencyText>
                <Grid>
                  {planContent &&
                    planContent.description &&
                    planContent.description.length > 0 && (
                      <Description>{planContent.description}</Description>
                    )}
                </Grid>
                <Grid>
                  {planContent.options && (
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {t("common.select_option")}
                      </FormLabel>
                      <RadioGroup
                        aria-label="special"
                        name="special"
                        value={specialOption}
                        onChange={(e) => setSpecialOption(e.target.value)}
                        style={{ flexDirection: "row" }}
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
                  <Button
                    style={{ width: "90%" }}
                    variant="contained"
                    color="secondary"
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
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            (window.location.href = window.location.origin + "/dash/membership")
          }
        >
          {t("membership.back_to_status")}
        </Button>
      </Grid>
    </TicketGrid>
  );
}
