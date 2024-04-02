import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Typography,
  Paper,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import CurrencyPicker from "../../../components/CurencyPicker";
import ContentLayout from "../../../layouts/ContentLayout";
import { getOrderByID, updateOrderById } from "../../../services/orderservice";
import { getMembershipProduct } from "../../../services/productservice";
import Loader from "../../../components/Loader";
import SomethingWentWrong from "../SomethingWentWrong";
import InfoIcon from "@material-ui/icons/Info";
import { currencies } from "../../../shared/currencies";
import { setCurrency } from "../../../redux/actions/currencyActions";
const FormContainer = styled(Grid)`
  & .MuiFormLabel-root {
    margin-bottom: 10px;
  }

  #standard-adornment-amount {
    width: 100%;
  }
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
const ElevatedContainer = styled(Paper)`
  padding: 15px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;
export default function UpdatePayment() {
  const { t } = useTranslation();
  const history = useHistory();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const currency = useSelector((state) => state.currency);
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [payClicked, setOnPayClicked] = React.useState(false);
  const [minAmount, setMinAmount] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [membership, setMembership] = React.useState(undefined);
  React.useEffect(() => {
    setMembership(getMembershipProduct());
  }, []);

  const UpdatePaymentDetails = () => {
    setOnPayClicked(true);
    //Update the Amount and currency
    updateOrderById(orderId, {
      Amount: amount,
      Currency: currency.id.toUpperCase(),
    })
      .then(() => {
        setOnPayClicked(false);
        history.push(`/pay/membership/payment/update/${orderId}/success`);
      })
      .catch((err) => {
        setOnPayClicked(false);
        console.error("update payment details", err)
      });
  };
  const backToMembership = () => {
    window.location.href = window.location.origin + "/dash/membership";
  };

  const getOrderDetailsById = () => {
    setLoading(false);
    getOrderByID(orderId)
      .then((res) => {
        setOrderDetails(res.data);
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    getOrderDetailsById();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (orderDetails) {
      setAmount(orderDetails.Amount);

      const cr = currencies.find(
        (l) => l.id === orderDetails.Currency.toLowerCase()
      );
      if (cr.id !== currency.id) {
        dispatch(setCurrency(cr));
      }
    }
    // eslint-disable-next-line
  }, [orderDetails]);

  React.useEffect(() => {
    if (membership) {
      const automatic = membership.plans.find(x => x.name === 'automatic')
      setAmount(automatic.price[currency.id].amount);
      setMinAmount(automatic.price[currency.id].amount);
    }
  }, [membership, currency])

  if (loading) return <Loader />;
  if (!loading && !orderDetails && false)
    return (
      <>
        <SomethingWentWrong isMembership={true} />
      </>
    );

  return (
    <>
      <ContentLayout>
        <FormContainer container spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {t("membership.update_automatic_subscription")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ElevatedContainer elevation={3}>
              <InfoIcon style={{ color: "#1976d2" }} /> &nbsp;{" "}
              <span>{t("membership.auto_subscription_description")}</span>
            </ElevatedContainer>
          </Grid>
          <Grid container item xs={12} spacing={6}>
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
                      {minAmount}
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
              onClick={backToMembership}
              disabled={payClicked}
            >
              {t("common.back")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={payClicked || amount < minAmount}
              onClick={UpdatePaymentDetails}
            >
              {t("common.update")}
            </Button>
          </Grid>
        </FormContainer>
      </ContentLayout>
    </>
  );
}
