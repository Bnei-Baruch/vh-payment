import React, {useEffect, useState} from 'react';
import logo from '../images/logo-tree.png'
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';
import {connect, useDispatch} from 'react-redux';
import axios from 'axios';
import {setPaymentInfo} from '../redux/actions/paymentActions';
import Loader from '../shared/Loader';
import Layout from '../shared/Layout';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  media: {
    height: 250,
    textAlign: 'center'
  },
  img: {
    height: '100%'
  }
});

const Payment = ({user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const [payMethod, setPayMethod] = useState('card');
  const [payData, setPayData] = useState();
  const [loading, setLoading] = useState(true);

  const onPaymentChange = (event) => {
    setPayMethod(event.target.value);
  };

  const onPay = () => {
    const data = {
      // Account details
      AccountID: '-',
      FirstName: user.profile.firstName,
      LastName: user.profile.lastName,
      Email: user.profile.email,
      Phone: '',
      Street: '',
      City: '',
      Postcode: '',
      State: '',
      Country: '',


      //Product details
      SKU: '40037',
      OrderLanguage: payData.lang,
      Reference: 'Membership',
      Organization: 'ben2',
      UserKey: user.keycloak.subject,
      Currency: payData.currency,
      Amount: payData.amount,
      //Amount: 1,
      Type: 'recurring',
      ProductType: 'globalmembership',
      RecurringFreq: 30,

      // cancelUrl: 'http://86431566a175.ngrok.io/payment/cancel',
      // successUrl: 'http://86431566a175.ngrok.io/payment/success',
      // errorUrl: 'http://86431566a175.ngrok.io/payment/error'
      cancelUrl: 'https://kli.one/payment/cancel',
      successUrl: 'https://kli.one/payment/success',
      errorUrl: 'https://kli.one/payment/error'
    };

    axios.post('https://kli.one/api/orders/newandpay', data)
      .then(response => window.location.href = response.data.url)
      .catch(error => console.log(error));
  };

  const onSliderIdxChanged = (newValue) => {
    if (newValue >= (payData.minAmount || 0)) {
      const data = {...payData, amount: newValue};
      setPayData(data);
      dispatch(setPaymentInfo(data));
    }
  };

  useEffect(() => {
    // axios.post('GET PAYMENT DETAILS', {})

    // Mock promise
    setTimeout(() => {
      const data = {
        lang: 'en',
        currency: 'USD',
        currencySign: '$',
        fixedAmount: true,
        amount: 30,
        minAmount: 10,
        maxAmount: 100,
        stepAmount: 1,
        logoUrl: '',
        buttonText: '',
        dir: 'ltr'
      };

      setPayData(data)

      // Ones the data is received store to redux
      dispatch(setPaymentInfo(data));

      setLoading(false);
    }, 1000);
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  if (loading) {
    return <Loader/>
  }

  return (
    <Layout>
      <Paper elevation={0} className={classes.root}>
        <CardMedia className={classes.media}>
          <img src={payData.logoUrl || logo} className={classes.img} alt="logo"/>
        </CardMedia>

        <CardContent>
          <Typography variant="h1" component="p" gutterBottom>
            {payData.currencySign}{payData.amount}
          </Typography>

          {
            !payData.fixedAmount &&
            <Slider
              value={payData.amount || 0}
              onChange={(event, newValue) => onSliderIdxChanged(newValue)}
              aria-labelledby="continuous-slider"
              min={0}
              max={payData.maxAmount || 100}
              step={payData.stepAmount || 1}
            />
          }

          <Typography variant="h4" color="textSecondary" component="p">
            {t('payment.payMethod')}
          </Typography>

          <RadioGroup aria-label="payment" name="payment" value={payMethod} onChange={onPaymentChange}>
            <FormControlLabel value="card" control={<Radio/>} label="Card"/>
            <FormControlLabel value="paypal" control={<Radio/>} label="Paypal"/>
          </RadioGroup>
        </CardContent>

        <CardActions>
          <Button variant="contained" color="primary" onClick={onPay}>
            {payData.buttonText || t('payment.pay')}
          </Button>
        </CardActions>
      </Paper>
    </Layout>
  );
}


export default connect(store => ({user: store.userReducers}))(Payment);
