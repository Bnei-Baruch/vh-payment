import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

const ContentLayout = ({ children }) => {
  const { dir } = useSelector((state) => state.language);
  const containerStyle = { padding: "20px", minHeight: "calc(100vh - 160px)" };
  const layoutStyle = {
    margin: "auto",
    padding: "20px",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 0 14px 0 rgb(53 64 82 / 5%)",
  };
  return (
    <Grid
      dir={dir}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={containerStyle}
    >
      <Grid item xs={12} sm={12} md={8} lg={6} style={layoutStyle}>
        {children}
      </Grid>
    </Grid>
  );
};

export default ContentLayout;
