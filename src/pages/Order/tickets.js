import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import styled from "styled-components";
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
export default function tickets() {
  return (
    <>
      <HeaderLayout />
      <TicketGrid container spacing={6}>
        <Grid item xs={12}>
          <br />
          <CenterText variant="h1">Registration</CenterText> <br />
          <CenterText variant="h1">Convention Title</CenterText>
          <CenterTextGrey variant="h6">24 - March - 2021</CenterTextGrey>
          <br />
          <Divider />
          <br />
          <CenterText variant="h6">Select the type of ticket</CenterText>
        </Grid>
        <Grid container item xs={12} spacing={6}>
          <Grid item xs={12} md={4}>
            <TicketCard>
              <CenterText variant="h1">Regular Ticket</CenterText>
              <CenterTextGrey variant="h2">$10</CenterTextGrey>
              <Grid>
                <ul>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <CTAGrid>
                <Button variant="contained" color="secondary">
                  Select
                </Button>
              </CTAGrid>
            </TicketCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <TicketCard>
              <CenterText variant="h1">Membership Ticket</CenterText>
              <CenterTextGrey variant="h2">$10</CenterTextGrey>
              <Grid>
                <ul>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <CTAGrid>
                <Button variant="contained" color="secondary">
                  Select
                </Button>
              </CTAGrid>
            </TicketCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <TicketCard>
              <CenterText variant="h1">Help Haver</CenterText>
              <CenterTextGrey variant="h2">$10</CenterTextGrey>
              <Grid>
                <ul>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body">
                      Lorum Ipsum Lorem Ipsum
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <CTAGrid>
                <Button variant="contained" color="secondary">
                  Select
                </Button>
              </CTAGrid>
            </TicketCard>
          </Grid>
        </Grid>
      </TicketGrid>
    </>
  );
}
