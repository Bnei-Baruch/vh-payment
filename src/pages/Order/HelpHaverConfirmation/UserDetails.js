import {
  FormControl,
  FormLabel,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import ContentLayout from "../../../layouts/ContentLayout";

export default function UserDetails() {
  const [activeStep, setActionStep] = React.useState(0);
  return (
    <ContentLayout>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h1" style={{ textAlign: "center" }}>
            Help Haver for Membership
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {["1", "2", "3"].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          {activeStep === 0 && (
            <>
              <Typography variant="h3">Contact</Typography>
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField id="email" variant="outlined" />
              </FormControl>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Typography variant="h3">Contact</Typography>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <Typography variant="h3">Contact</Typography>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <TextField id="email" variant="outlined" />
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </ContentLayout>
  );
}
