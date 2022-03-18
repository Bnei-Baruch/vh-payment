import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ContentLayout from "../../layouts/ContentLayout";
import HeaderLayout from "../../layouts/HeaderLayout";
const HeaderTitle = styled(Typography)`
  text-align: center;
`;
const Input = styled("input")({
  display: "none",
});
export default function OtherPayment() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderLayout />
      <ContentLayout>
        <HeaderTitle variant="h3">
          {t("otherPayments.paymentDetails")}
        </HeaderTitle>{" "}
        <br />
        <Divider /> <br />
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {t("otherPayments.howAreYouPaying")}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="offlinebank"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="offlinebank"
                  control={<Radio />}
                  label={t("otherPayments.offlineBank")}
                />
                <FormControlLabel
                  value="localGroup"
                  control={<Radio />}
                  label={t("otherPayments.localGroup")}
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label={t("otherPayments.incash")}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={t("common.other")}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                {t("otherPayments.doYouHaveAReciept")}
              </FormLabel>
              <br />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="contained" color="primary" component="span">
                  {t("common.upload")}
                </Button>
              </label>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              multiline
              label={t("otherPayments.extraInformation")}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button variant="contained" color="primary">
              {t("common.confirm")}
            </Button>
          </Grid>
        </Grid>
      </ContentLayout>
    </>
  );
}
