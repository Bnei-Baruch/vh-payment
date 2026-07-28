import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { redeemCoupon } from "../../../services/couponservice";
import { setMembershipProduct } from "../../../redux/actions/orderActions";

// Coupon redemption on the membership price-summary step. On success it clears
// the cached membership product, which makes useMembershipProduct re-fetch the
// price — the coupon then shows in the pricing breakdown (v2Details.discounts).
export default function CouponInput() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onApply = async () => {
    const trimmed = code.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await redeemCoupon(trimmed);
      dispatch(setMembershipProduct(undefined)); // triggers pricing re-fetch
    } catch (e) {
      setError(e?.response?.data?.error || t("membership.coupon.error"));
      setSubmitting(false);
    }
  };

  return (
    <Box style={{ maxWidth: 400, width: "100%", margin: "auto" }}>
      <Typography variant="subtitle2" style={{ marginBottom: 8 }}>
        {t("membership.coupon.title")}
      </Typography>
      <Box display="flex" style={{ gap: 8 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder={t("membership.coupon.placeholder")}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") onApply();
          }}
          disabled={submitting}
        />
        <Button variant="contained" color="primary" onClick={onApply} disabled={submitting || !code.trim()}>
          {t("membership.coupon.apply")}
        </Button>
      </Box>
      {error && (
        <Typography variant="body2" style={{ color: "red", marginTop: 8 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
