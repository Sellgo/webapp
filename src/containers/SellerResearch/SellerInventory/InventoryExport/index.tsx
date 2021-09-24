import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';

const InventoryExport = () => {
  return (
    <section className={styles.exportsContainer}>
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

export default InventoryExport;
