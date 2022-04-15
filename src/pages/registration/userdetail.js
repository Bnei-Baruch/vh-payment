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
import {
  addAParticipant,
  getParticipantByEmail,
} from "../../services/participants.service";
import { addPariticpantInEvent } from "../../services/event.service";
import { getEventsProductBySlug } from "../../services/productservice";
import { getQueryParams } from "../../utils/common";
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
  const { t, i18n } = useTranslation();
  let ManualPayment = getQueryParams("ManualPayment");
  const { event_slug, participation_option } = useParams();
  const history = useHistory();
  const [profile, setProfileData] = useState({});
  const [isEditable, setIsEditAble] = useState(true);
  const user = useSelector((state) => state.user);
  const profileData = useSelector((state) => state.user.profileData);
  const [participantId, setParticipantId] = useState(undefined);
  React.useEffect(() => {
    setProfileData(profileData);
    if (profileData && profileData.primary_email) {
      getParticipantByEmail(profileData.primary_email)
        .then((res) => {
          if (res) {
            const { id } = res;
            setParticipantId(id);
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  }, [profileData]);

  React.useEffect(() => {
    if (!ManualPayment) {
      postSuccessPayment();
    }
    // eslint-disable-next-line
  }, []);

  const postSuccessPayment = async () => {
    let q = qs.parse(window.location.search);
    if (Object.keys(q).length !== 0 && !ManualPayment) {
      await paymentSuccess(q);
    }
  };

  const saveProfile = async () => {
    const data = { ...profile };
    data.date_of_birth =
      typeof data.date_of_birth === "object"
        ? data.date_of_birth?.toISOString()
        : new Date(data.date_of_birth)?.toISOString();
    data.study_start_year =
      typeof data.study_start_year === "object"
        ? data.study_start_year?.getFullYear()
        : data.study_start_year ? data.study_start_year : new Date().getFullYear();
    data.email_language = i18n.language;
    await saveUserProfileData(data).then(() => setIsEditAble(false)).catch(() => setIsEditAble(false));
    setIsEditAble(false);
  }

  const saveProfileAndRedirect = async () => {
    const eventData = getEventsProductBySlug(event_slug);
    const data = { ...profile };
    console.log(data)
    data.date_of_birth =
      typeof data.date_of_birth === "object"
        ? data.date_of_birth?.toISOString()
        : new Date(data.date_of_birth)?.toISOString();
    data.study_start_year =
      typeof data.study_start_year === "object"
        ? data.study_start_year?.getFullYear()
        : data.study_start_year ? data.study_start_year : new Date().getFullYear();
    data.email_language = i18n.language;
    //await saveUserProfileData(data);
    if (participantId) {
      const eventBody = {
        participation_option: participation_option,
        participant_id: participantId,
        event_id: eventData.event.id,
        notification: true,
        notification_type: 'confirmation',
        registration_date: new Date().toISOString(),
      };
      addPariticpantInEvent(eventBody).then(() => {
        history.push(
          `/pay/order/register/${participation_option}/userdetail/success/${event_slug}`
        );
      });
    } else {
      //SetUpdatedObject
      const participantdata = {
        keycloak_id: user.keycloak.subject,
        first_language: data.first_language,
        email_language: i18n.language,
        dob: data.date_of_birth
          ? new Date(data.date_of_birth).toISOString()
          : new Date().toISOString(),
        gender: data.gender,
        email: data.primary_email,
        country: data.country,
        first_name: data.first_name_vernacular,
        last_name: data.last_name_vernacular,
      };
      addAParticipant(participantdata).then((res) => {
        if (res) {
          setParticipantId(res.id);
          const eventBody = {
            //Should be the option of the user pariticpant.
            participation_option: participation_option,
            participant_id: res.id,
            event_id: eventData.event.id,
            notification: true,
            notification_type: 'confirmation',
            registration_date: new Date().toISOString(),
          };
          addPariticpantInEvent(eventBody).then(() => {
            history.push(
              `/pay/order/register/${participation_option}/userdetail/success/${event_slug}`
            );
          });
        }
      });
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
    if (key === "study_start_year") {
      data[key] = e;
    } else {
      data[key] = e.target.value;
    }
    setProfileData(data);
  };

  const profileSubmit = (e) => {
    e.preventDefault();
    if (isEditable) {
      saveProfile();
    } else {
      saveProfileAndRedirect();
    }
  };
  if (profile) {
    console.log(typeof profile.study_start_year === 'number')
    console.log(typeof profile.study_start_year)
    console.log(new Date(profile.study_start_year))
  }
  return (
    <form onSubmit={profileSubmit}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h4">
            {t("userDetail.ticketRegistrationDetail")}
          </Typography>
        </Grid>
        {profile ? (
          <ProfileGrid container item xs={12} spacing={6}>
            <Grid item xs={12}>
              <GreyText variant="h6">
                {t("userDetail.ticketRegistrationSubtitle")}
              </GreyText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={!isEditable}
                id="outlined-basic"
                label={t('userDetail.firstName')}
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
                label={t('userDetail.lastName')}
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
                label={t('userDetail.dateOfBirth')}
                variant="outlined"
                type="date"
                value={profile.date_of_birth || new Date('1900-01-01T00:00:00')}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleChange("date_of_birth", e)}
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled={!isEditable}
                id="outlined-basic"
                label={t('userDetail.phone')}
                variant="outlined"
                value={profile.mobile_number || '+'}
                fullWidth
                onChange={(e) => handleChange("mobile_number", e)}
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectElement
                disabled={!isEditable}
                id="outlined-basic"
                label={t('userDetail.gender')}
                variant="outlined"
                fullWidth
                value={profile.gender || ""}
                onChange={(e) => handleChange("gender", e)}
                selectData={genderData}
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                id="outlined-basic"
                label={t('userDetail.email')}
                variant="outlined"
                fullWidth
                value={profile.primary_email}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectElement
                disabled={!isEditable}
                id="outlined-basic"
                label={t('userDetail.country')}
                variant="outlined"
                fullWidth
                value={profile.country || ""}
                onChange={(e) => handleChange("country", e)}
                selectData={countries}
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectElement
                disabled={!isEditable}
                id="outlined-basic"
                label={t('userDetail.firstLanguage')}
                variant="outlined"
                fullWidth
                value={profile.first_language || ""}
                onChange={(e) => handleChange("first_language", e)}
                selectData={languages}
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectElement
                disabled={!isEditable}
                id="outlined-basic"
                label={t('userDetail.secondLanguage')}
                variant="outlined"
                value={profile.other_language_1 || ""}
                onChange={(e) => handleChange("other_language_1", e)}
                selectData={languages}
                fullWidth
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DatePicker
                disabled={!isEditable}
                views={["year"]}
                label={t('userDetail.startYear')}
                value={profile && profile.study_start_year ? typeof profile.study_start_year === 'number' ? new Date(profile.study_start_year?.toString()) : profile.study_start_year : new Date('1990-01-01T00:00:00')}
                fullWidth
                required={false}
                onChange={(e) => handleChange("study_start_year", e)}
              />
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: isEditable ? "center" : "right" }}>
              {!isEditable && <Button
                variant="contained"
                color={!isEditable ? "primary" : "default"}
                style={!isEditable ? { backgroundColor: "rgb(52, 168, 83)" } : {}}
                onClick={!isEditable ? enableEdit : discardChanges}
              >
                {!isEditable ? t("common.edit") : t("common.cancel")}
              </Button>}
              &nbsp;&nbsp;
              {!isEditable && (
                <Button variant="contained" color="primary" type="submit">
                  {t("common.next")}
                </Button>
              )}
              {isEditable && (
                <Button variant="contained" color="primary" type="submit">
                  {t("common.save")}
                </Button>
              )}
              {isEditable && <>&nbsp;&nbsp; <Button
                variant="contained"
                color={!isEditable ? "primary" : "default"}
                style={!isEditable ? { backgroundColor: "rgb(52, 168, 83)" } : {}}
                onClick={!isEditable ? enableEdit : discardChanges}
              >{!isEditable ? t("common.edit") : t("common.cancel")}</Button> </>}
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
