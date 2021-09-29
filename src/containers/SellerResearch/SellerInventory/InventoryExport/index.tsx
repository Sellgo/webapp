import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getSellerSubscription } from '../../../../selectors/Subscription';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';

/* Hooks */
import { useExportSocket } from '../SocketProviders/InventoryExportProvider';

/* Interfaces */
import { SellerSubscription } from '../../../../interfaces/Seller';

interface Props {
  sellerSubscription: SellerSubscription;
}

const InventoryExport = (props: Props) => {
  const { sellerSubscription } = props;

  const { handleExport } = useExportSocket();

  /* Disable export if month based subscription */
  const shouldDisableExport = sellerSubscription && sellerSubscription.payment_mode === 'monthly';

  return (
    <section className={styles.exportsContainer}>
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
    sellerSubscription: getSellerSubscription(state),
  };
};

export default connect(mapStateToProps)(InventoryExport);
