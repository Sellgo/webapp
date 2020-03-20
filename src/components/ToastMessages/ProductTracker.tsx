import React from 'react';
import { Header } from 'semantic-ui-react';
import './ProductTracker.scss';

export const UntrackSuccess = (
  <>
    <Header className="untrack-success" as="h3">
      Product Successfully Untracked
      <Header.Subheader>You may add a new product through profit finder</Header.Subheader>
    </Header>
  </>
);
