import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Selectors */
import {
  getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Constants */

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ProductSalesTable from './ProductSalesTable';
import ProductSettings from './ProductSettings';

/* Interface */
import { ProductsDatabasePayload } from '../../../../interfaces/ProductResearch/ProductsDatabase';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { AppConfig } from '../../../../config';
import axios from 'axios';
import Placeholder from '../../../../components/Placeholder';
import { TIME_SETTING } from '../../../../constants/PerfectStock/OrderPlanning';

interface Props {
  rowData: any;
}

const ExpandedProduct = (props: Props) => {
  const { rowData } = props;

  const [productProjectedSales, setProductProjectedSales] = React.useState<any[]>([]);
  const [isLoadingProductProjectedSales, setIsLoadingProductProjectedSales] = React.useState(false);
  const [timeSettings, setTimeSettings] = React.useState<string>(TIME_SETTING.WEEK);
  const [showTrends, setShowTrends] = React.useState<boolean>(false);

  const sku = rowData.sku;
  const getProductSales = async () => {
    setIsLoadingProductProjectedSales(true);
    const sellerId = sellerIDSelector();
    const startDate = new Date(new Date()).toISOString().split('T')[0];
    const endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split('T')[0];
    try {
      const EXPANDED_TYPES = 'expected_sales,seasonal_adjustment';
      const UNEXPANDED_TYPES = 'expected_sales';
      const url =
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/order-plan?` +
        `types=${showTrends ? EXPANDED_TYPES : UNEXPANDED_TYPES}` +
        `&sku=${sku}` +
        `&start_date=${startDate}&end_date=${endDate}` +
        `&display_mode=${timeSettings === TIME_SETTING.DAY ? 'daily' : 'weekly'}`;
      const res = await axios.get(url);
      const { data } = res;
      const newProductProjectedSales: any[] = [];
      data.forEach((attribute: any) => {
        if (attribute.expected_sales) {
          newProductProjectedSales.push(attribute.expected_sales);
        } else if (attribute.seasonal_adjustment) {
          newProductProjectedSales.push(attribute.seasonal_adjustment);
        }
      });
      setProductProjectedSales(newProductProjectedSales);
    } catch (error) {
      setProductProjectedSales([]);
      console.log(error);
    }
    setIsLoadingProductProjectedSales(false);
  };

  React.useEffect(() => {
    getProductSales();
  }, [timeSettings, showTrends]);

  return (
    <div className={styles.expandedProduct}>
      <ProductSettings
        productId={rowData.id}
        defaultInventoryThreshold={rowData.stockout_threshold_inventory}
        defaultInventoryThresholdActivated={rowData.stockout_threshhold_inventory_included}
        defaultSeasonalityAdjustorActivated={rowData.default_seasonality_adjustor_activated}
        defaultWeightActivated={rowData.weighted_average_included}
        defaultWeightL30D={rowData.avg_l30d_weight}
        defaultWeightL90D={rowData.avg_l90d_weight}
        defaultWeightL7D={rowData.avg_l7d_weight}
        defaultWeightN30D={rowData.avg_n30d_ly_weight}
        defaultWeightN90D={rowData.avg_n90d_ly_weight}
      />
      <div className={styles.expandedProductTable}>
        <BoxHeader className={styles.tableHeader}>
          WEEKLY EXPECTED SALES WITH SEASONALITY ADJUSTOR
        </BoxHeader>
        <BoxContainer className={styles.tableContainer}>
          {/* Placeholder is used here because the headers are pre-rendered, and the table data is huge */}
          {isLoadingProductProjectedSales ? (
            <Placeholder numberParagraphs={2} numberRows={3} />
          ) : (
            <ProductSalesTable
              timeSettings={timeSettings}
              setTimeSettings={(timeSettings: string) => setTimeSettings(timeSettings)}
              productProjectedSales={productProjectedSales}
              showTrends={showTrends}
              setShowTrends={setShowTrends}
            />
          )}
        </BoxContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  productDatabaseResults: getProductsDatabaseResults(state),
  isLoadingProductDatabase: getIsLoadingProductsDatabase(state),
  productDatabasePaginationInfo: getProductsDatabasePaginationInfo(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedProduct);
