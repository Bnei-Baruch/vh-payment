import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Sentry from "@sentry/react";

import Keycloak from "keycloak-js";
import {
  setLoggedInUser,
  setMembershipDataV2,
  setUserProfileData,
} from "../../redux/actions/userActions";
import Loader from "../Loader";
import Routes from "../../routes";
import Theme from "../Theme";
import {
  getMembershipStatusV2,
  getUserProfileData,
} from "../../services/userservice";
import { useSelector } from "react-redux";
import HeaderLayout from "../../layouts/HeaderLayout";
import GlassixWidget from "../Glassix";

const Auth = () => {
  const [auth, setAuth] = useState({ keycloak: null, authenticated: false });
  const keycloak = useSelector((state) => state.user.keycloak);
  const dispatch = useDispatch();

  const fetchUserDetails = async (keycloak) => {
    const membership = await getMembershipStatusV2(keycloak.subject);
    dispatch(setMembershipDataV2(membership));

    const userProfileData = await getUserProfileData(keycloak.subject);
    dispatch(setUserProfileData(userProfileData));
  };

  useEffect(() => {
    const login = async () => {
      const keycloak = new Keycloak(window.APP_CONFIG.KEYCLOAK_CONFIG);
      const authenticated = await keycloak.init({
        onLoad: "login-required",
        checkLoginIframe: false,
      });
      await keycloak.loadUserProfile();
      const profile = {
        username: keycloak.profile.username,
        firstName: keycloak.profile.firstName,
        lastName: keycloak.profile.lastName,
        email: keycloak.profile.email,
      };

      Sentry.setUser({
        id: keycloak.subject,
        email: keycloak.profile.email,
        username: keycloak.profile.username,
      });

      setAuth({
        keycloak,
        authenticated,
        profile,
      });
    };

    login().catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    dispatch(setLoggedInUser(auth));
  }, [dispatch, auth]);

  useEffect(() => {
    if (keycloak !== null) fetchUserDetails(keycloak);
    // eslint-disable-next-line
  }, [keycloak]);

  if (auth.keycloak) {
    if (auth.authenticated) {
      return (
        <Theme>
          <HeaderLayout />
          <Routes />
          <GlassixWidget />
        </Theme>
      );
    }

    return <h1>Error</h1>;
  }

  return <Loader />;
};

export default Auth;
