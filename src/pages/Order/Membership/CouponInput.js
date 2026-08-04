import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { redeemCoupon } from "../../../services/couponservice";
import { setMembershipProduct, setCouponMessage } from "../../../redux/actions/orderActions";

// Coupon redemption on the membership price-summary step. On success it clears
// the cached membership product, which makes useMembershipProduct re-fetch the
// price — the coupon then shows in the pricing breakdown (v2Details.discounts).
export default function CouponInput() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const couponMessage = useSelector((state) => state.order.couponMessage);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => () => { dispatch(setCouponMessage(null)); }, [dispatch]);

  const onApply = async () => {
    const trimmed = code.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    setError("");
    dispatch(setCouponMessage(null));
    try {
      const result = await redeemCoupon(trimmed);
      const benefitEnd = result.data.data.benefit_end; // inclusive YYYY-MM-DD from server
      const [y, m, d] = benefitEnd.split("-");
      dispatch(setCouponMessage(t("membership.coupon.applied", { date: `${d}-${m}-${y}` })));
      dispatch(setMembershipProduct(undefined)); // triggers pricing re-fetch
    } catch (e) {
      const code = e?.response?.data?.code;
      setError(code ? t(`membership.coupon.${code}`, { defaultValue: t("membership.coupon.error") }) : t("membership.coupon.error"));
    } finally {
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
          onChange={(e) => { setCode(e.target.value.toUpperCase()); dispatch(setCouponMessage(null)); }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onApply();
          }}
          disabled={submitting}
        />
        <Button variant="contained" color="primary" onClick={onApply} disabled={submitting || !code.trim()}>
          {t("membership.coupon.apply")}
        </Button>
      </Box>
      {couponMessage && (
        <Typography variant="body2" style={{ color: "green", marginTop: 8 }}>
          {couponMessage}
        </Typography>
      )}
      {error && (
        <Typography variant="body2" style={{ color: "red", marginTop: 8 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
