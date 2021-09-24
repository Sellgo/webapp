import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getSellerInventoryTablePaginationInfo } from '../../../../selectors/SellerResearch/SellerInventory';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

/* Interfaces */
import { SellerInventoryTablePaginationInfo } from '../../../../interfaces/SellerResearch/SellerInventory';

/* Utils */
import { formatNumber } from '../../../../utils/format';

interface Props {
  sellerInventoryTablePaginationInfo: SellerInventoryTablePaginationInfo;
}

const InventoryExport = (props: Props) => {
  const { sellerInventoryTablePaginationInfo } = props;

  return (
    <section className={styles.exportsContainer}>
      {sellerInventoryTablePaginationInfo.total_pages > 0 && (
        <p className={styles.messageText}>
          Viewing{' '}
          <span className={styles.sellerCount}>
            {formatNumber(sellerInventoryTablePaginationInfo.count)}
          </span>{' '}
          sellers.
        </p>
      )}

      <TableExport
        label=""
        exportContent={
          <>
            <div className={styles.exportOptions}>
              <span>Export As</span>
              <button className={styles.exportOption}>
                <XLSXExportImage /> .XLSX
              </button>

              <button className={styles.exportOption}>
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
    sellerInventoryTablePaginationInfo: getSellerInventoryTablePaginationInfo(state),
  };
};

export default connect(mapStateToProps)(InventoryExport);
