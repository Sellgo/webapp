import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getSellerSubscription } from '../../../../../selectors/Subscription';
import {
  getSellerInventoryTableExpandedRow,
  getSellerInventoryProductsTableResults,
  getSellerInventoryProductsTablePaginationInfo,
} from '../../../../../selectors/SellerResearch/SellerInventory';

/* Components */
import TableExport from '../../../../../components/NewTable/TableExport';
import TableResultsMessage from '../../../../../components/TableResultsMessage';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../../assets/images/csvExportImage.svg';

/* Utils */
import { success } from '../../../../../utils/notifications';

/* Interfaces */
import { SellerSubscription } from '../../../../../interfaces/Seller';
import { SellerInventoryProductsTablePaginationInfo } from '../../../../../interfaces/SellerResearch/SellerInventory';

/* Hooks */
import { useProductsExportSocket } from '../../SocketProviders/ProductsExportProvider';

interface Props {
  sellerSubscription: SellerSubscription;
  sellerInventoryTableExpandedRow: any;
  sellerInventoryProductsTableResults: any[];
  sellerInventoryProductsTablePaginationInfo: SellerInventoryProductsTablePaginationInfo;
}

const ProductsExport = (props: Props) => {
  const {
    sellerSubscription,
    sellerInventoryTableExpandedRow,
    sellerInventoryProductsTableResults,
    sellerInventoryProductsTablePaginationInfo,
  } = props;
  const { handleProductsExport } = useProductsExportSocket();

  const merchantId = sellerInventoryTableExpandedRow && sellerInventoryTableExpandedRow.id;

  /* Disable export if month based subscription */
  const shouldDisableExport = sellerSubscription && sellerSubscription.payment_mode === 'monthly';

  const handleExport = (type: 'xlsx' | 'csv') => {
    handleProductsExport({
      type,
      merchantId,
    });
    success(
      `Exporting products for Merchant ${sellerInventoryTableExpandedRow.merchant_id}. Check progress for updates`
    );
  };
  return (
    <section className={styles.exportsContainer}>
      {
        <TableResultsMessage
          prependMessage="Showing"
          count={
            sellerInventoryProductsTablePaginationInfo
              ? sellerInventoryProductsTablePaginationInfo.count
              : 0
          }
          actualCount={
            sellerInventoryProductsTableResults ? sellerInventoryProductsTableResults.length : 0
          }
          appendMessage="products"
        />
      }
      <TableExport
        label=""
        disableExport={shouldDisableExport}
        onButtonClick={() => handleExport('xlsx')}
        exportContent={
          <>
            <div className={styles.exportOptions}>
              <span>Export As</span>
              <button
                className={styles.exportOption}
                onClick={() => handleExport('xlsx')}
                disabled={shouldDisableExport}
              >
                <XLSXExportImage /> .XLSX
              </button>

              <button
                className={styles.exportOption}
                onClick={() => handleExport('csv')}
                disabled={shouldDisableExport}
              >
                <CSVExportImage /> .CSV
              </button>
            </div>
          </>
        }
      />
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerInventoryProductsTablePaginationInfo: getSellerInventoryProductsTablePaginationInfo(
      state
    ),
    sellerSubscription: getSellerSubscription(state),
    sellerInventoryTableExpandedRow: getSellerInventoryTableExpandedRow(state),
    sellerInventoryProductsTableResults: getSellerInventoryProductsTableResults(state),
  };
};

export default connect(mapStateToProps)(ProductsExport);
