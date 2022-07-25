import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import ContentLayout from "../../layouts/ContentLayout";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useParams } from "react-router-dom";
import * as qs from "query-string";
import { paymentSuccess } from "../../services/orderservice";
import {
  addAParticipant,
  getParticipantByEmail,
} from "../../services/participants.service";
import { getEventsProductBySlug } from "../../services/productservice";
import { addPariticpantInEvent } from "../../services/event.service";
import { getProfile } from "../../services/userservice";

const useStyles = makeStyles({
  header: {
    padding: "40px",
    justifyContent: "center",
    textAlign: "center",
  },
  body: {
    marginTop: 40,
  },
  picker: {
    marginInlineEnd: 12,
    fontSize: 48,
  },
  actions: {
    justifyContent: "center",
  },
  secondaryFont: {
    fontFamily: "Abel",
  },
  agree: {
    fontFamily: "Abel",
    fontSize: 16,
  },
  payBtn: {
    fontFamily: "Abel",
    marginRight: 8,
  },
});

const Success = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { pdt, option } = useParams();

  const user = useSelector((state) => state.user);
  const userProfileData = useSelector((state) => state.user.profileData);

  const [loading, setLoading] = useState(false);

  /**
   * This Useeffect sends the payments detail
   * to backend after successful payment completion.
   */
  useEffect(() => {
    let q = qs.parse(window.location.search);
    if (user.authenticated) {
      const eventData = getEventsProductBySlug(pdt);
      paymentSuccess(q)
        .then(() => {
          if (pdt === "jan2022ticket") {
            setTimeout(() => {
              window.location.href = `${window.location.origin}/register/success`;
            }, 3000);
          }
          setLoading(false);
          getParticipantByEmail(userProfileData.primary_email)
            .then((res) => {
              if (res) {
                const { id } = res;
                const data = {
                  participation_option: option,
                  participant_id: id,
                  event_id: eventData.event.id,
                  notification: true,
                  notification_type: "confirmation",
                  registration_date: new Date().toISOString(),
                  confirmed: true,
                };
                addPariticpantInEvent(data);
              }
            })
            .catch(async () => {
              const profileData = await getProfile(user.keycloak.subject);
              const data = {
                keycloak_id: user.keycloak.subject,
                first_language: profileData.first_language,
                email_language: i18n.language,
                dob: profileData.date_of_birth
                  ? new Date(profileData.date_of_birth).toISOString()
                  : new Date().toISOString(),
                gender: profileData.gender,
                email: profileData.primary_email,
                country: profileData.country,
                first_name: profileData.first_name_vernacular,
                last_name: profileData.last_name_vernacular,
              };
              addAParticipant(data).then((res) => {
                if (res) {
                  const data = {
                    //Should be the option of the user pariticpant.
                    participation_option: option,
                    participant_id: res.id,
                    event_id: eventData.event.id,
                    registration_date: new Date().toISOString(),
                    confirmed: true,
                  };
                  addPariticpantInEvent(data);
                }
              });
            });
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [pdt, user]);

  if (!user.authenticated || loading) {
    return <Loader />;
  }

  return (
    <ContentLayout>
      <Paper elevation={0}>
        <CardContent>
          <Box component="header" className={classes.header}>
            <CheckCircleIcon
              style={{ color: "#0D9D0D", height: "45px", width: "45px" }}
            />
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 36, marginBottom: 20, fontWeight: "normal" }}
            >
              {t("order.payment_success")}
            </Typography>
            <Typography style={{ fontSize: 18 }}>
              {t("order.successfully_paid")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />{" "}
              {t("order.back_to_event")}
            </Button>
          </Box>
        </CardContent>
      </Paper>
    </ContentLayout>
  );
};

export default Success;
