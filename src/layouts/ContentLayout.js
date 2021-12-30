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
      style={{padding: '20px', minHeight: 'calc(100vh - 160px)'}}>
      <Grid item xs={12} sm={12} md={8} lg={6} style={{margin: 'auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 14px 0 rgb(53 64 82 / 5%)'}}>
        {children}
      </Grid>
    </Grid>
  )
};

export default ContentLayout;
