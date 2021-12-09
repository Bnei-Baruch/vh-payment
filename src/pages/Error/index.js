import React, { useEffect, useState } from 'react'
import { Box, CardContent, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Loader from '../../components/Loader'
import ContentLayout from '../../layouts/ContentLayout'
import HeaderLayout from '../../layouts/HeaderLayout'
import { useParams } from 'react-router-dom'
import * as qs from 'query-string'

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

const Error = () => {
  const classes = useStyles()
  const { ordkey, paramx } = useParams()
  const { t } = useTranslation()

  // const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(true)
  const [errorMesg, setErrorMesg] = useState('Unknown Error')

  useEffect(() => {
    let q = qs.parse(window.location.search)

    if (q.error != null && q.error.length > 0) {
      setErrorMesg(q.error)
    }

    // TODO: create backend for this
    // axios.post( appConfig.VH_ORDER, errinfo)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    setTimeout(() => {
      setLoading(false)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
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
                  {t('order.error')}
                </Typography>
              }

              <Typography style={{ fontSize: 18 }}>
                {t('order.errortext')}
              </Typography>
              <Typography style={{ fontSize: 18 }}>{errorMesg}</Typography>
              <Typography style={{ fontSize: 18, marginTop: 20 }}>
                {t('order.errortext2')}
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    </>
  )
}

export default Error
