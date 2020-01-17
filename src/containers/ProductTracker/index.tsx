import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader';
import ProductFilters from './ProductFilter/index';
import ProductTrackerTable from './ProductTrackerTable';
import './index.scss';
import QuotaMeter from '../../components/QuotaMeter';

class ProductTracker extends React.Component {
  render() {
    return (
      <>
        <PageHeader
          title=""
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Product Tracker', to: '/product-tracker' },
            { content: 'All Groups' },
          ]}
          callToAction={<QuotaMeter />}
        />
        <Segment basic={true} className="setting">
          <Grid className="product-tracker">
            <Grid.Row>
              <Grid.Column className="left-column" floated="left">
                <ProductFilters />
              </Grid.Column>

              <Grid.Column className="right-column" floated="right">
                <div className="search-product">
                  {/* <label>Search Your Product:</label>
                  <Search placeholder="Search UPC/ASIN" /> */}
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
