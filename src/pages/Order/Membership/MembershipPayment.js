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
} from "@material-ui/core";
import React from "react";
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
const Link = styled.a`
  color: rgba(21, 101, 192, 1);
  font-weight: bold;
`;
const PaymentTile = styled.div`
  padding: 0px;
  > span:first-child.left {
    font-size: 32px;
    font-weight: 600;
  }
  > span:first-child.right {
    font-size: 80px;
    border-right: 1px dashed #ccc;
    padding-right: 20px;
  }
  > span.lightgrey:first-child {
    color: #777;
    font-size: 48px;
  }
  > span.lightgrey:last-child {
    color: #777;
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
const periods = [
  { value: 1, name: "1 month" },
  { value: 2, name: "2 month" },
  { value: 3, name: "3 month" },
  { value: 4, name: "4 month" },
  { value: 5, name: "5 month" },
  { value: 6, name: "6 month" },
  { value: 7, name: "7 month" },
  { value: 8, name: "8 month" },
  { value: 9, name: "9 month" },
  { value: 10, name: "10 months" },
  { value: 11, name: "11 months" },
  { value: 12, name: "12 months" },
];
export default function MembershipPayment() {
  const { t, i18n } = useTranslation();
  const { plan } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  const { dir } = useSelector((state) => state.language);
  const currency = useSelector((state) => state.currency);
  const selectedMembership = useSelector(
    (state) => state.order.selectedMembership
  );

  const [profileData, setUserProfileData] = React.useState(null);
  const [period, setPeriod] = React.useState(1);
  const [paymentMethod, setPaymentMethod] = React.useState("pelecard");
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [payClicked, setOnPayClicked] = React.useState(false);

  const nextStep = () => {
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
      Amount: selectedMembership.price[currency.id]?.amount,
      // Amount: 1,
      Type: selectedMembership.product?.type,
      ProductType: selectedMembership.product?.productType,
      RecurringFreq: selectedMembership.product?.recurringFreq,
      //replace this with routing mechanism
      successUrl:
        window.APP_CONFIG.VH_BASE_URL +
        `/pay/membership/payment/${selectedMembership.name}/success`,
      cancelUrl: window.APP_CONFIG.VH_BASE_URL,
      errorUrl: window.APP_CONFIG.VH_BASE_URL + "/pay/error",
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
    <ContentLayout>
      {event && (
        <>
          <HeaderTitle variant="h3">{event.title}</HeaderTitle> <br />
        </>
      )}
      {activeStep === 0 && (
        <Grid container spacing={3}>
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
                      value={option.name}
                      control={<Radio />}
                      label={option.content[i18n.language].label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  {t("common.period")}
                </FormLabel>
                <Select
                  value={period}
                  variant="outlined"
                  onChange={(event) => setPeriod(event.target.value)}
                >
                  {periods.map((l) => (
                    <MenuItem key={l.value} value={l.value}>
                      {l.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid>
                <div>{t("membership.pay_more_than_month")}</div>
              </Grid>
            </Grid>
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
                  <span className={dir === "ltr" ? "left" : "right"}>
                    <span
                      class="lightgrey"
                      style={{ textTransform: "uppercase" }}
                    >
                      {currency.sign}
                    </span>
                    {selectedMembership.price[currency.id]?.amount}
                  </span>
                </PaymentTile>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
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
              disabled={payClicked}
              onClick={nextStep}
            >
              {t("common.next")}
            </Button>
          </Grid>
        </Grid>
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
                      {currency.sign +
                        " " +
                        selectedMembership.price[currency.id].amount}
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
                    {paymentMethod}
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
                    {currency.sign}{" "}
                    {selectedMembership.price[currency.id].amount * period}
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: "right" }}>
                    {t("membership.total_to_pay")}
                  </Grid>
                </OrderFinal>
              </SummartyContainer>
            </ElevatedContainer>
          </Grid>
          <Grid item xs={12}>
            <ElevatedContainer elevation={3}>
              <InfoIcon style={{ color: "#1976d2" }} /> &nbsp;{" "}
              <span>
                {selectedMembership.name === "manual"
                  ? t("membership.manual_payment_confirmation_message")
                  : t("membership.auto_payment_confirmation_message")}
              </span>
            </ElevatedContainer>
          </Grid>
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
                disabled={payClicked}
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
  );
}
