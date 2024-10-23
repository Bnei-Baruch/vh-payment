import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  CircularProgress,
  Typography,
  Paper,
  Checkbox,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStyles } from "../index";
import styled from "styled-components";
import CurrencyPicker from "../../../components/CurencyPicker";
import ContentLayout from "../../../layouts/ContentLayout";
import { handlePayment } from "../../../services/orderservice";
import { getProfile } from "../../../services/userservice";
import Loader from "../../../components/Loader";
import SomethingWentWrong from "../SomethingWentWrong";
import InfoIcon from "@material-ui/icons/Info";
const FormContainer = styled(Grid)`
  & .MuiFormLabel-root {
    margin-bottom: 10px;
  }

  #standard-adornment-amount {
    width: 100%;
  }
`;
const MainTitle = styled.div`
  margin: 20px 0px 0px 0px;
  text-align: center;
  font-weight: bold;
`;
const Link = styled.a`
  color: rgba(21, 101, 192, 1);
  font-weight: bold;
`;
const PaymentTile = styled.div`
  padding: 0px;
  display: flex;
  align-items: baseline;
  span {
    padding: 5px 10px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 10px;
    cursor: pointer;
  }
  span {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }
  span.grey {
    background-color: #9b9b9b;
    color: #fff;
    cursor: not-allowed;
  }
  span.regular {
    background-color: rgba(21, 101, 192, 1);
    color: #fff;
  }

  input {
    width: 50px;
  }
`;
const HeaderTitle = styled(Typography)`
  text-align: center;
`;

const ElevatedContainer = styled(Paper)`
  padding: 15px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const ConfirmGrid = styled(Grid)`
  width: 60%;
  margin: auto;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const SummartyContainer = styled(Grid)`
  padding: 20px;
`;

const SummaryCurrency = styled.span`
  font-size: 34px;
  color: rgba(21, 101, 192, 1);
`;

const OrderSummary = styled(Grid)`
  padding: 20px 0px;
`;

const OrderFinal = styled(Grid)`
  padding: 20px 0px;
  display: flex;
  align-items: center;
  border-top: 1px solid #dcdcdc;
`;

const Summarylabel = styled(Grid)`
  color: #5a5a5a;
`;

