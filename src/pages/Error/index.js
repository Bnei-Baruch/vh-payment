import React, {useEffect, useState} from 'react';
import {Box, Button, CardActions, CardContent, Checkbox, Link, Paper, Slider, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Trans, useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Loader from '../../components/Loader';
import ContentLayout from '../../layouts/ContentLayout';
import HeaderLayout from '../../layouts/HeaderLayout';
import CurrencyPicker from '../../components/CurencyPicker';
import {useParams} from 'react-router-dom';
import {setOrder} from '../../redux/actions/orderActions';
import {convention, userfee} from '../../shared/products'
import appConfig from '../../shared/appconfig';
import * as qs from 'query-string';

const useStyles = makeStyles({
  header: {
    marginBottom: 40,
    justifyContent: 'center'
  },
  body: {
    marginTop: 40
  },
  picker: {
    marginInlineEnd: 12,
    fontSize: 48
  },
  actions: {
    justifyContent: 'center'
  },
  secondaryFont: {
    fontFamily: 'Abel'
  },
  agree: {
    fontFamily: 'Abel',
    fontSize: 16
  },
  payBtn: {
    fontFamily: 'Abel',
    marginRight: 8
  }
});

const Error = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  const user = useSelector(state => state.user);
  const currency = useSelector(state => state.currency);
  const language = useSelector(state => state.language);
  const { ordkey, paramx } = useParams();


  const {t} = useTranslation();

  // const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(true);
  const [errorMesg, setErrorMesg] = useState("Unknown Error")
  

  useEffect(() => {
    let q = qs.parse(window.location.search);

    console.log(q)
    if (q.error != null && q.error.length > 0){
      setErrorMesg(q.error)
    }
    
     console.log("orderid", ordkey)
     console.log("paramX", paramx)
     const errinfo = {
      ordkey,
      paramx,
      errormsg: q.Error 
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
      setLoading(false);
    }, 1000);
  },[])
 


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
                <Typography variant="h1" component="h1" style={{fontSize: 36, marginBottom:20}}>
                 {t('order.error')}
                </Typography>
              }
            
              <Typography style={{fontSize: 18}}>
                {t('order.errortext')}
              </Typography>
              <Typography style={{fontSize: 18}}>
                {errorMesg}
              </Typography>
              <Typography style={{fontSize: 18, marginTop: 20}}>
                {t('order.errortext2')}
              </Typography>
            
            </Box>
          </CardContent>
        </Paper>
      </ContentLayout>
    </>
  );
}

export default Error;
