import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CancellationPolicyLink() {
  const { t, i18n } = useTranslation();

  return (
    <Button
      variant="text"
      color="primary"
      href={`${window.APP_CONFIG.VH_BASE_URL}/cancellation-policy?lang=${
        i18n.language !== "he" ? i18n.language : "il"
      }`}
      target="_blank"
    >
      {t("membership.cancellation_policy")}
    </Button>
  );
}
