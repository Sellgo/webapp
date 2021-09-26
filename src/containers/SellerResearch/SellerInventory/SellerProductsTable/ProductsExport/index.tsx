import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getSellerSubscription } from '../../../../../selectors/Subscription';

/* Components */
import TableExport from '../../../../../components/NewTable/TableExport';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../../assets/images/csvExportImage.svg';

/* Interfaces */
import { SellerSubscription } from '../../../../../interfaces/Seller';

/* Hooks */
import { useExportSocket } from './ProductsExportProvider';
import { getSellerInventoryTableExpandedRow } from '../../../../../selectors/SellerResearch/SellerInventory';

interface Props {
  sellerSubscription: SellerSubscription;
  sellerInventoryTableExpandedRow: any;
}

const ProductsExport = (props: Props) => {
  const { sellerSubscription, sellerInventoryTableExpandedRow } = props;

  const { handleExport } = useExportSocket();

  const merchantId = sellerInventoryTableExpandedRow && sellerInventoryTableExpandedRow.id;

  /* Disable export if month based subscription */
  const shouldDisableExport = sellerSubscription && sellerSubscription.payment_mode === 'monthly';

  return (
    <section className={styles.exportsContainer}>
      <TableExport
        label=""
        exportContent={
          <>
            <div className={styles.exportOptions}>
              <span>Export As</span>
              <button
                className={styles.exportOption}
                onClick={() => handleExport('xlsx', merchantId)}
                disabled={shouldDisableExport}
              >
                <XLSXExportImage /> .XLSX
              </button>

              <button
                className={styles.exportOption}
                onClick={() => handleExport('csv', merchantId)}
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
    sellerSubscription: getSellerSubscription(state),
    sellerInventoryTableExpandedRow: getSellerInventoryTableExpandedRow(state),
  };
};

export default connect(mapStateToProps)(ProductsExport);
