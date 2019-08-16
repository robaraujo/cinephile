import React from 'react';

import { MoviesList, Slider } from '../../components';
import MainLayout from '../../layouts/Main';

export default () => (
  <MainLayout>
    <Slider />
    <MoviesList />
  </MainLayout>
);
