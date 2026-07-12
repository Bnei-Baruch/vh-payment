import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

const LANG_CODE_OVERRIDES = {
  he: "il",
  us: "en",
};

export default function CancellationPolicyLink() {
  const { t, i18n } = useTranslation();
  const langCode = LANG_CODE_OVERRIDES[i18n.language] || i18n.language;

  return (
    <Button
      variant="text"
      color="primary"
      href={`${window.APP_CONFIG.VH_BASE_URL}/cancellation-policy?lang=${langCode}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("membership.cancellation_policy")}
    </Button>
  );
}
