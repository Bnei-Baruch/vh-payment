import {Button, Typography} from "@material-ui/core";
import React from "react";
import {useTranslation} from "react-i18next";
import {useHistory, useParams} from "react-router-dom";
import ContentLayout from "../../layouts/ContentLayout";
import WarningIcon from "@material-ui/icons/Warning";

export default function SomethingWentWrong({isMembership}) {
    const history = useHistory();
    const {t} = useTranslation();
    const {event_slug} = useParams();
    const returnToMainPage = () => {
        if (isMembership) {
            history.push(`/pay/membership`);
            return;
        }
        history.push(`/pay/order/ticket/${event_slug}`);
    };
    return (
        <>
            <ContentLayout>
                <div style={{textAlign: "center", margin: "20px"}}>
                    <WarningIcon style={{color: "red", height: "45px", width: "45px"}}/>
                    <Typography variant="h3">
                        {t("somethingWentWrong.header")}
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        {t("somethingWentWrong.description")}
                    </Typography>
                    <br/>
                    <Button
                        color="primary"
                        autoFocus
                        onClick={returnToMainPage}
                        variant="contained">
                        {isMembership
                            ? t("somethingWentWrong.returnMembership")
                            : t("somethingWentWrong.return")}
                    </Button>
                </div>
            </ContentLayout>
        </>
    );
}
