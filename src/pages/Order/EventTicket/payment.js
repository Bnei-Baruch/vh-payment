import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
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
const PaymentTile = styled.div`
  margin: 20px 0px;
  > span:first-child.left {
    font-size: 80px;
    border-left: 1px dashed #ccc;
    padding-left: 20px;
  }
  > span:first-child.right {
    font-size: 80px;
    border-right: 1px dashed #ccc;
    padding-right: 20px;
  }
  > span:last-child {
    padding-left: 10px;
  }
  > span.lightgrey:first-child {
    color: #777;
    font-size: 48px;
  }
  > span.lightgrey:last-child {
    color: #777;
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
const CardSummary = styled(Card)`
  padding: 20px;
  margin: 20px 0px;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
const CenteredItem = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderTitle = styled(Typography)`
  font-weight: normal;
`;

const ContentContainer = styled(Grid)`
  padding: 20px;
`;

const AmountSummary = styled.div`
  font-size: 48px;
  color: #1565c0;
  font-weight: 300;
  margin: 20px 0px;
`;

const Link = styled.a`
  color: rgba(21, 101, 192, 1);
  font-weight: bold;
`;

export default function Payment() {
  const classes = useStyles();
  const history = useHistory();
  const { event_slug } = useParams();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.user);
  const currency = useSelector((state) => state.currency);
  const selectedTicket = useSelector((state) => state.order.selectedTicket);
  const product = useSelector((state) => state.order.ticketProduct);

  const [loading, setLoading] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [payClicked, setOnPayClicked] = React.useState(false);
  const [profileData, setUserProfileData] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState("pelecard");
  const [termsAccepted, setTermsAccepted] = React.useState(false);

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
    if (product) {
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
      SKU: selectedTicket.product?.SKU,
      OrderLanguage: i18n.language?.toUpperCase(),
      Reference: selectedTicket.product?.reference,
      Organization: selectedTicket.product?.organization,
      UserKey: user.keycloak.subject,
      Currency: currency.id?.toUpperCase(),
      Amount: selectedTicket.price[currency.id]?.amount,
      // Amount: 1,
      Type: selectedTicket.product?.type,
      ProductType: selectedTicket.product?.productType,
      RecurringFreq: selectedTicket.product?.recurringFreq,
      successUrl: window.APP_CONFIG.VH_BASE_URL + `/pay/success/${event_slug}`,
      cancelUrl: window.APP_CONFIG.VH_BASE_URL,
      errorUrl: window.APP_CONFIG.VH_BASE_URL + "/pay/error",
    };
    handlePayment(data)
      .then((response) => {
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
      history.push(`/pay/order/ticket/payment/others/${event_slug}`);
    }
  };

  if (loading) return <Loader />;
  if (!loading && !product)
    return (
      <>
        <SomethingWentWrong />
      </>
    );

  let { content } = product;
  let event = content[i18n.language] ? content[i18n.language] : content.en;

  let paymentOption = selectedTicket.payment_options;
  const ticketContent =
    selectedTicket && selectedTicket.content[i18n.language]
      ? selectedTicket.content[i18n.language]
      : selectedTicket.content.en;

  return (
    <>
      <Grid item xs={12}>
        <br />
        <CenterText variant="h1">{event.title}</CenterText>
        <CenterTextGrey variant="h6">{event.subtitle}</CenterTextGrey>
      </Grid>
      <ContentLayout>
        {activeStep === 0 && (
          <ContentContainer container spacing={6}>
            <Grid item xs={12}>
              <HeaderTitle variant="h1">{ticketContent.name}</HeaderTitle>
              <PaymentTile>
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ marginBottom: "5px" }}>
                    {t("order.payMethod")}
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
                        label={
                          <CenteredItem>
                            <CreditCardIcon /> &nbsp;{" "}
                            {option.content[i18n.language].label}
                          </CenteredItem>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </PaymentTile>
              <PaymentTile>
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ marginBottom: "5px" }}>
                    {t("appbar.currency")}
                  </FormLabel>
                  <CurrencyPicker
                    variant="outlined"
                    style={{ minWidth: "300px" }}
                  />
                </FormControl>
              </PaymentTile>
              <PaymentTile>
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ marginBottom: "5px" }}>
                    {t("common.amount")}
                  </FormLabel>

                  <HeaderTitle variant="h2">
                    {currency.sign +
                      " " +
                      selectedTicket.price[currency.id]?.amount}
                  </HeaderTitle>
                </FormControl>
              </PaymentTile>
            </Grid>
          </ContentContainer>
        )}
        {activeStep === 1 && (
          <ContentContainer container spacing={6}>
            <Grid item xs={12}>
              <HeaderTitle variant="h1">{ticketContent.name}</HeaderTitle>
              <CardSummary>
                <CardContent>
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      style={{ marginBottom: "5px" }}
                    >
                      {t("common.amount")}
                    </FormLabel>
                  </FormControl>
                  <AmountSummary>
                    {currency.sign}
                    <span
                      style={{
                        fontSize: "64px",
                        marginLeft: "15px",
                        fontWeight: "normal",
                      }}
                    >
                      {selectedTicket.price[currency.id]?.amount}
                    </span>
                  </AmountSummary>
                  <CenteredItem>
                    <CreditCardIcon /> &nbsp; by &nbsp;
                    {
                      paymentOption.find((item) => item.name === paymentMethod)
                        ?.content[i18n.language]?.label
                    }
                  </CenteredItem>
                </CardContent>
              </CardSummary>
              <div>
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
                      I Agree with the{" "}
                      <Link href="/term_and_condition">
                        Terms and Conditions
                      </Link>
                    </span>
                  }
                />
              </div>
            </Grid>
          </ContentContainer>
        )}
        <ContentContainer
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 20px 20px 20px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={prevStep}
            disabled={payClicked}
          >
            <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />{" "}
            {t("common.back")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={payClicked || (activeStep === 1 && !termsAccepted)}
            onClick={activeStep === 1 ? proceedToPayment : nextStep}
          >
            {activeStep === 1 ? (
              payClicked ? (
                <>
                  {t("order.processing")}
                  &nbsp;
                  {payClicked ? (
                    <CircularProgress m={2} className={classes.loader} />
                  ) : (
                    <ArrowForwardIosIcon
                      style={{ height: "12px", width: "12px" }}
                    />
                  )}
                </>
              ) : (
                <>
                  {t("common.confirm")}
                  <ArrowForwardIosIcon
                    style={{ height: "12px", width: "12px" }}
                  />
                </>
              )
            ) : (
              <>
                {t("common.next")}{" "}
                <ArrowForwardIosIcon
                  style={{ height: "12px", width: "12px" }}
                />
              </>
            )}
          </Button>
        </ContentContainer>
      </ContentLayout>
    </>
  );
}
