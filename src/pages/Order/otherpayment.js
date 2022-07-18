import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useStyles } from "./index";
import ContentLayout from "../../layouts/ContentLayout";
import { handlePayment } from "../../services/orderservice";
import { getProfile } from "../../services/userservice";
import { useHistory } from "react-router-dom";
import { getQueryParams } from "../../utils/common";
const HeaderTitle = styled(Typography)`
  text-align: center;
`;
export default function OtherPayment() {
  const classes = useStyles();
  const history = useHistory();
  let isMembership = getQueryParams("isMembership");
  const { t, i18n } = useTranslation();
  const { event_slug } = useParams();
  const [payClicked, setOnPayClicked] = React.useState(false);
  const user = useSelector((state) => state.user);
  const [profileData, setUserProfileData] = React.useState(null);
  const currency = useSelector((state) => state.currency);
  const selectedTicket = useSelector((state) => state.order.selectedTicket);
  const selectedMembership = useSelector(
    (state) => state.order.selectedMembership
  );
  const [selectedPaymentType, setSelectedPaymentType] =
    React.useState("offlinebank");
  const [extraInfo, setExtraInfo] = React.useState("");
  const saveDetail = (e) => {
    e.preventDefault();
    handlePay();
  };
  const getUserProfileData = async () => {
    if (user && user.keycloak && user.keycloak.subject) {
      const userProfileData = await getProfile(user.keycloak.subject);
      setUserProfileData(userProfileData);
    }
  };

  React.useEffect(() => {
    getUserProfileData();
    // eslint-disable-next-line
  }, []);

  const handlePay = async () => {
    setOnPayClicked(true);
    const ticketObject = isMembership ? selectedMembership : selectedTicket;
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
      SKU: ticketObject.product?.SKU,
      OrderLanguage: i18n.language?.toUpperCase(),
      Reference: ticketObject.product?.reference,
      Organization: ticketObject.product?.organization,
      UserKey: user.keycloak.subject,
      Currency: currency.id?.toUpperCase(),
      Amount: ticketObject.price[currency.id]?.amount,
      // Amount: 1,
      Type: ticketObject.product?.type,
      ProductType: ticketObject.product?.productType,
      RecurringFreq: ticketObject.product?.recurringFreq,
      PaymentType: "manual",
      PaymentMethod: selectedPaymentType,
      ExtraInfo: extraInfo,
      //replace this with routing mechanism
      successUrl: isMembership
        ? window.APP_CONFIG.VH_BASE_URL +
          `/pay/membership/payment/${event_slug}/success?help=true`
        : window.APP_CONFIG.VH_BASE_URL +
          `/pay/order/register/${ticketObject.name}/userdetail/${event_slug}`,
      cancelUrl: window.APP_CONFIG.VH_BASE_URL,
      errorUrl: window.APP_CONFIG.VH_BASE_URL + "/pay/error",
    };
    handlePayment(data)
      .then(() => {
        if (isMembership) {
          history.push(
            `/pay/membership/payment/${event_slug}/success?help=true`
          );
          return;
        }
        history.push(
          `/pay/order/register/${selectedTicket.name}/userdetail/${event_slug}?ManualPayment=true`
        );
      })
      .catch(() => {
        setOnPayClicked(false);
      });
  };
  return (
    <ContentLayout>
      <HeaderTitle variant="h3">
        {t("otherPayments.paymentDetails")}
      </HeaderTitle>{" "}
      <br />
      <Divider /> <br />
      <form onSubmit={saveDetail}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {t("otherPayments.howAreYouPaying")}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedPaymentType}
                name="radio-buttons-group"
                onChange={(e) => setSelectedPaymentType(e.target.value)}
              >
                <FormControlLabel
                  value="offlinebank"
                  control={<Radio />}
                  label={t("otherPayments.offlineBank")}
                />
                <FormControlLabel
                  value="localGroup"
                  control={<Radio />}
                  label={t("otherPayments.localGroup")}
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label={t("otherPayments.incash")}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={t("common.other")}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {t("otherPayments.doYouHaveAReciept")}
              </FormLabel>
              <br />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="contained" color="primary" component="span">
                  {t("common.upload")}
                </Button>
              </label>
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              multiline
              label={t("otherPayments.extraInformation")}
              variant="outlined"
              fullWidth
              required
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button
              disabled={payClicked}
              variant="contained"
              color="primary"
              type={"submit"}
            >
              {payClicked && (
                <CircularProgress m={2} className={classes.loader} />
              )}
              {t("common.confirm")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </ContentLayout>
  );
}
