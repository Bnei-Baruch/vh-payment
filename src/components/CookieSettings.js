import React, {useEffect, useState} from "react";
import {Box, IconButton, Tooltip} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import cookieIcon from "../images/cookie.svg";
// Reopens the CookieYes preferences, so consent can be changed as easily as it was given (GDPR 7(3)).
// Shown only once CookieYes has loaded: it may be blocked (ad blocker) or its GTM tag not published.
export const useCookieYesLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const onLoad = () => setLoaded(true);
    if (window.revisitCkyConsent) onLoad();
    document.addEventListener("cookieyes_banner_load", onLoad);
    return () => document.removeEventListener("cookieyes_banner_load", onLoad);
  }, []);
  return loaded;
};
const CookieSettings = ({className}) => {
  const {t} = useTranslation();
  return useCookieYesLoaded() && (
    <Box display="flex" alignItems="center" className={className}>
      <Tooltip title={t("appbar.cookieSettings")}>
        <IconButton size="small" aria-label={t("appbar.cookieSettings")} onClick={() => window.revisitCkyConsent?.()}>
          <img src={cookieIcon} alt="" width={22} height={22}/>
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default CookieSettings;
