import * as React from 'react';
import { Grid, Segment, Modal, Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import CallToAction from '../Synthesis/Supplier/CallToAction';
import get from 'lodash/get';
import ProductFilters from './ProductFilter/index';
import ProductTrackerTable from './ProductTrackerTable';
import './index.scss';

class ProductTracker extends React.Component {
  render() {
    return (
      <>
        <PageHeader
          title=""
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Profit Finder', to: '/synthesis' },
            { content: 'Supplier Name' },
          ]}
          callToAction={<CallToAction />}
        />
        <Segment basic={true} className="setting">
          <Grid className="product-tracker">
            <Grid.Row>
              <Grid.Column className="left-column" floated="left">
                <ProductFilters />
                )}
              </Grid.Column>

              <Grid.Column className="right-column" floated="right">
                <div className="search-product">
                  <label>Search Your Product:</label>
                  <Search placeholder="Search UPC/ASIN" />
                </div>
                <ProductTrackerTable />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    );
  }
}

export default ProductTracker;
