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
import { DatePicker } from "@material-ui/pickers";
const GreyText = styled(Typography)`
  color: #777777;
`;
const ProfileGrid = styled(Grid)`
  .Mui-disabled {
    color: rgba(0, 0, 0, 0.84) !important;
  }
`;
export const genderData = [
  {
    code: "male",
    label: "Male",
  },
  {
    code: "female",
    label: "Female",
  },
];
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

  const discardChanges = () => {
    setProfileData(profileData);
    setIsEditAble(false);
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

  const profileSubmit = (e) => {
    e.preventDefault();
    saveProfileAndRedirect();
  };
  return (
    <form onSubmit={profileSubmit}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h4">Ticket Registration Detail</Typography>
        </Grid>
        {profile ? (
          <ProfileGrid container item xs={12} spacing={6}>
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
                required
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
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={!isEditable}
                id="outlined-basic"
                label="Date of birth"
                variant="outlined"
                type="date"
                value={profile.date_of_birth}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleChange("date_of_birth", e)}
                required
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
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectElement
                disabled={!isEditable}
                id="outlined-basic"
                label="Gender"
                variant="outlined"
                fullWidth
                value={profile.gender}
                onChange={(e) => handleChange("gender", e)}
                selectData={genderData}
                required
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
                required
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
                required
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
                required
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
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DatePicker
                disabled={!isEditable}
                views={["year"]}
                label="What year did you start in Bnei Baruch?"
                value={profile.study_start_year}
                fullWidth
                required
                onChange={(e) => handleChange("date_of_birth", e)}
              />
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: "right" }}>
              {!isEditable && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveProfileAndRedirect}
                >
                  {t("common.next")}
                </Button>
              )}
              {isEditable && (
                <Button variant="contained" color="primary" type="submit">
                  {t("common.save")}
                </Button>
              )}
              &nbsp;&nbsp;
              <Button
                variant="contained"
                color={!isEditable ? "primary" : "default"}
                onClick={!isEditable ? enableEdit : discardChanges}
              >
                {!isEditable ? t("common.edit") : t("common.cancel")}
              </Button>
            </Grid>
          </ProfileGrid>
        ) : (
          <div style={{ margin: "20px auto" }}>
            {" "}
            <CircularProgress />{" "}
          </div>
        )}
      </Grid>
    </form>
  );
}
