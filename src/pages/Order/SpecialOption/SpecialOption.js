import React from "react";
import ContentLayout from "../../../layouts/ContentLayout";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const Container = styled(Grid)`
  padding: 40px 20px;
  background-size: cover;
`;
export default function SpecialOptionInterestical() {
  const history = useHistory();
  const { event_slug } = useParams();
  const { t } = useTranslation();
  const [selection, setSelection] = React.useState("ukraine");
  const moveback = () => {
    history.goBack();
  };

  const moveToNext = () => {
    history.push(
      `/pay/order/ticket/payment/special/${event_slug}/${selection}`
    );
  };
  return (
    <ContentLayout>
      <Container container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" style={{ fontWeight: "normal" }}>
            {t("specialOption.title")}
          </Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: "normal", marginTop: "10px" }}
          >
            {t("specialOption.chose_your_option")}
          </Typography>
          <br />
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {t("specialOption.current_situation")}
            </FormLabel>
            <RadioGroup
              aria-label="country"
              name="country"
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
            >
              <FormControlLabel
                value="ukraine"
                control={<Radio />}
                label="Ukraine"
              />
              <FormControlLabel
                value="russia"
                control={<Radio />}
                label="Russia"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <Button variant="outlined" color="primary" onClick={moveback}>
            <ArrowBackIosIcon style={{ height: "12px", width: "12px" }} />
            {t("common.back")}
          </Button>
          <Button variant="contained" color="primary" onClick={moveToNext}>
            {t("common.next")} &nbsp;{" "}
            <ArrowForwardIosIcon style={{ height: "12px", width: "12px" }} />
          </Button>
        </Grid>
      </Container>
    </ContentLayout>
  );
}
