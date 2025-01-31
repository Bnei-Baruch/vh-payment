import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Menu, MenuItem, IconButton as MuiIconButton } from "@material-ui/core";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { PAYMENT_ROUTES } from "../../routes/paymentRoutes";
import ModalWindow from "../ModalWindow/ModalWindow";
import { setLoggedInUser } from "../../redux/actions/userActions";

const UserIconButton = styled(MuiIconButton)`
  font-size: 16px !important;
  span,
  label {
    color: #5a5a5a;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover {
    background-color: transparent;
  }
`;

export const UserMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const onProfileClick = () => {
    window.location.href = window.location.origin + PAYMENT_ROUTES.Profile
  };

  const onLogOutClick = () => {
    closeMenu();
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onAuthLogout = () => {
    state.keycloak.logout();
    dispatch(setLoggedInUser(null));
    handleCloseModal();
  };

  return (
    <>
      <UserIconButton
        aria-owns={anchorMenu ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
      >
        <AccountCircleIcon />
        &nbsp;
        {state.profile.firstName + " " + state.profile.lastName}
        &nbsp; <KeyboardArrowDownIcon />
      </UserIconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={onProfileClick}>
          {t("userMenu.profile")}
        </MenuItem>
        <MenuItem onClick={onLogOutClick}>{t("userMenu.logOut")}</MenuItem>
      </Menu>
      <ModalWindow
        open={isModalOpen}
        contentText={t("userMenu.logOutText")}
        confirmBtnText={t("userMenu.yesBtn")}
        closeBtnText={t("userMenu.cancelBtn")}
        handleClose={handleCloseModal}
        onConfirmation={onAuthLogout}
      />
    </>
  );
};
