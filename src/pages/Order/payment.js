import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ContentLayout from "../../layouts/ContentLayout";
import HeaderLayout from "../../layouts/HeaderLayout";
const PaymentTile = styled.div`
  padding: 20px 20px;
  > span:first-child {
    font-size: 80px;
    border-left: 1px dashed #ccc;
    padding-left: 20px;
  }
  > span:last-child {
    padding-left: 10px;
  }
  > span.lightgrey:first-child {
    color: #777;
    font-size: 48px;
  }
  > span.lightgrey:last-child { 
    color: #777;
  }
`;
const SubText = styled.div`
  color: #777;
  padding: 0px 20px;
`
const HeaderTitle = styled(Typography)`
  text-align: center;
`;
export default function Payment() {
    const { t } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(0);
  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const prevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <HeaderTitle variant="h3">Convention Ticket</HeaderTitle> <br />
        <Stepper activeStep={activeStep} alternativeLabel>
          {[1, 2, 3].map((label) => (
            <Step key={label}>
              <StepLabel>{t('common.step')} {label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubText>{t('common.amount')}</SubText>
              <PaymentTile>
                <span>10</span>
                <span>USD</span>
              </PaymentTile>
            </Grid>
            <Grid item xs={12}>
                <SubText>
                    Ticket description : Loreum ipsum dolor sit amet, consectetur adipiscing elit.
                    Ticket description : Loreum ipsum dolor sit amet, consectetur adipiscing elit.
                </SubText>
                <br/><br/>
            </Grid>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Grid style={{padding: '20px'}}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                   {t('common.paymentMethod')}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="creditcard"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="creditcard"
                      control={<Radio />}
                      label={t('paymentMethod.creditCard')}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label={t('common.other')}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
                <SubText>
                    Payment description : Loreum ipsum dolor sit amet, consectetur adipiscing elit.
                    Payment description : Loreum ipsum dolor sit amet, consectetur adipiscing elit.
                </SubText>
                <br/><br/>
            </Grid>
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <SubText>{t('common.amount')}</SubText>
              <PaymentTile>
                <span class="lightgrey">10</span>
                <span class="lightgrey">USD</span>
              </PaymentTile>
            </Grid>
            <Grid item xs={12}>
              <SubText>{t('common.paymentMethod')}</SubText>
              <PaymentTile>
                <span class="lightgrey">Credit card</span>
              </PaymentTile>
            </Grid>
          </Grid>
        )}
        <Grid style={{textAlign: 'right'}}>
          <Button variant="contained" color="primary" onClick={nextStep}>
            {activeStep === 2 ? t('common.confirm') : t('common.next')}
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" onClick={prevStep}>
            {activeStep === 0 ? t('common.cancel') : t('common.back')}
          </Button>
        </Grid>
      </ContentLayout>
    </>
  );
}
