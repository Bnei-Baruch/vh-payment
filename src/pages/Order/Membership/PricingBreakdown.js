import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import countries from "../../../shared/countries";

export default function PricingBreakdown({ v2Details }) {
  const { t } = useTranslation();
  const countryName = countries.find(c => c.ISO === v2Details.country_code)?.label || v2Details.country_code;
  return (
    <>
      <Typography variant="body2">
        {t("membership.country")}: <b>{countryName}</b>
      </Typography>
      <Typography variant="body2" style={{ marginBottom: 8 }}>
        {t("membership.base_price")}: <b>{v2Details.country_base?.amount} {v2Details.country_base?.currency}</b>
      </Typography>
      {v2Details.discounts?.length > 0 && (
        <>
          <Typography variant="caption" style={{ fontWeight: 600, textTransform: "uppercase", color: "#888" }}>
            {t("membership.discounts")}
          </Typography>
          {v2Details.discounts.map((d, i) => (
            <Box key={i} style={{ marginTop: 6 }}>
              <Typography variant="body2">
                {t("membership.discount_type")}: <b>{t(`membership.discount_types.${d.type}`, { defaultValue: d.type })}</b>
              </Typography>
              <Typography variant="body2">
                {t("membership.discount_amount")}: <b>{d.amount_pct}%</b>
              </Typography>
              <Typography variant="body2">
                {t("membership.eligibility")}: <b>{d.eligible ? "✓" : "✗"}</b>
                {d.error && (
                  <Typography variant="caption" style={{ color: "#d32f2f", marginLeft: 6 }}>
                    {t("membership.discount_error")}
                  </Typography>
                )}
              </Typography>
            </Box>
          ))}
        </>
      )}
      <Box style={{ marginTop: 10, borderTop: "1px solid #eee", paddingTop: 8 }}>
        <Typography variant="body2">
          {t("membership.final_price")}: <b>{v2Details.final_price?.amount} {v2Details.final_price?.currency}</b>
        </Typography>
      </Box>
    </>
  );
}
