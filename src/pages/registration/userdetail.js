import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const GreyText = styled(Typography)`
  color: #777777;
`;
export default function UserDetail() {
  const [profile, setProfileData] = useState({});
  const profileData = useSelector((state) => state.user.profileData);
  React.useEffect(() => {
    setProfileData(profileData);
  }, [profileData]);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4">
          Registration &gt; Convention 2022 &gt; Ticket Registration Detail
        </Typography>
      </Grid>
      {profile && (
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
              value={profile.first_name_vernacular}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={profile.last_name_vernacular}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Change to select */}
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              fullWidth
              value={profile.country}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Date of birth"
              variant="outlined"
              value={profile.date_of_birth}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={profile.mobile_number}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Gender"
              variant="outlined"
              fullWidth
              value={profile.gender}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="First Language"
              variant="outlined"
              fullWidth
              value={profile.first_language}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Second Language"
              variant="outlined"
              value={profile.other_language_1}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="What year did you start in Bnei Baruch?"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              value={profile.primary_email}
            />
          </Grid>
          <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
