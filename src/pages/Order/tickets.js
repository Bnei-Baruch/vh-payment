import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getEventsProductBySlug } from "../../services/productservice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const TicketCard = styled(Grid)`
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  padding: 20px;
`;
const TicketGrid = styled(Grid)`
  margin: auto;
  max-width: 80%;

  ul {
    padding-left: 20px;
    & > li {
      padding: 10px 0px;
    }
  }
`;
const CenterText = styled(Typography)`
  text-align: center;
`;
const CenterTextGrey = styled(Typography)`
  text-align: center;
  color: #777777;
`;
const CTAGrid = styled(Grid)`
  text-align: center;
`;

export default function Tickets() {
  const { i18n } = useTranslation();
  const { event_slug } = useParams();
  const [product, setProduct] = React.useState(undefined);
  const currency = useSelector((state) => state.currency);
  console.log(product);

  React.useEffect(() => {
    setProduct(getEventsProductBySlug(event_slug));
  }, [event_slug]);

  if (!product) return <></>;

  const { content, plans } = product;
  const header =
    typeof content[i18n.language] !== "undefined"
      ? content[i18n.language]
      : content["en"];
  return (
    <>
      <HeaderLayout />
      <TicketGrid container spacing={6}>
        <Grid item xs={12}>
          <br />
          <CenterText variant="h1">{header.title}</CenterText>
          <CenterTextGrey variant="h6">{header.subtitle}</CenterTextGrey>
          <br />
          <Divider />
          <br />
          <CenterText variant="h6">{header.action}</CenterText>
        </Grid>
        <Grid container item xs={12} spacing={6}>
          {plans.map((plan) => {
            const planContent =
              typeof plan.content[i18n.language] !== "undefined"
                ? plan.content[i18n.language]
                : plan.content["en"];
            return (
              <Grid item xs={12} md={4}>
                <TicketCard>
                  <CenterText variant="h1">{planContent.name}</CenterText>
                  <br />
                  <Divider />
                  <br />
                  <CenterTextGrey variant="h2">
                    {currency.sign + " " + plan.price[currency.id].amount}
                  </CenterTextGrey>
                  <Grid>
                    <ul>
                      {planContent.description.map((item) => (
                        <li>
                          <Typography variant="body">{item}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid>
                    {planContent.options && (
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Select Option</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          style={{ flexDirection: "row" }}
                        >
                          {planContent.options.map((item) => (
                            <FormControlLabel
                              value={item.name}
                              control={<Radio />}
                              label={item.label}
                            />
                          ))}
                        </RadioGroup>
                        <br />
                      </FormControl>
                    )}
                  </Grid>
                  <CTAGrid>
                    <Button variant="contained" color="secondary">
                      {planContent.button_label}
                    </Button>
                  </CTAGrid>
                </TicketCard>
              </Grid>
            );
          })}
        </Grid>
      </TicketGrid>
    </>
  );
}
