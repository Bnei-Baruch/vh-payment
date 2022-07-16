import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as qs from "query-string";
import { paymentSuccess } from "../../services/orderservice";
import {
  addAParticipant,
  getParticipantByEmail,
} from "../../services/participants.service";
import { addPariticpantInEvent } from "../../services/event.service";
import { getEventsProductBySlug } from "../../services/productservice";
import { getQueryParams } from "../../utils/common";
import Loader from "../../components/Loader";
import { getUserProfileData } from "../../services/userservice";
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
let loading = false;
export default function UserDetail() {
  const history = useHistory();
  const { i18n } = useTranslation();
  const user = useSelector((state) => state.user);
  const keycloak = useSelector((state) => state.user.keycloak);
  const { event_slug, participation_option } = useParams();
  const [profile, setProfileData] = useState(undefined);
  const [participantId, setParticipantId] = useState(undefined);
  const [eventData, setEventData] = useState(undefined);
  let ManualPayment = getQueryParams("ManualPayment");
  React.useEffect(() => {
    const data = getEventsProductBySlug(event_slug);
    if (data) {
      setEventData(data);
    }
    if (!ManualPayment) {
      postSuccessPayment();
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (keycloak !== null && profile === undefined && !loading) {
      loading = true;
      getUserProfileData(keycloak.subject)
        .then((res) => {
          setProfileData(res);
        })
        .catch(() => {
          registerPariticpantAddToEvent();
        });
    }
  }, [keycloak]);

  React.useEffect(() => {
    if (profile && profile.primary_email) {
      getParticipantByEmail(profile.primary_email)
        .then((res) => {
          if (res) {
            const { id } = res;
            setParticipantId(id);
          } else {
            registerPariticpantAddToEvent();
          }
        })
        .catch(() => {
          registerPariticpantAddToEvent();
        });
    }
  }, [profile]);

  //Adding Participant to Event if already Exists
  React.useEffect(() => {
    if (participantId) {
      const eventBody = {
        participation_option: participation_option,
        participant_id: participantId,
        event_id: eventData.event.id,
        notification: true,
        notification_type: "confirmation",
        registration_date: new Date().toISOString(),
      };
      addPariticpantInEvent(eventBody).then(() => {
        history.push(
          `/pay/order/register/${participation_option}/userdetail/success/${event_slug}`
        );
      });
    }
  }, [participantId]);

  const registerPariticpantAddToEvent = () => {
    const data = profile ? { ...profile } : {};
    const participantdata = {
      keycloak_id: user.keycloak.subject,
      first_language: data.first_language || i18n.language,
      email_language: i18n.language,
      dob: data.date_of_birth
        ? new Date(data.date_of_birth).toISOString()
        : new Date("1900-01-01").toISOString(),
      gender: data.gender || "male",
      email: data.primary_email || keycloak.profile.email,
      country: data.country || "NODATA",
      first_name: data.first_name_vernacular || keycloak.profile.firstName,
      last_name: data.last_name_vernacular || keycloak.profile.lastName,
    };
    addAParticipant(participantdata).then((res) => {
      if (res) {
        const eventBody = {
          //Should be the option of the user pariticpant.
          participation_option: participation_option,
          participant_id: res.id,
          event_id: eventData.event.id,
          notification: true,
          notification_type: "confirmation",
          registration_date: new Date().toISOString(),
        };
        addPariticpantInEvent(eventBody).then(() => {
          history.push(
            `/pay/order/register/${participation_option}/userdetail/success/${event_slug}`
          );
        });
      }
    });
  };

  const postSuccessPayment = async () => {
    let q = qs.parse(window.location.search);
    if (Object.keys(q).length !== 0 && !ManualPayment) {
      await paymentSuccess(q);
    }
  };
  return <Loader />;
}
