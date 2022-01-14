import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Constants */
import { TIME_SETTING } from '../../../../constants/PerfectStock/OrderPlanning';
import { GRAPH_SETTING_OPTIONS } from '../../../../constants/PerfectStock';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import Placeholder from '../../../../components/Placeholder';
import InventorySettings from './InventorySettings';
import InventorySkuStatus from './InventorySkuStatus';
import InventorySalesTable from './InventorySalesTable';
import InventorySalesGraph from './InventorySalesGraph';

/* Interface */
import {
  ProductProjectedSales,
  GraphDataSeries,
} from '../../../../interfaces/PerfectStock/SalesProjection';
import { DateRange } from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { AppConfig } from '../../../../config';
import { getDateOnly } from '../../../../utils/date';

/* Selectors */
import {
  getDateRange,
  getIsLoadingInventoryTableResults,
  getTimeSetting,
} from '../../../../selectors/PerfectStock/OrderPlanning';

interface Props {
  rowData: any;
  timeSetting: string;
  dateRange: DateRange;
}

const ExpandedInventory = (props: Props) => {
  const { rowData, timeSetting, dateRange } = props;

  const [productProjectedSales, setProductProjectedSales] = React.useState<ProductProjectedSales[]>(
    []
  );
  const [graphProductProjectedSalesData, setGraphProductProjectedSalesData] = React.useState<
    GraphDataSeries[]
  >([]);
  const [isLoadingProductProjectedSales, setIsLoadingProductProjectedSales] = React.useState(false);
  const [showTrends, setShowTrends] = React.useState<boolean>(false);

  /* ======================================================= */
  /* Retrieve product projected sales and seasonality data */
  /* ======================================================= */
  const getProductSales = async () => {
    setIsLoadingProductProjectedSales(true);
    const sellerId = sellerIDSelector();
    const sku = rowData.sku;
    const startDate = getDateOnly(new Date(dateRange.startDate));
    const endDate = getDateOnly(new Date(dateRange.endDate));
    try {
      /* Fetch either only expected_sales or both expected_sales and seasonal adjustment */
      const EXPANDED_TYPES = 'expected_sales,seasonal_adjustment';
      const UNEXPANDED_TYPES = 'expected_sales';

      /* Fetch data from the server */
      const url =
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/order-plan?` +
        `types=${showTrends ? EXPANDED_TYPES : UNEXPANDED_TYPES}` +
        `&sku=${sku}` +
        `&start_date=${startDate}&end_date=${endDate}` +
        `&display_mode=${timeSetting === TIME_SETTING.DAY ? 'daily' : 'weekly'}`;
      const res = await axios.get(url);
      const { data } = res;
      const newProductProjectedSales: ProductProjectedSales[] = [];
      const newGraphProductProjectedSalesData: GraphDataSeries[] = [];

      /* Format data for the graph and table */
      data.forEach((attribute: any) => {
        if (attribute.expected_sales) {
          /* Add expected sales to the table data */
          newProductProjectedSales.push(attribute.expected_sales);

          /* Add expected sales to the graph data */
          const graphDataSeries = {
            name: 'Expected Sales',
            type: GRAPH_SETTING_OPTIONS.LINE,
            data: Object.values(attribute.expected_sales) as number[],
          };
          newGraphProductProjectedSalesData.push(graphDataSeries);
        } else if (attribute.seasonal_adjustment) {
          /* Add expected sales to the table data */
          newProductProjectedSales.push(attribute.seasonal_adjustment);

          /* Add expected sales to the graph data */
          const graphDataSeries = {
            name: 'Seasonality Adjustment',
            type: GRAPH_SETTING_OPTIONS.LINE,
            data: Object.values(attribute.seasonal_adjustment) as number[],
          };
          newGraphProductProjectedSalesData.push(graphDataSeries);
        }
      });
      setProductProjectedSales(newProductProjectedSales);
      setGraphProductProjectedSalesData(newGraphProductProjectedSalesData);
    } catch (error) {
      setProductProjectedSales([]);
      setGraphProductProjectedSalesData([]);
      console.error(error);
    }
    setIsLoadingProductProjectedSales(false);
  };

  React.useEffect(() => {
    getProductSales();
  }, [timeSetting, showTrends, dateRange.startDate, dateRange.endDate]);

  return (
    <div className={styles.expandedInventory}>
      <InventorySettings
        productId={rowData.id}
        defaultInventoryThresholdActivated={false}
        defaultInventoryThreshold={0}
        defaultSeasonalityAdjustorActivated={false}
      />
      <div className={styles.expandedProductDetailsWrapper}>
        <InventorySkuStatus className={styles.skuStatusContainer} />
        <div className={styles.salesProjectionContainer}>
          <BoxHeader className={styles.tableHeader}>
            WEEKLY EXPECTED SALES WITH SEASONALITY ADJUSTOR
          </BoxHeader>
          <BoxContainer className={styles.tableContainer}>
            {/* Placeholder is used here because the headers are pre-rendered, and the table data is huge */}
            {isLoadingProductProjectedSales ? (
              <Placeholder numberParagraphs={2} numberRows={3} />
            ) : (
              <>
                <InventorySalesTable
                  productProjectedSales={productProjectedSales}
                  showTrends={showTrends}
                  setShowTrends={setShowTrends}
                />
                <InventorySalesGraph
                  data={graphProductProjectedSalesData}
                  timeSetting={timeSetting}
                  xAxisStartDate={
                    productProjectedSales.length > 0 ? Object.keys(productProjectedSales[0])[0] : ''
                  }
                  className={styles.graphContainer}
                />
              </>
            )}
          </BoxContainer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    dateRange: getDateRange(state),
    timeSetting: getTimeSetting(state),
    isLoadingInventoryTableResults: getIsLoadingInventoryTableResults(state),
  };
};

export default connect(mapStateToProps)(ExpandedInventory);
