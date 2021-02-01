import React, {useState} from 'react';
import logo from '../assets/images/logo-tree.png'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControlLabel,
  Grid, Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 500,
  },
});

const Payment = () => {
  const classes = useStyles();
  const {t} = useTranslation();

  const [payment, setPayment] = useState('card');

  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}
    >

      <Grid item xs={3}>
        <Card elevation={0} className={classes.root}>
          <CardMedia
            className={classes.media}
            image={logo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {t('description.title')}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>

            <RadioGroup aria-label="payment" name="payment" value={payment} onChange={handlePaymentChange}>
              <FormControlLabel value="card" control={<Radio />} label="Card" />
              <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
            </RadioGroup>
          </CardContent>

          <CardActions>
            <Button variant="contained" color="primary">
              Pay
            </Button>
          </CardActions>
        </Card>
      </Grid>

    </Grid>
  );
};

export default Payment;
