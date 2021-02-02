import React from 'react';
import {CircularProgress} from '@material-ui/core';
import Layout from './Layout';

const Loader = () => (
  <Layout>
    <CircularProgress size={50}/>
  </Layout>
);

export default Loader;
