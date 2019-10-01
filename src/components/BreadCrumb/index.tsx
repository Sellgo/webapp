import * as React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

interface BreadCrumbState {
  activeItem: string;
}

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'profitSyn', content: 'Profit Syn', link: true },
  { key: 'supplierName', content: 'Supplier Name', active: true },
];

export default class BreadCrumb extends React.Component<any, BreadCrumbState> {
  state = {
    activeItem: '',
  };

  render() {
    return <Breadcrumb icon="right angle" sections={sections} />;
  }
}
