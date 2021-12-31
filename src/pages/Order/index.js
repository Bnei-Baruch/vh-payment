import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  Link,
  Paper,
  Slider,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Trans, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import ContentLayout from '../../layouts/ContentLayout'
import HeaderLayout from '../../layouts/HeaderLayout'
import CurrencyPicker from '../../components/CurencyPicker'
import { useParams } from 'react-router-dom'
import { setOrder } from '../../redux/actions/orderActions'
import appConfig from '../../shared/appconfig'
import { handlePayment } from '../../services/orderservice'
import { getProduct } from '../../services/productservice'
import { getProfile } from '../../services/userservice'

const useStyles = makeStyles({
  header: {
    marginBottom: 40,
  },
  body: {
    marginTop: 40,
  },
  picker: {
    marginInlineEnd: 12,
    fontSize: 48,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  secondaryFont: {
    fontFamily: 'Abel',
  },
  agree: {
    fontFamily: 'Abel',
    fontSize: 16,
  },
  payBtn: {
    fontFamily: 'Abel',
    marginRight: 8,
  },
  loader: {
    color: '#fff !important',
    height: '15px !important',
    width: '15px !important'
  }
})

const Order = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const currency = useSelector((state) => state.currency)
  const language = useSelector((state) => state.language)

  const [loading, setLoading] = useState(true)
  const [payClicked, setOnPayClicked] = useState(false)
  const [agree, setAgree] = useState(false)
  const [profileData, setUserProfileData] = useState(null)
  const [dbData, setDbData] = useState()
  const { id } = useParams()

  //fetching user profile data.
  const getUserProfileData = async () => {
    if (user && user.keycloak && user.keycloak.subject) {
      const userProfileData = await getProfile(user.keycloak.subject);
      setUserProfileData(userProfileData)
    }
  }
  const handlePay = async () => {
    setOnPayClicked(true);
    const data = {
      // Account details
      AccountID: '-',
      FirstName: user.profile.firstName,
      LastName: user.profile.lastName,
      Email: user.profile.email,
      Phone: profileData?.mobile_number || '',
      Street: profileData?.street_address || '',
      City: profileData?.city || '',
      Postcode: profileData?.postal_code || '',
      State: profileData?.state_region || '',
      Country: profileData?.country || '',

      //Product details
      SKU: order.product.SKU,
      OrderLanguage: language.id.toUpperCase(),
      Reference: order.product.reference,
      Organization: order.product.organization,
      UserKey: user.keycloak.subject,
      Currency: currency.id.toUpperCase(),
      Amount: order.currency.amount,
      // Amount: 1,
      Type: order.product.type,
      ProductType: order.product.productType,
      RecurringFreq: order.product.recurringFreq,
      //replace this with routing mechanism
      successUrl:
        appConfig.PAYMENT_SUCCESS_URL + '/' + order.product.productType,
      cancelUrl: appConfig.PAYMENT_CANCEL_URL,
      errorUrl: appConfig.PAYMENT_ERROR_URL,
    }
    handlePayment(data).then(response => {
      setOnPayClicked(false);
      window.location.href = response.data.url

    }).catch((error) => {
      setOnPayClicked(false);
      console.error(error)
    })
      
  }

  const handleSliderChange = (amount) => {
    let newAmount = order.currency.min
    if (amount >= (order.currency.min || 0)) {
      newAmount = amount
    }
    dispatch(
      setOrder({ ...order, currency: { ...order.currency, amount: newAmount } })
    )
  }
  
  /**
   * This useeffect fetches product
   * of the payment on the nature of type
   */
  useEffect(() => {
    const product = getProduct(id);
    if (product) {
      setDbData(product);
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [id])

  /**
   * This user effect is user to fetch
   * user profile from the profile service
   */
  useEffect(() => {
    getUserProfileData();
  }, [user])

  /**
   * This User Effect handle the
   * immediate changes in laguage or curreny 
   * to accomodate the product in redux
   */
  useEffect(() => {
    if (!dbData) {
      return
    }
    if (dbData.language[language.id] && dbData.currency[currency.id]) {
      const data = {
        appbar: { ...dbData.appbar },
        ...dbData.language[language.id],
        currency: { ...dbData.currency[currency.id] },
        product: { ...dbData.product },
      }
      dispatch(setOrder(data))
    } else {
      console.error('Language or currency not supported')
    }
  }, [dbData, language, currency, dispatch])

  if (loading) {
    return <Loader />
  }

  console.log(order)
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <Paper elevation={0}>
          <CardContent>
            <Box component="header" className={classes.header}>
              {order.header && order.header.title && (
                <Typography
                  variant="h1"
                  component="h1"
                  style={{ fontSize: 36 }}
                >
                  {order.header.title}
                </Typography>
              )}
              {order.header && order.header.subtitle && (
                <Typography
                  variant="subtitle1"
                  component="h2"
                  gutterBottom
                  style={{ fontSize: 14 }}
                >
                  {order.header.subtitle}
                </Typography>
              )}
              {order.header && order.header.description && (
                <Typography style={{ fontSize: 18 }}>
                  {order.header.description}
                </Typography>
              )}
            </Box>

            <Box display="flex" alignItems="flex-start">
              <Typography variant="h1" component="p" className={classes.picker}>
                {currency.sign}
                {order.currency.amount}
              </Typography>
              <CurrencyPicker
                disableUnderline
                className={classes.secondaryFont}
              />
            </Box>

            {!order.currency.fixed && (
              <Slider
                value={order.currency.amount || 0}
                onChange={(event, newValue) => handleSliderChange(newValue)}
                aria-labelledby="continuous-slider"
                min={0}
                max={order.currency.max || 100}
                step={order.currency.step || 1}
              />
            )}

            <Box className={classes.body}>
              {order.body && order.body.title && (
                <Typography variant="h5" gutterBottom style={{ fontSize: 18 }}>
                  {order.body.title}
                </Typography>
              )}
              {order.body && order.body.description && (
                <Typography style={{ fontSize: 14 }}>
                  {order.body.description}
                </Typography>
              )}
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
              <Trans>
                {t('order.agree')} &nbsp;
                <Link href={order.termsLink} target="_blank">
                  {t('order.tos')}
                </Link>
              </Trans>
            </Typography>
          </Box>

          <CardActions className={classes.actions}>
            <Button
              variant="outlined"
              color="primary"
              href={order.cancel.url}
              className={classes.secondaryFont}
            >
              {order.cancel.text || t('order.cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePay}
              disabled={!agree}
              className={classes.payBtn}
            >
           {payClicked && <CircularProgress m={2} className={classes.loader} />} &nbsp; {!payClicked ? order.buttonText || t('order.pay') : t('order.processing')} 
            </Button>
          </CardActions>
        </Paper>
      </ContentLayout>
    </>
  )
}

export default Order
