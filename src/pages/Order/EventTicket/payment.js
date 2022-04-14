import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  CircularProgress,
  Stepper,
  Typography,
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
import HeaderLayout from "../../../layouts/HeaderLayout";
import { handlePayment } from "../../../services/orderservice";
import { getProfile } from "../../../services/userservice";
import Loader from "../../../components/Loader";
const PaymentTile = styled.div`
  padding: 20px 20px;
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
const SubText = styled.div`
  color: #777;
  padding: 0px 20px;
`;
const HeaderTitle = styled(Typography)`
  text-align: center;
`;
export default function Payment() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { event_slug } = useParams();
  const user = useSelector((state) => state.user);
  const [profileData, setUserProfileData] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState("pelecard");
  const [activeStep, setActiveStep] = React.useState(0);
  const [payClicked, setOnPayClicked] = React.useState(false);
  const currency = useSelector((state) => state.currency);
  const { dir } = useSelector(state => state.language);
  const selectedTicket = useSelector((state) => state.order.selectedTicket);
  const product = useSelector((state) => state.order.ticketProduct);
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
      //replace this with routing mechanism
      successUrl:
        window.APP_CONFIG.VH_BASE_URL +
        `/pay/order/register/${selectedTicket.name}/userdetail/${event_slug}`,
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

  if (!product) return <Loader />;
  let { content } = product;
  let event = content[i18n.language]
    ? content[i18n.language].title
    : content.en;

  let ticketDescription = selectedTicket.content ? selectedTicket.content[i18n.language].description : selectedTicket.content.en.description;
  let paymentOption = selectedTicket.payment_options;

  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        {event && (
          <>
            <HeaderTitle variant="h3">{event.title}</HeaderTitle> <br />
          </>
        )}
        <Stepper className={ dir === 'rtl' && classes.unaffectedrtl} activeStep={activeStep} alternativeLabel>
          {[
            t('payment.ticketStep1'),
            t('payment.step2'),
            t('payment.step3'),
          ].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubText>{t("common.amount")}</SubText>
              <PaymentTile>
                <span className={dir === 'ltr' ? 'left' : 'right' }>{selectedTicket.price[currency.id]?.amount}</span>
                <span>
                  {" "}
                  <CurrencyPicker />
                </span>
              </PaymentTile>
            </Grid>
            <Grid item xs={12}>
              <SubText>
                <ul style={{ padding: '0px 10px' }}>
                  {ticketDescription && ticketDescription.map(description => {
                    return <li>{description}</li>
                  })}
                </ul>
              </SubText>
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Grid style={{ padding: "20px" }}>
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
                    {paymentOption.map(option => (
                      <FormControlLabel
                        value={option.name}
                        control={<Radio />}
                        label={option.content[i18n.language].label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubText>{t("common.amount")}</SubText>
              <PaymentTile>
                <span class="lightgrey">
                  {selectedTicket.price[currency.id]?.amount}
                </span>
                <span class="lightgrey">{currency.id?.toUpperCase()}</span>
              </PaymentTile>
            </Grid>
            <Grid item xs={12}>
              <SubText>{t("common.paymentMethod")}</SubText>
              <PaymentTile>
                <span class="lightgrey">
                  {paymentOption.find(item => item.name === paymentMethod)?.content[i18n.language]?.label}
                </span>
              </PaymentTile>
            </Grid>
          </Grid>
        )}
        <Grid style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={payClicked}
            onClick={activeStep === 2 ? proceedToPayment : nextStep}
          >
            {activeStep === 2 ? (
              payClicked ? (
                <>
                  {payClicked && (
                    <CircularProgress m={2} className={classes.loader} />
                  )}
                  &nbsp;
                  {t("order.processing")}
                </>
              ) : (
                t("common.confirm")
              )
            ) : (
              t("common.next")
            )}
          </Button>
          &nbsp;&nbsp;
          {(
            <Button
              variant="contained"
              onClick={prevStep}
              disabled={payClicked}
            >
              {t("common.back")}
            </Button>
          )}
        </Grid>
      </ContentLayout>
    </>
  );
}
