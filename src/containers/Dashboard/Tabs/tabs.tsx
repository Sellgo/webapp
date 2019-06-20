import React from 'react';
import { Tab } from 'semantic-ui-react';

const panes = [
  {
    menuItem: 'Seller Performance',
    render: () => <Tab.Pane attached={false}>Seller Performance</Tab.Pane>,
  },
  { menuItem: 'Amz Listing', render: () => <Tab.Pane attached={false}>Amz Listing</Tab.Pane> },
  { menuItem: 'Supplier List', render: () => <Tab.Pane attached={false}>Supplier List</Tab.Pane> },
  { menuItem: 'Inventory', render: () => <Tab.Pane attached={false}>Inventory</Tab.Pane> },
  {
    menuItem: 'Outstanding Items',
    render: () => <Tab.Pane attached={false}>Outstanding Items</Tab.Pane>,
  },
];

const DashBoardTabs = () => <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;

export default DashBoardTabs;
