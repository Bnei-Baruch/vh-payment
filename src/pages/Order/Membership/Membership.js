import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SelectElement from "../../../components/SelectElement";
import countries from "../../../shared/countries";
import { saveUserProfileData } from "../../../services/userservice";
import {
  setSelectedMembership,
  setSpecialSelectedOption,
  setMembershipProduct,
} from "../../../redux/actions/orderActions";
import { useMembershipProduct } from "../../../hooks/useMembershipProduct";
import { setCurrency } from "../../../redux/actions/currencyActions";
import { currencies } from "../../../shared/currencies";

import { useHistory } from "react-router-dom";
import Loader from "../../../components/Loader";
import SomethingWentWrong from "../SomethingWentWrong";
import PricingBreakdown from "./PricingBreakdown";
import FormattedAmount from "../../../components/FormattedAmount";

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
  const currency = useSelector((state) => state.currency);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const selectedMembership = useSelector(
    (state) => state.order.selectedMembership
  );
  const [specialOption, setSpecialOption] = React.useState("Help Haver");
  const { membershipProduct: membership, error: pricingError } = useMembershipProduct();
  const [formulaAnchor, setFormulaAnchor] = React.useState(null);
  const keycloakSubject = useSelector((state) => state.user.keycloak?.subject);
  const [selectedCountry, setSelectedCountry] = React.useState("");

  useEffect(() => {
    const { plans } = membership || { plans: [] };
    const planCurrencies = new Set();
    plans.forEach((plan) => {
      for (const cur of Object.keys(plan.price)) {
        planCurrencies.add(cur);
      }
    });
    // Auto-detect currency from backend response
    if (planCurrencies.size && !planCurrencies.has(currency.id)) {
      const cr = currencies.find((l) => l.id === planCurrencies.values().next().value);
      dispatch(setCurrency(cr));
    }
  }, [dispatch, currency, membership]);


  const handleConfirmCountry = async () => {
    await saveUserProfileData({ keycloak_id: keycloakSubject, country: selectedCountry });
    dispatch(setMembershipProduct(undefined));
  };

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

  if (pricingError) {
    return <SomethingWentWrong details={pricingError} />;
  }

  if (!membership) return <Loader />;

  const needsCountrySelection = membership.pricingVersion !== "v1" && !membership.v2Details?.country_code;
  const { content, plans } = membership;
  const header =
    typeof content[i18n.language] !== "undefined"
      ? content[i18n.language]
      : content["en"];
  return (
    <TicketGrid container spacing={6}>
      <Grid item xs={12}>
        <br />
        <Typography variant="h3">{needsCountrySelection ? t("membership.select_country_to_continue") : header.title}</Typography>
        <CenterTextGrey variant="h6">{header.subtitle}</CenterTextGrey>
        <br />
        <CenterText variant="h6">{header.action}</CenterText>
      </Grid>
      {errorMessage && (
        <Grid item xs={12}>
          <div style={{ color: "red" }}>{errorMessage}</div>
        </Grid>
      )}
      {needsCountrySelection ? (
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Box style={{ maxWidth: 400, width: "100%", direction: "ltr" }}>
            <SelectElement
              id="country-select"
              label={t("membership.country")}
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              selectData={countries}
            />
          </Box>
        </Grid>
      ) : (
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
                      {
                        currency.id in plan.price ?
                        <FormattedAmount amount={plan.price[currency.id].amount} currency={currency} /> : ""
                      }
                      {" "}
                      <TenureText>{t("common.per_month")}</TenureText>
                      {membership.pricingVersion !== "v1" && membership.v2Details && (
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); setFormulaAnchor(e.currentTarget); }}
                          style={{ padding: 2, color: "#888", verticalAlign: "middle" }}
                        >
                          <InfoOutlinedIcon style={{ fontSize: 16 }} />
                        </IconButton>
                      )}
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
      )}
      <Grid item xs={12} style={{ display: "flex", gap: 16 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            (window.location.href = window.location.origin + "/dash/membership")
          }
        >
          {t("membership.back_to_status")}
        </Button>
        {needsCountrySelection && (
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedCountry}
            onClick={handleConfirmCountry}
          >
            {t("common.confirm")}
          </Button>
        )}
      </Grid>

      <Popover
        open={Boolean(formulaAnchor)}
        anchorEl={formulaAnchor}
        onClose={() => setFormulaAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box p={2} style={{ minWidth: 220 }}>
          <Typography variant="subtitle2" style={{ fontWeight: 700, marginBottom: 8 }}>
            {t("membership.pricing_breakdown")}
          </Typography>
          {membership.v2Details && <PricingBreakdown v2Details={membership.v2Details} />}
        </Box>
      </Popover>
    </TicketGrid>
  );
}
