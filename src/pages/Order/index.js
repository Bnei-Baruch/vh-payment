import React, {useEffect, useState} from 'react';
import {Box, Button, CardActions, CardContent, Paper, Slider, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Loader from '../../components/Loader';
import ContentLayout from '../../layouts/ContentLayout';
import {PAYMENT_CANCEL_URL, PAYMENT_ERROR_URL, PAYMENT_SUCCESS_URL} from './redirect-urls';
import HeaderLayout from '../../layouts/HeaderLayout';
import CurrencyPicker from '../../components/CurencyPicker';
import {useParams} from 'react-router-dom';
import {setPaymentInfo} from '../../redux/actions/paymentActions';

const useStyles = makeStyles({
  header: {
    marginBottom: 40
  },
  body: {
    marginTop: 40
  },
  picker: {
    marginInlineEnd: 12
  },
  actions: {
    justifyContent: 'flex-end'
  }
});

const Order = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const currency = useSelector(state => state.currency);
  const language = useSelector(state => state.language);

  const {t} = useTranslation();
  const {id} = useParams();

  // const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(true);
  const [dbData, setDbData] = useState();
  const [viewData, setViewData] = useState();

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
      OrderLanguage: language.id,
      Reference: 'Membership',
      Organization: 'ben2',
      UserKey: user.keycloak.subject,
      Currency: viewData.currency.name,
      Amount: viewData.amount.value,
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

  const onSliderIdxChanged = (value) => {
    if (value >= (viewData.amount.min || 0)) {
      const data = {...viewData, amount: {value}};
      setViewData(data);
    }
  };

  useEffect(() => {
    // axios.post('url...', {id}).then(({data}) => setDbData(data));

    // Mock data
    setTimeout(() => {
      const data = {
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
          amount: {
            value: 30,
            min: 10,
            max: 100,
            step: 1,
            fixed: false
          },
          cancel: {
            text: 'Cancel',
            url: 'https://kli.one/'
          },
          buttonText: 'Pay'
        },
        ru: {
          header: {
            title: 'Заглавие',
            subtitle: '...',
            description: '...'
          },
          amount: {
            value: 30,
            min: 10,
            max: 100,
            step: 1,
            fixed: true
          },
          cancel: {
            text: 'Отмени',
            url: 'https://kli.one/'
          },
          buttonText: 'Плати'
        },
        he: {
          header: {
            title: 'Title',
            subtitle: 'Subtitle',
            description: 'Description'
          },
          amount: {
            value: 30,
            min: 10,
            max: 100,
            step: 1,
            fixed: true
          },
          cancel: {
            text: 'Cancel',
            url: 'https://kli.one/'
          },
          buttonText: 'Pay'
        },
        logoUrl: '',
      };

      setDbData(data);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!dbData) {
      return;
    }

    if (dbData[language.id]) {
      const {logoUrl} = dbData;
      const data = {...dbData[language.id], logoUrl};
      setViewData(data);
      dispatch(setPaymentInfo(data));
    } else {
      console.error('Language not supported');
    }
  }, [dbData, language, dispatch]);

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
                viewData.header && viewData.header.title &&
                <Typography variant="h1" component="h1">
                  {viewData.header.title}
                </Typography>
              }
              {
                viewData.header && viewData.header.subtitle &&
                <Typography variant="subtitle1" component="h2" gutterBottom>
                  {viewData.header.subtitle}
                </Typography>
              }
              {
                viewData.header && viewData.header.description &&
                <Typography style={{fontSize: 18}}>
                  {viewData.header.description}
                </Typography>
              }
            </Box>

            <Box display="flex" alignItems="flex-start">
              <Typography variant="h1" component="p" className={classes.picker}>
                {currency.sign}{viewData.amount.value}
              </Typography>
              <CurrencyPicker disableUnderline/>
            </Box>

            {
              !viewData.amount.fixed &&
              <Slider
                value={viewData.amount.value || 0}
                onChange={(event, newValue) => onSliderIdxChanged(newValue)}
                aria-labelledby="continuous-slider"
                min={0}
                max={viewData.amount.max || 100}
                step={viewData.amount.step || 1}
              />
            }

            <Box className={classes.body}>
              {
                viewData.body && viewData.body.title &&
                <Typography variant="h5" gutterBottom>
                  {viewData.body.title}
                </Typography>
              }
              {
                viewData.body && viewData.body.description &&
                <Typography>{viewData.body.description}</Typography>
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

          <CardActions className={classes.actions}>
            <Button variant="outlined" color="primary" href={viewData.cancel.url}>
              {viewData.cancel.text || t('payment.cancel')}
            </Button>
            <Button variant="contained" color="primary" onClick={handlePay}>
              {viewData.buttonText || t('payment.pay')}
            </Button>
          </CardActions>
        </Paper>
      </ContentLayout>
    </>
  );
}


export default Order;
