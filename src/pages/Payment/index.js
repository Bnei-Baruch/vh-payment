import React, {useEffect, useState} from 'react';
import logo from '../../images/logo-tree.png'
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
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setPaymentInfo} from '../../redux/actions/paymentActions';
import Loader from '../../shared/Loader';
import Layout from '../../shared/Layout';
import {PAYMENT_CANCEL_URL, PAYMENT_ERROR_URL, PAYMENT_SUCCESS_URL} from './redirect-urls';

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

const Payment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

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
      Currency: payData.currency.name,
      Amount: payData.amount.value,
      //Amount: 1,
      Type: 'recurring',
      ProductType: 'globalmembership',
      RecurringFreq: 30,
      successUrl: PAYMENT_SUCCESS_URL,
      cancelUrl: PAYMENT_CANCEL_URL,
      errorUrl: PAYMENT_ERROR_URL
    };

    axios.post('https://kli.one/api/orders/newandpay', data)
      .then(response => window.location.href = response.data.url)
      .catch(error => console.log(error));
  };

  const onSliderIdxChanged = (newValue) => {
    if (newValue >= (payData.amount.min || 0)) {
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
        currency: {
          name: 'USD',
          sign: '$'
        },
        amount: {
          value: 30,
          min: 10,
          max: 100,
          step: 1,
          fixed: true
        },
        logoUrl: '',
        buttonText: '',
        dir: 'ltr'
      };

      setPayData(data);

      // Ones the data is received store to redux
      dispatch(setPaymentInfo(data));

      setLoading(false);
    }, 1000);
  }, [dispatch]);

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
            {payData.currency.sign}{payData.amount.value}
          </Typography>

          {
            !payData.amount.fixed &&
            <Slider
              value={payData.amount.value || 0}
              onChange={(event, newValue) => onSliderIdxChanged(newValue)}
              aria-labelledby="continuous-slider"
              min={0}
              max={payData.amount.max || 100}
              step={payData.amount.step || 1}
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


export default Payment;
