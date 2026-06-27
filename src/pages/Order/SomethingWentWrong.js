import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentLayout from "../../layouts/ContentLayout";
import WarningIcon from "@material-ui/icons/Warning";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DoneIcon from "@material-ui/icons/Done";

export default function SomethingWentWrong({ isMembership, details }) {
    const history = useHistory();
    const { t } = useTranslation();
    const { event_slug } = useParams();
    const keycloakSubject = useSelector((s) => s.user?.keycloak?.subject);
    const [copied, setCopied] = React.useState(false);
    const copiedTimer = React.useRef(null);

    // Clear the "copied" reset timer on unmount (Return/Try Again can unmount
    // within 2s) to avoid a state update on an unmounted component.
    React.useEffect(() => () => clearTimeout(copiedTimer.current), []);

    const returnToMainPage = () => {
        if (isMembership) {
            history.push(`/pay/membership`);
            return;
        }
        history.push(`/pay/order/ticket/${event_slug}`);
    };

    // `details` is the real cause passed by the caller (the pricing error object);
    // we append shareable context so support can reproduce/correlate.
    const buildErrorReport = () => {
        const lines = [];
        if (details) {
            lines.push(`Details: ${typeof details === "string" ? details : JSON.stringify(details)}`);
        }
        lines.push(`Time: ${new Date().toISOString()}`);
        lines.push(`URL: ${window.location.href}`);
        lines.push(`User: ${keycloakSubject || "(not logged in)"}`);
        lines.push(`Version: ${window.APP_CONFIG?.REG_BRANCH || "unknown"}`);
        lines.push(`Agent: ${navigator.userAgent}`);
        return lines.join("\n");
    };

    const copyReport = async () => {
        const text = buildErrorReport();
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            }
            setCopied(true);
            clearTimeout(copiedTimer.current);
            copiedTimer.current = setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Failed to copy error details", e);
        }
    };

    return (
        <ContentLayout>
            <div style={{ position: "relative", textAlign: "center", margin: "20px" }}>
                <Tooltip title={copied ? t("somethingWentWrong.copied") : t("somethingWentWrong.copyDetails")}>
                    <IconButton
                        size="small"
                        onClick={copyReport}
                        aria-label={t("somethingWentWrong.copyDetails")}
                        style={{ position: "absolute", top: 0, right: 0 }}
                    >
                        {copied ? <DoneIcon fontSize="small" /> : <FileCopyOutlinedIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
                <WarningIcon style={{ color: "red", height: "45px", width: "45px" }} />
                <Typography variant="h3">
                    {t("somethingWentWrong.header")}
                </Typography>
                <br />
                <Typography variant="body1">
                    {t("somethingWentWrong.description")}
                </Typography>
                <br />
                <Button
                    color="primary"
                    autoFocus
                    onClick={returnToMainPage}
                    variant="contained">
                    {isMembership
                        ? t("somethingWentWrong.returnMembership")
                        : t("somethingWentWrong.return")}
                </Button>
                {" "}
                <Button
                    color="primary"
                    onClick={() => window.location.reload()}
                    variant="contained">
                    {t("somethingWentWrong.retry")}
                </Button>
            </div>
        </ContentLayout>
    );
}
