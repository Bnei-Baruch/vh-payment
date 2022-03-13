import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react'
import styled from "styled-components";
const GreyText = styled(Typography)`
    color: #777777;
`
export default function UserDetail() {
  return (
    <Grid container spacing={6}>
    <Grid item xs={12}>
      <Typography variant="h4">
        Registration &gt; Convention 2022 &gt; Ticket Registration Detail
      </Typography>
    </Grid>
    <Grid container item xs={12} spacing={6}>
      <Grid item xs={12}>
        <GreyText variant="h6">
          In Order for us to produce your ticket. We need you to review
          following user details
        </GreyText>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Country"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Date of birth"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Gender"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="First Language"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Second Language"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          id="outlined-basic"
          label="What year did you start working in Bnei Baruch?"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={12} style={{textAlign: 'right'}}>
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Grid>
    </Grid>
  </Grid>
  )
}
