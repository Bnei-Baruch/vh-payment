import React, {useEffect, useState} from "react";
import {Box, Button, CardContent, CircularProgress, Paper, Typography} from "@material-ui/core";
import ContentLayout from "../../../layouts/ContentLayout";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getEventsProductBySlug} from "../../../services/productservice";
import {addAParticipant, getParticipantByEmail} from "../../../services/participants.service";
import {addPariticpantInEvent} from "../../../services/event.service";
import {getProfile} from "../../../services/userservice";
import SomethingWentWrong from "../SomethingWentWrong";

const BoxContainer = styled(Box)`
  padding: 40px 20px;
  justify-content: center;
  text-align: center;
`;

export default function FastRegistration() {
    const {t, i18n} = useTranslation();
    const { event_slug } = useParams();
    const user = useSelector((state) => state.user);
    const userProfileData = useSelector((state) => state.user.profileData);

    const [loading, setLoading] = useState(true);
    const [posted, setPosted] = useState(false);
    const [postErr, setPostErr] = useState(undefined);

    useEffect(() => {
        if (
            user.authenticated &&
            !posted &&
            userProfileData &&
            userProfileData.primary_email
        ) {
            setPosted(true);
            const eventData = getEventsProductBySlug(event_slug);

            getParticipantByEmail(userProfileData.primary_email)
                .then((res) => {
                    if (res) {
                        const data = {
                            participation_option: "membership",
                            participant_id: res.id,
                            event_id: eventData.event.id,
                            notification: true,
                            notification_type: "confirmation",
                            registration_date: new Date().toISOString(),
                            confirmed: true,
                        };
                        addPariticpantInEvent(data)
                            .catch((e) => {
                                setPostErr(e);
                                console.error(e);
                            });
                    }
                })
                .catch(async (e) => {
                    console.info("participant not found. creating", e)
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
                    addAParticipant(data)
                        .then((res) => {
                            if (res) {
                                const data = {
                                    participation_option: "membership",
                                    participant_id: res.id,
                                    event_id: eventData.event.id,
                                    registration_date: new Date().toISOString(),
                                    confirmed: true,
                                    notification: true,
                                    notification_type: "confirmation",
                                };
                                addPariticpantInEvent(data)
                                    .catch((e) => {
                                        setPostErr(e);
                                        console.error(e)
                                    });
                            }
                        })
                        .catch((e) => {
                            setPostErr(e);
                            console.error(e)
                        });
                })
                .finally(() => setLoading(false));
        }
        // eslint-disable-next-line
    }, [event_slug, user, userProfileData])

    if (loading) {
        return (
            <ContentLayout>
                <Paper elevation={0}>
                    <CardContent>
                        <BoxContainer component="header">
                            <CircularProgress m={2} color="secondary"/>
                            <Typography
                                variant="h1"
                                component="h1"
                                style={{fontSize: 36, marginBottom: 20, fontWeight: "normal"}}>
                                {t("order.processing")}
                            </Typography>
                            <Typography style={{fontSize: 18}}>
                                {t("order.processing_event_registration_mb")}
                            </Typography>
                        </BoxContainer>
                    </CardContent>
                </Paper>
            </ContentLayout>
        );
    }

    if (postErr) {
        return <SomethingWentWrong/>;
    }

    return (
        <ContentLayout>
            <Paper elevation={0}>
                <CardContent>
                    <BoxContainer component="header">
                        <CheckCircleIcon style={{color: "#0D9D0D", height: "45px", width: "45px"}}/>
                        <Typography
                            variant="h1"
                            component="h1"
                            style={{fontSize: 36, marginBottom: 20, fontWeight: "normal"}}>
                            {t("order.allGood")}
                        </Typography>
                        <Typography style={{fontSize: 18}}>
                            {t("order.successfully_registered")}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginTop: 20}}
                            onClick={() => {
                                window.location.href = window.location.origin + "/dash/events";
                            }}>
                            {i18n.language === "he" ?
                                (<ArrowForwardIosIcon style={{height: "12px", width: "12px"}}/>) :
                                (<ArrowBackIosIcon style={{height: "12px", width: "12px"}}/>)
                            }
                            {" "}
                            {t("order.back_to_event")}
                        </Button>
                    </BoxContainer>
                </CardContent>
            </Paper>
        </ContentLayout>
    );
}
