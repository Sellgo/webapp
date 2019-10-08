import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader';

class ProductTracker extends React.Component {
  render() {
    return (
      <>
        <PageHeader title="Product Tracker" />
        <Segment basic={true}>
          <Header as="h4">Product Tracker will be coming soon!</Header>
        </Segment>
      </>
    );
  }
}

export default ProductTracker;
