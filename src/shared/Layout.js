import React from 'react';
import {Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';

const Layout = ({children}) => {
  const {dir} = useSelector(state => state.payment);

  return (
    <Grid
      dir={dir}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{minHeight: '100vh'}}>
      <Grid item xs={3}>
        {children}
      </Grid>
    </Grid>
  )
};

export default Layout;