const SummaryGrid = styled(Grid)`
  padding: 5px 0px;
`;
export default function MembershipPayment() {
  const { t, i18n } = useTranslation();
  const { plan } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  const currency = useSelector((state) => state.currency);
  const selectedMembership = useSelector(
    (state) => state.order.selectedMembership
  );

  const periods = [
    { value: 1, name: "1" },
    { value: 2, name: "2" },
    { value: 3, name: "3" },
    { value: 4, name: "4" },
    { value: 5, name: "5" },
    { value: 6, name: "6" },
    { value: 7, name: "7" },
    { value: 8, name: "8" },
    { value: 9, name: "9" },
    { value: 10, name: "10" },
    { value: 11, name: "11" },
    { value: 12, name: "12" },
  ];

  const [profileData, setUserProfileData] = React.useState(null);
  const [period, setPeriod] = React.useState();
  const [paymentMethod, setPaymentMethod] = React.useState("pelecard");
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [payClicked, setOnPayClicked] = React.useState(false);
  const [minAmount, setMinAmount] = React.useState(0);
  const [nextClicked, setNextAmount] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const totalToPay = useMemo(
    () => (selectedMembership.name === "manual" ? amount * period : amount),
    [amount, period, selectedMembership.name]
  );

  const nextStep = () => {
    setNextAmount(true);
    if (
      activeStep === 0 &&
      (amount < minAmount || (selectedMembership.name === "manual" && !period))
    ) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const prevStep = () => {
    if (activeStep === 0) {
      history.goBack();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getUserProfileData = async () => {
    if (user && user.keycloak && user.keycloak.subject) {
      const userProfileData = await getProfile(user.keycloak.subject);
      setUserProfileData(userProfileData);
    }
  };

  React.useState(() => {
    if (selectedMembership) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  const handlePay = async () => {
    setOnPayClicked(true);
    const data = {
      // Account details
      AccountID: "-",
      FirstName: user.profile.firstName,
      LastName: user.profile.lastName,
      Email: user.profile.email,
      Phone: profileData?.mobile_number || "",
      Street: profileData?.street_address || "",
      City: profileData?.city || "",
      Postcode: profileData?.postal_code || "",
      State: profileData?.state_region || "",
      Country: profileData?.country || "",

      //Product details
      SKU: selectedMembership.product?.SKU,
      OrderLanguage: i18n.language?.toUpperCase(),
      Reference: selectedMembership.product?.reference,
      Organization: selectedMembership.product?.organization,
      UserKey: user.keycloak.subject,
      Currency: currency.id?.toUpperCase(),
      Amount: totalToPay,
      AmountItem: amount,
      Quantity: period,
      TerminalId: selectedMembership.TerminalId,
      // Amount: 1,
      Type: selectedMembership.product?.type,
      ProductType: selectedMembership.product?.productType,
      RecurringFreq: selectedMembership.product?.recurringFreq,
      //replace this with routing mechanism
      successUrl: window.APP_CONFIG.VH_BASE_URL + `/pay/success/membership`,
      cancelUrl: window.APP_CONFIG.VH_BASE_URL + "/payment/membership/cancel",
      errorUrl: window.APP_CONFIG.VH_BASE_URL + "/payment/membership/error",
    };
    handlePayment(data)
      .then((response) => {
        setOnPayClicked(false);
        window.location.href = response.data.url;
      })
      .catch((error) => {
        setOnPayClicked(false);
        console.error(error);
      });
  };

  React.useEffect(() => {
    getUserProfileData();
    // eslint-disable-next-line
  }, []);

  const proceedToPayment = () => {
    if (paymentMethod === "pelecard") {
      handlePay();
    } else {
      history.push(
        `/pay/order/ticket/payment/others/${plan}?isMembership=true`
      );
    }
  };

  React.useEffect(() => {
    if (selectedMembership && selectedMembership.price[currency.id]?.amount) {
      setAmount(selectedMembership.price[currency.id]?.amount);
      setMinAmount(selectedMembership.price[currency.id]?.amount);
    }
    // eslint-disable-next-line
  }, [currency]);

  if (loading) return <Loader />;
  if (!loading && !selectedMembership)
    return (
      <>
        <SomethingWentWrong isMembership={true} />
      </>
    );
  let { content } = selectedMembership;
  let event = content[i18n.language]
    ? content[i18n.language].title
    : content.en;
  let paymentOption = selectedMembership.payment_options;

  return (
    <>
      <MainTitle>
        {activeStep === 0
          ? t("membership.title")
          : t("membership.confirmation")}
      </MainTitle>
      <ContentLayout>
        {event && (
          <>
            <HeaderTitle variant="h3">{event.title}</HeaderTitle> <br />
          </>
        )}
        {activeStep === 0 && (
          <FormContainer container spacing={6}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {" "}
                {selectedMembership.name === "manual"
                  ? t("membership.monthly_manual_subscription")
                  : t("membership.monthly_auto_subscription")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ElevatedContainer elevation={3}>
                <InfoIcon style={{ color: "#1976d2" }} /> &nbsp;{" "}
                <span>
                  {selectedMembership.name === "manual"
                    ? t("membership.manual_subscription_description")
                    : t("membership.auto_subscription_description")}
                </span>
              </ElevatedContainer>
            </Grid>
            <Grid container item xs={12} spacing={6}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    {t("common.paymentMethod")}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="creditcard"
                    name="radio-buttons-group"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {paymentOption.map((option) => (
                      <FormControlLabel
                        key={option.name}
                        value={option.name}
                        control={<Radio />}
                        label={option.content[i18n.language].label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              {selectedMembership.name === "manual" && (
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      {t("common.period")}
                    </FormLabel>
                    <Select
                      value={period}
                      variant="outlined"
                      error={!period && nextClicked}
                      onChange={(event) => setPeriod(event.target.value)}
                    >
                      {periods.map((l) => (
                        <MenuItem key={l.value} value={l.value}>
                          {l.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText id="filled-weight-helper-text">
                      {t("membership.pay_more_than_month")}
                    </FormHelperText>
                  </FormControl>
                  <Grid>
                    <div></div>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    {t("common.currency")}
                  </FormLabel>
                  <CurrencyPicker variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    {t("common.amount")}
                  </FormLabel>
                  <PaymentTile>
                    <span
                      className={amount <= minAmount ? "grey" : "regular"}
                      onClick={() => {
                        if (amount > minAmount) {
                          setAmount(amount - 1);
                        }
                      }}
                    >
                      -
                    </span>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        id="standard-adornment-amount"
                        value={amount}
                        fullWidth
                        inputProps={{
                          fullWidth: true,
                        }}
                        type="number"
                        error={amount < minAmount}
                        onChange={(event) => {
                          if (!isNaN(parseInt(event.target.value))) {
                            setAmount(parseInt(event.target.value));
                          } else {
                            setAmount("");
                          }
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            {currency?.sign || "$"}
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id="filled-weight-helper-text">
                        {t("membership.pay_more_than")} {currency.sign}
                        {selectedMembership.price[currency.id]?.amount}
                      </FormHelperText>
                    </FormControl>
                    <span
                      className="regular"
                      onClick={() => setAmount(amount + 1)}
                    >
                      +
                    </span>
                  </PaymentTile>
                  <div></div>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                marginTop: "25px",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                onClick={prevStep}
                disabled={payClicked}
              >
                {t("common.back")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={payClicked || amount < minAmount}
                onClick={nextStep}
              >
                {t("common.next")}
              </Button>
            </Grid>
          </FormContainer>
        )}
        {activeStep === 1 && (
          <ConfirmGrid container spacing={3}>
            <Grid item xs={12}>
              <ElevatedContainer elevation={3}>
                <SummartyContainer container>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      {selectedMembership.name === "manual"
                        ? t("membership.monthly_manual_subscription")
                        : t("membership.monthly_auto_subscription")}
                    </Typography>
                  </Grid>
                  <OrderSummary container item xs={12}>
                    <Grid item xs={12}>
                      <SummaryCurrency>
                        {currency.sign + " " + amount}
                      </SummaryCurrency>{" "}
                      / {t("common.month")}
                    </Grid>
                  </OrderSummary>
                  <SummaryGrid container item xs={12}>
                    <Summarylabel item xs={4}>
                      {t("membership.period")} :{" "}
                    </Summarylabel>{" "}
                    <Grid item xs={8}>
                      {" "}
                      {period} {t("common.month")}
                    </Grid>
                  </SummaryGrid>
                  <SummaryGrid container item xs={12}>
                    <Summarylabel item xs={4}>
                      {t("membership.method")} :{" "}
                    </Summarylabel>
                    <Grid item xs={8}>
                      {
                        paymentOption.find(
                          (item) => item.name === paymentMethod
                        ).content[i18n.language].label
                      }
                    </Grid>
                  </SummaryGrid>
                  {selectedMembership && (
                    <SummaryGrid
                      container
                      item
                      xs={12}
                      style={{ marginBottom: "20px" }}
                    >
                      <Summarylabel item xs={4}>
                        {t("membership.type")} :{" "}
                      </Summarylabel>
                      <Grid item xs={8}>
                        {selectedMembership.name.toUpperCase()}
                      </Grid>
                    </SummaryGrid>
                  )}

                  <OrderFinal container item xs={12}>
                    <Grid
                      item
                      xs={6}
                      style={{ fontSize: "44px", color: "#2F6DC7" }}
                    >
                      {currency.sign} {totalToPay}
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "right" }}>
                      {t("membership.total_to_pay")}
                    </Grid>
                  </OrderFinal>
                </SummartyContainer>
              </ElevatedContainer>
            </Grid>
            {selectedMembership.name === "automatic" && (
              <Grid item xs={12}>
                <ElevatedContainer elevation={3}>
                  <InfoIcon style={{ color: "#1976d2" }} /> &nbsp;{" "}
                  <span>
                    {t("membership.auto_payment_confirmation_message")}
                  </span>
                </ElevatedContainer>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    name="termsAccepted"
                    color="primary"
                  />
                }
                label={
                  <span>
                    {t("payment.i_agree")}{" "}
                    <Link
                      href={`https://kli.one/terms?lang=${
                        i18n.language !== "he" ? i18n.language : "il"
                      }`}
                      target="_blank"
                    >
                      {t("payment.terms_and_conditions")}
                    </Link>
                  </span>
                }
              />
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  onClick={proceedToPayment}
                  variant="contained"
                  color="primary"
                  disabled={!termsAccepted || payClicked}
                >
                  {payClicked ? (
                    <>
                      {payClicked && (
                        <CircularProgress m={2} className={classes.loader} />
                      )}
                      &nbsp;
                      {t("order.processing")}
                    </>
                  ) : (
                    t("common.confirm")
                  )}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={prevStep}
                  disabled={payClicked}
                >
                  {t("common.back")}
                </Button>
              </Grid>
            </Grid>
          </ConfirmGrid>
        )}
      </ContentLayout>
    </>
  );
}
