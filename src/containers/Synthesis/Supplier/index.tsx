import * as React from 'react';
import { Grid, Segment, Modal, Icon, Popup, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PageHeader from '../../../components/PageHeader';
import QuotaMeter from '../../../components/QuotaMeter';
import ProductsTable from './ProductsTable';
import get from 'lodash/get';
import ProductDetails from './ProductDetails';
import { closeSupplierProductDetailModal } from '../../../actions/Modals';
import SupplierDetails from './SupplierDetails';
import {
  fetchSupplierDetails,
  resetSupplier,
  fetchSupplierProducts,
  resetSupplierProducts,
  supplierProgress,
  setProductsLoadingDataBuster,
  pollDataBuster,
  fetchSuppliers,
  setLatestSupplier,
  updateSupplierSinglePageItemsCount,
} from '../../../actions/Suppliers';
import {
  profitFinderPageNumber,
  profitFinderPageSize,
  supplierProductsSelector,
  suppliersSelector,
} from '../../../selectors/Supplier';
import './index.scss';
import { dismiss, info } from '../../../utils/notifications';
import SubscriptionMessage from '../../../components/FreeTrialMessageDisplay';
import { Product } from '../../../interfaces/Product';
import { Supplier as SupplierInterface } from '../../../interfaces/Supplier';
import history from '../../../history';
import _ from 'lodash';
import { ProfitFinderFilters } from '../../../interfaces/Filters';

interface SupplierProps {
  stickyChartSelector: boolean;
  supplierDetails: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  match: any;
  productDetailsModalOpen: false;
  closeProductDetailModal: () => void;
  fetchSupplierDetails: (supplierID: any) => Promise<SupplierInterface | undefined>;
  resetSupplier: () => void;
  fetchSupplierProducts: (payload: ProfitFinderFilters) => Promise<Product[] | undefined>;
  resetSupplierProducts: typeof resetSupplierProducts;
  supplierProgress: (supplierID: any) => void;
  progress: any;
  setProductsLoadingDataBuster: typeof setProductsLoadingDataBuster;
  pollDataBuster: () => void;
  reloadSuppliers: () => void;
  suppliers: SupplierInterface[];
  updateSupplierSinglePageItemsCount: () => void;
  singlePageItemsCount: number;
  pageNumber: number;
}
export class Supplier extends React.Component<SupplierProps, any> {
  constructor(props: SupplierProps) {
    super(props);
    this.state = {
      openRecentFiles: false,
    };
  }

  async componentDidMount() {
    const { match, reloadSuppliers, updateSupplierSinglePageItemsCount } = this.props;

    reloadSuppliers();
    updateSupplierSinglePageItemsCount();
    await this.initialData(match.params.supplierID);
  }

  initialData = async (supplierID: any) => {
    const {
      fetchSupplierDetails,
      fetchSupplierProducts,
      supplierProgress,
      setProductsLoadingDataBuster,
      pollDataBuster,
      pageNumber,
      singlePageItemsCount,
    } = this.props;

    supplierProgress(supplierID);

    const results = await Promise.all([
      fetchSupplierDetails(supplierID),
      fetchSupplierProducts({ supplierID, page: pageNumber, per_page: singlePageItemsCount }),
    ]);

    const fetchedProducts: Product[] | undefined = results[1];
    if (fetchedProducts) {
      setProductsLoadingDataBuster(
        fetchedProducts.filter(p => p.data_buster_status === 'processing').map(p => p.product_id)
      );
    }
    pollDataBuster();
  };

  componentWillUnmount() {
    const { resetSupplier, resetSupplierProducts } = this.props;
    resetSupplierProducts();
    resetSupplier();
    dismiss('supplierLoading');
  }

  componentDidUpdate() {
    if (this.props.supplierDetails && this.props.supplierDetails.item_total_count) {
      const loadTime = this.getLoadingTime(this.props.supplierDetails.inventory);
      if (this.props.isLoadingSupplierProducts) {
        info(() => this.handleSupplierLoading(loadTime), {
          toastId: 'supplierLoading',
          className: 'ui message warning notification',
          autoClose: false,
          pauseOnHover: false,
          closeOnClick: false,
          draggable: false,
        });
      }
    }

    if (!this.props.isLoadingSupplierProducts) {
      dismiss('supplierLoading');
    }
  }

  getLoadingTime = (count: number) => {
    const loadingTime = Math.ceil(count / 2000 / 5) * 5;
    return loadingTime;
  };

  handleSupplierLoading = (loadTime: number) => {
    return (
      <div className="notif-content">
        <p className="header">Processing ASINs</p>
        <p className="label">
          <Icon className="clock" />
          {loadTime}s Estimated Processing time
        </p>
      </div>
    );
  };

  selectSupplier = async (supplier: any) => {
    history.push(`/profit-finder/${supplier.supplier_id}`);
    this.setState({ openRecentFiles: false });
    setLatestSupplier(supplier);
    await this.initialData(supplier.supplier_id);
  };

  render() {
    const {
      isLoadingSupplierProducts,
      supplierDetails,
      stickyChartSelector,
      suppliers,
      match,
    } = this.props;
    const searchName =
      supplierDetails && supplierDetails.search ? ` ${supplierDetails.search}` : '';
    let suppliersSortedByUpdateDate: SupplierInterface[] = [];
    if (suppliers && suppliers[0] !== undefined) {
      const all = suppliers.filter(
        supplier => supplier.status !== 'inactive' && supplier.progress !== -1
      );
      suppliersSortedByUpdateDate = _.cloneDeep(all).sort((a, b) =>
        new Date(a.udate) > new Date(b.udate) ? -1 : 1
      );
    }

    const renderSupplierPopup = () => (
      <Popup
        trigger={
          <p
            className="search-title"
            onClick={() => this.setState({ openRecentFiles: !this.state.openRecentFiles })}
          >
            {' '}
            {`${searchName} `} <Icon name="angle down" />
          </p>
        }
        on="click"
        basic={true}
        onClose={() => this.setState({ openRecentFiles: false })}
        open={this.state.openRecentFiles}
        content={
          <div className="recent-files">
            <div className="recent-files-header">
              <p>{'Recent Searches'}</p>
            </div>
            <div className="recent-files-container">
              <Loader active={suppliers[0] === undefined} />

              {suppliersSortedByUpdateDate &&
                suppliersSortedByUpdateDate[0] !== undefined &&
                suppliersSortedByUpdateDate.map((s: SupplierInterface) => (
                  <p
                    className={`supplier-text ${
                      s.supplier_id.toString() === match.params.supplierID
                        ? 'supplier-text-active'
                        : ''
                    }`}
                    key={`supplier-${s.id}`}
                    onClick={() => this.selectSupplier(s)}
                  >
                    {s.search}
                  </p>
                ))}
            </div>
          </div>
        }
        position="top center"
      />
    );
    return (
      <>
        <SubscriptionMessage page={'profit-finder'} />
        <PageHeader
          title={`Profit Finder of ${supplierDetails.search || 'Search'}`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: `Profit Finder` },
            { content: isLoadingSupplierProducts ? '' : renderSupplierPopup() || 'Search' },
          ]}
          callToAction={<QuotaMeter />}
          auth={match.params.auth}
        />

        <Segment basic={true} className="setting">
          <Grid className={`product-chart ${stickyChartSelector ? 'sticky-chart-active' : ''}`}>
            <Grid.Row className="right-column">
              {!isLoadingSupplierProducts && <SupplierDetails />}
            </Grid.Row>
          </Grid>
          <ProductsTable supplierID={this.props.match.params.supplierID} />

          <Modal
            size={'large'}
            open={this.props.productDetailsModalOpen}
            onClose={this.props.closeProductDetailModal}
            closeIcon={true}
          >
            <Modal.Content>
              <ProductDetails />
            </Modal.Content>
          </Modal>
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  supplierDetails: get(state, 'supplier.details'),
  isLoadingSupplierProducts: get(state, 'supplier.isLoadingSupplierProducts'),
  products: supplierProductsSelector(state),
  productDetailsModalOpen: get(state, 'modals.supplierProductDetail.open', false),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  progress: get(state, 'supplier.quota'),
  suppliers: suppliersSelector(state),
  pageNumber: profitFinderPageNumber(state),
  singlePageItemsCount: profitFinderPageSize(state),
});

const mapDispatchToProps = {
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  fetchSupplierDetails: (supplierID: any) => fetchSupplierDetails(supplierID),
  resetSupplier: () => resetSupplier(),
  fetchSupplierProducts: (payload: ProfitFinderFilters) => fetchSupplierProducts(payload),
  resetSupplierProducts: () => resetSupplierProducts(),
  supplierProgress: () => supplierProgress(),
  setProductsLoadingDataBuster,
  pollDataBuster,
  reloadSuppliers: () => fetchSuppliers(),
  updateSupplierSinglePageItemsCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
