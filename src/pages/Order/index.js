import React, {useEffect, useState} from 'react';
import {Box, Button, CardActions, CardContent, Checkbox, Link, Paper, Slider, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Trans, useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Loader from '../../components/Loader';
import ContentLayout from '../../layouts/ContentLayout';
import {PAYMENT_CANCEL_URL, PAYMENT_ERROR_URL, PAYMENT_SUCCESS_URL} from './redirect-urls';
import HeaderLayout from '../../layouts/HeaderLayout';
import CurrencyPicker from '../../components/CurencyPicker';
import {useParams} from 'react-router-dom';
import {setOrder} from '../../redux/actions/orderActions';

const useStyles = makeStyles({
  header: {
    marginBottom: 40
  },
  body: {
    marginTop: 40
  },
  picker: {
    marginInlineEnd: 12,
    fontSize: 48
  },
  actions: {
    justifyContent: 'flex-end'
  },
  secondaryFont: {
    fontFamily: 'Abel'
  },
  agree: {
    fontFamily: 'Abel',
    fontSize: 16
  }
});

const Order = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  const user = useSelector(state => state.user);
  const currency = useSelector(state => state.currency);
  const language = useSelector(state => state.language);

  const {t} = useTranslation();
  const {id} = useParams();

  // const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(true);
  const [agree, setAgree] = useState(false);

  const [dbData, setDbData] = useState();

  // const handlePaymentChange = (event) => {
  //   setPayMethod(event.target.value);
  // };

  const handlePay = () => {
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
      OrderLanguage: language.id.toUpperCase(),
      Reference: 'Membership',
      Organization: 'ben2',
      UserKey: user.keycloak.subject,
      Currency: currency.id.toUpperCase(),
      Amount: order.currency.amount,
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

  const handleSliderChange = (amount) => {
    if (amount >= (order.currency.min || 0)) {
      const data = {...order, currency: {...order.currency, amount}};
      dispatch(setOrder(data));
    }
  };

  useEffect(() => {
    // axios.post('url...', {id}).then(({data}) => setDbData(data));

    // Mock data
    setTimeout(() => {
      const data = {
        language: {
          en: {
            header: {
              title: 'Product Name',
              subtitle: 'one liner under the product name',
              description: 'A short description that might or might not be here but in any case should be short, like 2 line max'
            },
            body: {
              title: 'Description',
              description: 'A longer description that might or might not be here but that can be more than 2 lines A longer ' +
                'description that might or might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines '
            },
            cancel: {
              text: 'Cancel',
              url: 'https://kli.one/'
            },
            buttonText: 'Pay',
            termsLink: 'https://kli.one/tos'
          },
          ru: {
            header: {
              title: 'Име',
              subtitle: 'one liner under the product name',
              description: 'A short description that might or might not be here but in any case should be short, like 2 line max'
            },
            body: {
              title: 'Description',
              description: 'A longer description that might or might not be here but that can be more than 2 lines A longer ' +
                'description that might or might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines '
            },
            cancel: {
              text: 'Cancel',
              url: 'https://kli.one/'
            },
            buttonText: 'Плати',
            termsLink: 'https://kli.one/tos'
          },
          es: {
            header: {
              title: 'Product Name',
              subtitle: 'one liner under the product name',
              description: 'A short description that might or might not be here but in any case should be short, like 2 line max'
            },
            body: {
              title: 'Description',
              description: 'A longer description that might or might not be here but that can be more than 2 lines A longer ' +
                'description that might or might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines '
            },
            cancel: {
              text: 'Cancel',
              url: 'https://kli.one/'
            },
            buttonText: 'Pay',
            termsLink: 'https://kli.one/tos'
          },
          he: {
            header: {
              title: 'Product Name',
              subtitle: 'one liner under the product name',
              description: 'A short description that might or might not be here but in any case should be short, like 2 line max'
            },
            body: {
              title: 'Description',
              description: 'A longer description that might or might not be here but that can be more than 2 lines A longer ' +
                'description that might or might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines A longer description that might or ' +
                'might not be here but that can be more than 2 lines '
            },
            cancel: {
              text: 'Cancel',
              url: 'https://kli.one/'
            },
            buttonText: 'Pay',
            termsLink: 'https://kli.one/tos'
          },
        },
        currency: {
          usd: {
            fixed: false,
            amount: 10,
            min: 10,
            max: 30,
            step: 1
          },
          eur: {
            fixed: false,
            amount: 10,
            min: 10,
            max: 100,
            step: 1
          },
          nis: {
            fixed: false,
            amount: 10,
            min: 10,
            max: 20,
            step: 1
          },
        }
      };

      setDbData(data);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!dbData) {
      return;
    }

    if (dbData.language[language.id] && dbData.currency[currency.id]) {
      const data = {appbar: {...dbData.appbar}, ...dbData.language[language.id], currency: {...dbData.currency[currency.id]}};
      dispatch(setOrder(data));
    } else {
      console.error('Language or currency not supported');
    }
  }, [dbData, language, currency, dispatch]);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <HeaderLayout/>
      <ContentLayout>
        <Paper elevation={0}>
          <CardContent>
            <Box component="header" className={classes.header}>
              {
                order.header && order.header.title &&
                <Typography variant="h1" component="h1" style={{fontSize: 36}}>
                  {order.header.title}
                </Typography>
              }
              {
                order.header && order.header.subtitle &&
                <Typography variant="subtitle1" component="h2" gutterBottom style={{fontSize: 14}}>
                  {order.header.subtitle}
                </Typography>
              }
              {
                order.header && order.header.description &&
                <Typography style={{fontSize: 18}}>
                  {order.header.description}
                </Typography>
              }
            </Box>

            <Box display="flex" alignItems="flex-start">
              <Typography variant="h1" component="p" className={classes.picker}>
                {currency.sign}{order.currency.amount}
              </Typography>
              <CurrencyPicker disableUnderline className={classes.secondaryFont}/>
            </Box>

            {
              !order.currency.fixed &&
              <Slider
                value={order.currency.amount || 0}
                onChange={(event, newValue) => handleSliderChange(newValue)}
                aria-labelledby="continuous-slider"
                min={0}
                max={order.currency.max || 100}
                step={order.currency.step || 1}
              />
            }

            <Box className={classes.body}>
              {
                order.body && order.body.title &&
                <Typography variant="h5" gutterBottom style={{fontSize: 18}}>
                  {order.body.title}
                </Typography>
              }
              {
                order.body && order.body.description &&
                <Typography style={{fontSize: 14}}>{order.body.description}</Typography>
              }
            </Box>

            {/*<Typography variant="h4" color="textSecondary" component="p">*/}
            {/*  {t('payment.payMethod')}*/}
            {/*</Typography>*/}

            {/*<RadioGroup aria-label="payment" name="payment" value={payMethod} onChange={handlePaymentChange}>*/}
            {/*  <FormControlLabel value="card" control={<Radio/>} label="Card"/>*/}
            {/*  <FormControlLabel value="paypal" control={<Radio/>} label="Paypal"/>*/}
            {/*</RadioGroup>*/}
          </CardContent>

          <Box>
            <Checkbox
              checked={agree}
              color="primary"
              onClick={() => setAgree(!agree)}
            />
            <Typography component="span" className={classes.agree}>
              <Trans i18nKey="order.agree">
                I agree with <Link href={order.termsLink} target="_blank">terms and conditions</Link>
              </Trans>
            </Typography>
          </Box>

          <CardActions className={classes.actions}>
            <Button variant="outlined"
                    color="primary"
                    href={order.cancel.url}
                    className={classes.secondaryFont}>
              {order.cancel.text || t('order.cancel')}
            </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={handlePay}
                    disabled={!agree}
                    className={classes.secondaryFont}>
              {order.buttonText || t('order.pay')}
            </Button>
          </CardActions>
        </Paper>
      </ContentLayout>
    </>
  );
}

export default Order;
