import React from 'react';
import {CircularProgress} from '@material-ui/core';
import ContentLayout from '../layouts/ContentLayout';

const Loader = () => (
  <ContentLayout>
    <CircularProgress size={50}/>
  </ContentLayout>
);

export default Loader;
