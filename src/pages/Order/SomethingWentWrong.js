import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styledComponents from "styled-components";
import ContentLayout from "../../layouts/ContentLayout";
const HeaderTitle = styledComponents(Typography)`
  text-align: center;
`;
export default function SomethingWentWrong({ isMembership }) {
  const history = useHistory();
  const { t } = useTranslation();
  const { event_slug } = useParams();
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
        <>
          <HeaderTitle variant="h3">
            {t("somethingWentWrong.header")}
          </HeaderTitle>{" "}
          <br />
          <Typography variant="body1">
            {t("somethingWentWrong.description")}
          </Typography>
          <div style={{ textAlign: "center", margin: "20px" }}>
            <Button
              color="primary"
              autoFocus
              onClick={returnToMainPage}
              variant="contained"
            >
              {isMembership
                ? t("somethingWentWrong.returnMembership")
                : t("somethingWentWrong.return")}
            </Button>
          </div>
        </>
      </ContentLayout>
    </>
  );
}
