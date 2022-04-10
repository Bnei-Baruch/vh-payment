import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStyles } from '../index';
import styled from "styled-components";
import CurrencyPicker from "../../../components/CurencyPicker";
import ContentLayout from "../../../layouts/ContentLayout";
import HeaderLayout from "../../../layouts/HeaderLayout";
import { handlePayment } from "../../../services/orderservice";
import { getProfile } from "../../../services/userservice";
const PaymentTile = styled.div`
  padding: 20px 20px;
  > span:first-child {
    font-size: 80px;
    border-left: 1px dashed #ccc;
    padding-left: 20px;
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
export default function MembershipPayment() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const { plan } = useParams();
  const user = useSelector((state) => state.user);
  const [profileData, setUserProfileData] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState("pelecard");
  const [activeStep, setActiveStep] = React.useState(0);
  const [payClicked, setOnPayClicked] = React.useState(false);
  const currency = useSelector((state) => state.currency);
  const selectedMembership = useSelector(
    (state) => state.order.selectedMembership
  );
  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const prevStep = () => {
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
      successUrl: window.APP_CONFIG.VH_BASE_URL + `/pay/membership/payment/${selectedMembership.name}/success`,
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
      history.push(`/pay/order/ticket/payment/others/${plan}?isMembership=true`);
    }
  };

  if (!selectedMembership) return <></>;
  let { content } = selectedMembership;
  let event = content[i18n.language]
    ? content[i18n.language].title
    : content.en;
  let membershipDescription = selectedMembership.content ? selectedMembership.content[i18n.language].description : selectedMembership.content.en.description;
  let paymentOption = selectedMembership.payment_options;
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        {event && (
          <>
            <HeaderTitle variant="h3">{event.title}</HeaderTitle> <br />
          </>
        )}
        <Stepper activeStep={activeStep} alternativeLabel>
          {[t('payment.membershipStep1'), t('payment.step2'), t('payment.step3')].map((label) => (
            <Step key={label}>
              <StepLabel>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubText>{t("common.amount")}</SubText>
              <PaymentTile>
                <span>{selectedMembership.price[currency.id]?.amount}</span>
                <span>
                  {" "}
                  <CurrencyPicker />
                </span>
              </PaymentTile>
            </Grid>
            <Grid item xs={12}>
              <SubText>
                <ul style={{ padding: '0px 10px' }}>
                  {membershipDescription && membershipDescription.map(description => {
                    return <li>{description}</li>
                  })}
                </ul>
              </SubText>
              <br />
              <br />
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
                  {selectedMembership.price[currency.id]?.amount}
                </span>
                <span class="lightgrey" style={{ textTransform: "uppercase" }}>
                  {currency.id?.toUpperCase()}
                </span>
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
                  )}&nbsp;
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
          {activeStep !== 0 && (
            <Button variant="contained" onClick={prevStep} disabled={payClicked}>
              {activeStep === 0 ? t("common.cancel") : t("common.back")}
            </Button>
          )}
        </Grid>
      </ContentLayout>
    </>
  );
}
