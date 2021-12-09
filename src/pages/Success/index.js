import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
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
})

const Success = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const currency = useSelector((state) => state.currency)
  const language = useSelector((state) => state.language)
  console.log('props', language.id)
  const { t } = useTranslation()
  const { pdt } = useParams()
  /*   const pathnameFromPayment = location.pathname.slice(10) */
  /*  console.log(pathnameFromPayment) */
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
      <Card mb={6} style={{ marginTop: '5px' }}>
        <CardContent>
          <Typography variant="h3" gutterBottom className="email-seprater-text">
            {t('payments.allGood')}
          </Typography>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <div>{t('common.thanksstep3')}</div>
            </Grid>
            <Grid item md={12}>
              <a
                href={`/register/${language.id && '?lang=' + language.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="contained" color="primary">
                  {t('common.next')}
                </Button>
              </a>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Success
