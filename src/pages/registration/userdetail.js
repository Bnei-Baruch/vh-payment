import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SelectElement from "../../components/SelectElement";
import { saveUserProfileData } from "../../services/userservice";
import countries from "../../shared/countries";
import * as qs from "query-string";
import languages from "../../shared/languages_profile";
import { paymentSuccess } from "../../services/orderservice";
const GreyText = styled(Typography)`
  color: #777777;
`;
export default function UserDetail() {
  const { t } = useTranslation();
  const { event_slug } = useParams();
  const history = useHistory();
  const [profile, setProfileData] = useState({});
  const [isEditable, setIsEditAble] = useState(false);
  const profileData = useSelector((state) => state.user.profileData);
  React.useEffect(() => {
    setProfileData(profileData);
  }, [profileData]);

  const saveProfileAndRedirect = async () => {
    let q = qs.parse(window.location.search);
    if (isEditable) {
      saveUserProfileData(profile).then(async () => {
        await paymentSuccess(q);
        history.push(`/pay/order/register/userdetail/success/${event_slug}`);
      });
    } else {
      await paymentSuccess(q);
      history.push(`/pay/order/register/userdetail/success/${event_slug}`);
    }
  };

  const enableEdit = () => {
    setIsEditAble(!isEditable);
  };

  const handleChange = (key, e) => {
    let data = { ...profile };
    data[key] = e.target.value;
    setProfileData(data);
  };
  // React.useEffect(() => {
  //   let q = qs.parse(window.location.search)
  //   if (user.authenticated) {
  //     paymentSuccess(q);
  //   }
  // }, [user])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4">Ticket Registration Detail</Typography>
      </Grid>
      {profile ? (
        <Grid container item xs={12} spacing={6}>
          <Grid item xs={12}>
            <GreyText variant="h6">
              In Order for us to produce your ticket. We need you to review
              following user details
            </GreyText>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!isEditable}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth
              value={profile.first_name_vernacular}
              onChange={(e) => handleChange("first_name_vernacular", e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!isEditable}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={profile.last_name_vernacular}
              onChange={(e) => handleChange("last_name_vernacular", e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!isEditable}
              id="outlined-basic"
              label="Date of birth"
              variant="outlined"
              value={profile.date_of_birth}
              fullWidth
              onChange={(e) => handleChange("date_of_birth", e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!isEditable}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              value={profile.mobile_number}
              fullWidth
              onChange={(e) => handleChange("mobile_number", e)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!isEditable}
              id="outlined-basic"
              label="Gender"
              variant="outlined"
              fullWidth
              value={profile.gender}
              onChange={(e) => handleChange("gender", e)}
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
          <Grid item xs={12} md={4}>
            {/* Change to select */}
            <SelectElement
              disabled={!isEditable}
              id="outlined-basic"
              label="Country"
              variant="outlined"
              fullWidth
              value={profile.country}
              onChange={(e) => handleChange("country", e)}
              selectData={countries}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectElement
              disabled={!isEditable}
              id="outlined-basic"
              label="First Language"
              variant="outlined"
              fullWidth
              value={profile.first_language}
              onChange={(e) => handleChange("first_language", e)}
              selectData={languages}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectElement
              disabled={!isEditable}
              id="outlined-basic"
              label="Second Language"
              variant="outlined"
              value={profile.other_language_1}
              onChange={(e) => handleChange("other_language_1", e)}
              selectData={languages}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              disabled={!isEditable}
              id="outlined-basic"
              label="What year did you start in Bnei Baruch?"
              variant="outlined"
              fullWidth
              value={profile.bnei_baruch_start_year}
              onChange={(e) => handleChange("bnei_baruch_start_year", e)}
            />
          </Grid>
          <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={saveProfileAndRedirect}
            >
              {!isEditable ? t("common.next") : t("common.save")}
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color={!isEditable ? "primary" : "default"}
              onClick={enableEdit}
            >
              {!isEditable ? t("common.edit") : t("common.cancel")}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div style={{ margin: "20px auto" }}>
          {" "}
          <CircularProgress />{" "}
        </div>
      )}
    </Grid>
  );
}
