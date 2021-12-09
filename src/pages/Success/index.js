import React, { useEffect, useState } from 'react'
import { Box, CardContent, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../../components/Loader'
import ContentLayout from '../../layouts/ContentLayout'
import HeaderLayout from '../../layouts/HeaderLayout'
import { useParams } from 'react-router-dom'
import { setOrder } from '../../redux/actions/orderActions'
import { convention, userfee } from '../../shared/products'
import appConfig from '../../shared/appconfig'
import * as qs from 'query-string'
import { getQueryParams } from '../../utils/common'

const useStyles = makeStyles({
  header: {
    marginBottom: 40,
    justifyContent: 'center',
  },
  body: {
    marginTop: 40,
  },
  picker: {
    marginInlineEnd: 12,
    fontSize: 48,
  },
  actions: {
    justifyContent: 'center',
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
  buttonNext: {
    padding: '0px 45px',
    marginTop: '15px',
  },
  link: {
    textDecoration: 'none',
  },
})

const Success = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const currency = useSelector((state) => state.currency)
  const language = useSelector((state) => state.language)

  const { t } = useTranslation()
  const { pdt } = useParams()

  // const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(true)

  const [dbData, setDbData] = useState()

  useEffect(() => {
    let q = qs.parse(window.location.search)

    if (user.authenticated) {
      const jwt = {
        headers: {
          Authorization: 'Bearer ' + user.keycloak.token,
        },
      }

      axios
        .post(appConfig.VH_ORDER + '/orders/paid', q, jwt)
        .then(function (response) {
          const productType = pdt
          if (productType === 'jan2022ticket') {
            window.location.href = `${window.location.origin}/register`
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    setTimeout(() => {
      console.log('timeout here')
      setLoading(false)
    }, 1000)
  }, [pdt, user])

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

  if (!user.authenticated || loading) {
    return <Loader />
  }

  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <Paper elevation={0}>
          <CardContent>
            <Box component="header" className={classes.header}>
              {
                <Typography
                  variant="h1"
                  component="h1"
                  style={{ fontSize: 36, marginBottom: 20 }}
                >
                  {t('order.thankyou')}
                </Typography>
              }

              {
                <Typography style={{ fontSize: 18 }}>
                  {t('order.thxtext')}
                </Typography>
              }
              {
                <a href={`/register/thank-you`} className={classes.link}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonNext}
                  >
                    Next
                  </Button>
                </a>
              }
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    </>
  )
}

export default Success
