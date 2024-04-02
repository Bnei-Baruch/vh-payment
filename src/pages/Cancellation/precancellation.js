import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ContentLayout from "../../layouts/ContentLayout";
const CancellatioContainer = styled(Grid)`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;
export default function PreCancellation() {
  const { t } = useTranslation();
  const history = useHistory();
  const [state, setState] = React.useState({
    reason: "",
    additionalSuggestion: "",
  });
  const moveToConfirmationScreen = () => {
    history.push("/pay/membership/cancellation/confirm", {
      state,
    });
  };
  const moveToMembership = () => {
    window.location.href = `${window.location.origin}/dash/membership`;
  };
  return (
    <ContentLayout>
      <CancellatioContainer container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom display="inline">
            {t("cancellation.before_you_go")}
          </Typography>
          <br />
          <br />
          <div>{t("cancellation.precancellation_text")}</div>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {t("cancellation.cancellation_title")}
            </FormLabel>
            <RadioGroup
              name="reason"
              onChange={(event) => {
                setState({ ...state, reason: event.target.value });
              }}
            >
              <FormControlLabel value="notStudying" control={<Radio />} label={t("cancellation.no_longer_stronger")} />
              <FormControlLabel value="financialProblem" control={<Radio />} label={t("cancellation.financial_problem")} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel>{t("cancellation.adding_anything_else")}</FormLabel>
            <br />
            <TextField
              multiline
              minRows={4}
              variant="outlined"
              placeholder={t("cancellation.tell_us_more")}
              value={state.additionalSuggestion}
              onChange={(e) => {
                setState({
                  ...state,
                  additionalSuggestion: e.target.value,
                });
              }}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            marginTop: "25px",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={moveToMembership} variant="contained">
            {t("common.back")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={moveToConfirmationScreen}
            disabled={
              !state.reason &&
              !state.additionalSuggestion
            }
          >
            {t("common.next")}
          </Button>
        </Grid>
      </CancellatioContainer>
    </ContentLayout>
  );
}
