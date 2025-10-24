import React, {useEffect, useState} from "react";
import {
  AppBar,
  Box,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  Toolbar,
  Typography,
} from "@material-ui/core";
import hebLogo from "../images/heb-logo.png";
import enLogo from "../images/en-logo.png";
import { makeStyles } from "@material-ui/styles";
import LanguagePicker from "../components/LanguagePicker";
import CurrencyPicker from "../components/CurencyPicker";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { UserMenu } from "../components/UserMenu/UserMenu";
import styled from "styled-components";
import { shouldShowCurrencyPicker } from "../shared/featureFlags";

const useStyles = makeStyles({
  appbar: {
    // boxShadow:
    //   'rgb(0 0 0 / 20%) 0 3px 1px -2px, rgb(0 0 0 / 14%) 0 2px 2px 0, rgb(0 0 0 / 12%) 0 1px 5px 0',
    backgroundColor: "#fff",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 24px",
    maxHeight: 65,
  },
  image: {
    maxHeight: 65,
  },
  text: {
    fontWeight: 700,
    fontSize: 20,
    marginInlineStart: 4,
  },
  menu: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 20,
  },
  currencySign: {
    fontSize: 22,
    marginInlineEnd: 8,
    color: "#595959",
  },
  subtitle: {
    color: "#4aa5ff",
    fontSize: 12,
    marginInlineStart: 4,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  mobileHidden: {
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
});
const MembershipStatusContainer = styled(Box)`
  float: right;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
`;
const MemberShipContainer = styled(Grid)`
  display: flex;
  align-items: center;
`;
const MembershipHeaderText = styled(Typography)`
  color: #000;
  font-weight: normal;
  margin-right: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`;
const MembershipStatusText = styled(Typography)`
  color: ${(props) => props.textcolor};
  display: flex;
  align-items: center;

  svg {
    width: 10px;
    color: ${(props) => props.color};
    margin-right: 5px;
  }
`;

const HeaderLayout = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { dir, id: languageId } = useSelector((state) => state.language);
  const { appbar } = useSelector((state) => state.order);
  const membership = useSelector((state) => state.user.membershipdataV2);
  const [active, setActive] = useState(false);

  // Choose logo based on language
  const currentLogo = languageId === 'he' ? hebLogo : enLogo;

  useEffect(() => {
    if (membership) {
      setActive(membership.active);
    }
  }, [membership]);

  return (
    <AppBar
      color="default"
      position="relative"
      dir={dir}
      className={classes.appbar}
    >
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logoWrapper}>
          <img
            className={classes.image}
            src={appbar.logo || currentLogo}
            alt="Logo"
          />
        </Box>

        <Box className={classes.menu}>
          {shouldShowCurrencyPicker() && (
            <Box
              display="flex"
              alignItems="center"
              className={classes.mobileHidden}
            >
              <InputLabel style={{ color: "#000" }}>
                {t("appbar.currency")} :{" "}
              </InputLabel>{" "}
              &nbsp;
              <FormControl>
                <CurrencyPicker />
              </FormControl>
            </Box>
          )}
          <MemberShipContainer item xs>
            <MembershipStatusContainer component="span">
              <MembershipHeaderText variant="body1">
                {t("appbar.membership")}
              </MembershipHeaderText>
              <MembershipStatusText
                variant="body1"
                textcolor={
                  active
                    ? "#0d9d0d !important"
                    : "#ff0000 !important"
                }
              >
                <FiberManualRecordIcon />{" "}
                {active
                  ? t("membership.active")
                  : t("membership.inactive")}
              </MembershipStatusText>
            </MembershipStatusContainer>
          </MemberShipContainer>

          <Box
            display="flex"
            alignItems="center"
            className={classes.mobileHidden}
          >
            <LanguagePicker />
          </Box>

          <Box>
            <UserMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderLayout;
