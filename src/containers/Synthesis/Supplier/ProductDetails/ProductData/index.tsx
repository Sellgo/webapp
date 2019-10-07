import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Divider, Image, Icon } from 'semantic-ui-react';
import get from 'lodash/get';
import { fetchSupplierProductDetails } from '../../../../../actions/Products';
import { ProductDetail } from '../../../../../interfaces/Product';

interface ProductDataProps {
  product: any;
  productDetails: ProductDetail;
  fetchProductDetails: (supplierID: any, productID: any) => void;
}
class ProductData extends Component<ProductDataProps> {
  componentDidMount() {
    const { product, fetchProductDetails } = this.props;
    fetchProductDetails(product.supplierID, product.product_id);
  }

  render() {
    const { productDetails } = this.props;
    if (!productDetails) return '';
    return (
      <Grid>
        <Grid.Column floated="left" width={13}>
          <Grid>
            <Grid.Column>
              <h3>{productDetails.title}</h3>
            </Grid.Column>
            {/*<Grid.Column floated="right" width={2}>{'short Details'}</Grid.Column>*/}
          </Grid>
          <Divider />
          <Grid style={{ margin: 0 }}>
            <Grid.Column style={{ margin: 0 }} floated="left" width={4}>
              <Grid.Row>Price</Grid.Row>
              <Grid.Row>Fees</Grid.Row>
              <Grid.Row>Product Cost</Grid.Row>
              <Grid.Row>Package Quantity</Grid.Row>
              <Grid.Row>Total Cost</Grid.Row>
              <Grid.Row>
                <h4>{'Profit (in $)'}</h4>
              </Grid.Row>
              <Grid.Row>
                <h4>{'Margin'}</h4>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <Grid.Row>
                {productDetails.price === null ? 0 : Number(productDetails.price).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                {productDetails.fees === null ? 0 : Number(productDetails.fees).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                {productDetails.product_cost === null
                  ? 0
                  : Number(productDetails.product_cost).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                {productDetails.package_quantity === null
                  ? 1
                  : Number(productDetails.package_quantity).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                {productDetails.total_cost === null
                  ? 0
                  : Number(productDetails.total_cost).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                <h4>
                  {productDetails.profit === null
                    ? 0
                    : Number(productDetails.profit).toLocaleString()}
                </h4>
              </Grid.Row>
              <Grid.Row>
                <h4>
                  {productDetails.margin === null
                    ? 0
                    : Number(productDetails.margin).toLocaleString() + ' %'}
                </h4>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <Grid.Row>Avg monthly sales</Grid.Row>
              <Grid.Row>Avg monthly revenue</Grid.Row>
              <Grid.Row>Avg monthly profit</Grid.Row>
              <Grid.Row>
                <h4>{'ROI/ Return on Investment'}</h4>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column floated="left" width={4}>
              <Grid.Row>
                {productDetails.monthly_sales === null
                  ? 0
                  : Number(productDetails.monthly_sales).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                {productDetails.monthly_revenue === null
                  ? 0
                  : Number(productDetails.monthly_revenue).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                {productDetails.profit_monthly === null
                  ? 0
                  : Number(productDetails.profit_monthly).toLocaleString()}
              </Grid.Row>
              <Grid.Row>
                <h4>
                  {productDetails.roi === null
                    ? 0
                    : Number(productDetails.roi).toLocaleString() + ' %'}
                </h4>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column floated="right" width={3} style={{ paddingLeft: 30 }}>
          <div style={{ position: 'relative' }}>
            <Image
              src={
                productDetails.image_url !== null
                  ? productDetails.image_url
                  : 'http://localhost:3000/images/intro.png'
              }
              size="tiny"
              style={{ display: 'inline-block' }}
            />
            <a
              style={{ position: 'absolute', right: 20, top: '38%' }}
              href={productDetails.amazon_url}
              target={'_blank'}
            >
              <Icon name="amazon" size={'large'} style={{ color: 'black' }} />
            </a>
          </div>
          <p style={{ marginTop: 10 }}>ASIN: {productDetails.asin}</p>
          <p>UPC: {productDetails.upc}</p>
          {/*<p>{'MSKU'}</p>*/}
          {/*<p>{'FNSKU'}</p>*/}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  productDetails: get(state, 'product.details'),
  product: get(state, 'modals.supplierProductDetail.meta'),
});

const mapDispatchToProps = {
  fetchProductDetails: (supplierID: any, productID: any) =>
    fetchSupplierProductDetails(supplierID, productID),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductData);
