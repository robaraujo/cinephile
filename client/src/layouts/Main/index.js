import React from 'react';
import { Container } from '@material-ui/core';

import { Menu } from '../../components';

export default ({ children }) => (
  <Container maxWidth="lg">
    <Menu />
    <main>{children}</main>
  </Container>
);
