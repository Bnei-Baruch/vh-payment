import React, { useEffect, useState } from 'react'
import { Box, CardContent, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import ContentLayout from '../../layouts/ContentLayout'
import HeaderLayout from '../../layouts/HeaderLayout'
import { useParams } from 'react-router-dom'
import * as qs from 'query-string'
import { paymentSuccess } from '../../services/orderservice'

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

const Success = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { pdt } = useParams()
  
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(true)

  /**
   * This Useeffect sends the payments detail
   * to backend after successful payment completion.
   */
  useEffect(() => {
    let q = qs.parse(window.location.search)
    if (user.authenticated) {
      paymentSuccess(q).then(() => {
          if (pdt === 'jan2022ticket') {
            setTimeout(() => {
              window.location.href = `${window.location.origin}/register/success`
            }, 3000)
          }
          setLoading(false)
      }).catch(function (error) {
        console.error(error)
        setLoading(false)
      })
    }
  }, [pdt, user])

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
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    </>
  )
}

export default Success
