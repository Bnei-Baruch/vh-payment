import React from 'react';
import {Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';

const ContentLayout = ({children}) => {
  const {dir} = useSelector(state => state.language);

  return (
    <Grid
      dir={dir}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        {children}
      </Grid>
    </Grid>
  )
};

export default ContentLayout;
