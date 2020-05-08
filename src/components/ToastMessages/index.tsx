import React from 'react';
import { Header } from 'semantic-ui-react';
import './index.scss';

export const UntrackSuccess = (
  <>
    <Header className="untrack-success" as="h3">
      Product Successfully Untracked
      <Header.Subheader>You may add a new product through profit finder</Header.Subheader>
    </Header>
  </>
);

export const EmailSuccess = (
  <>
    <Header className="email-update-success" as="h3">
      Email Has Been Changed
      <Header.Subheader>You have Successfully changed your email</Header.Subheader>
    </Header>
  </>
);

export const Asin = (props: any) => {
  return (
    <>
      <Header className="email-update-success" as="h3">
        {props.header}
        <Header.Subheader>{props.subheader}</Header.Subheader>
      </Header>
    </>
  );
};
