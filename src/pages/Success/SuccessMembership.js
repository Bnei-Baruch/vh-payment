import React, {useEffect, useState} from "react";
import {Box, Button, CardContent, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import ContentLayout from "../../layouts/ContentLayout";
import {useParams} from "react-router-dom";
import * as qs from "query-string";
import {paymentSuccess} from "../../services/orderservice";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Loader from "../../components/Loader";

const useStyles = makeStyles({
    header: {
        marginBottom: 40,
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
const SuccessMembership = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    const {pdt} = useParams();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const [paymentSent, setPaymentSent] = useState(false);

    /**
     * This Useeffect sends the payments detail
     * to backend after successful payment completion.
     */
    useEffect(() => {
        console.log('SuccessMembership useEffect [pdt, user]', pdt, user, window.location.search)

        let q = qs.parse(window.location.search);
        if (!paymentSent && user.authenticated && Object.keys(q).length !== 0) {
            setPaymentSent(true)
            paymentSuccess(q)
                .then(() => {
                    if (pdt === "jan2022ticket") {
                        setTimeout(() => {
                            window.location.href = `${window.location.origin}/register/success`;
                        }, 3000);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                })
                .finally(() => setLoading(false));
        }
    }, [pdt, user]);

    const returnToMembershipArea = () => {
        window.location.href = window.location.origin + "/dash/membership";
    };

    if (loading) {
        return <Loader/>;
    }

    return (
        <ContentLayout>
            <Paper elevation={0}>
                <CardContent>
                    <Box component="header" className={classes.header}>
                        <CheckCircleIcon style={{color: "#0D9D0D", height: "45px", width: "45px"}}/>
                        <Typography
                            variant="h1"
                            component="h1"
                            style={{fontSize: 36, marginBottom: 20, fontWeight: "normal"}}>
                            {t("order.payment_success")}
                        </Typography>
                        <Typography style={{fontSize: 18}}>
                            {t("order.membershipPaymentSuccess")}
                        </Typography>
                        <br/>
                        <div style={{textAlign: "center"}}>
                            <Button
                                onClick={returnToMembershipArea}
                                color="primary"
                                autoFocus
                                style={{margin: "auto"}}
                                variant="contained">
                                {t("order.back_to_my_membership")}
                            </Button>
                        </div>
                    </Box>
                </CardContent>
            </Paper>
        </ContentLayout>
    );
};

export default SuccessMembership;
