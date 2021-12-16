import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import TableExport from '../../../../components/NewTable/TableExport';
import ActionButton from '../../../../components/ActionButton';

/* Assets */
import { ReactComponent as XLSXExportImage } from '../../../../assets/images/xlsxExportImage.svg';
import { ReactComponent as CSVExportImage } from '../../../../assets/images/csvExportImage.svg';
import { ReactComponent as ThinAddIcon } from '../../../../assets/images/thinAddIcon.svg';
import { ReactComponent as ArrowDown } from '../../../../assets/images/view-detail-down-arrow.svg';
import { ReactComponent as UndoIcon } from '../../../../assets/images/undoIcon.svg';

const OrderPlanningMeta = () => {
  const handleOnExport = async (fileFormat: 'csv' | 'xlsx') => {
    console.log('Export', fileFormat);
  };

  return (
    <>
      <div className={styles.exportsContainer}>
        <ActionButton
          variant="primary"
          type="purpleGradient"
          size="md"
          className={styles.createOrderButton}
        >
          <ThinAddIcon />
          <span>Create</span>
          <ArrowDown />
        </ActionButton>

        <button className={styles.refreshButton}>
          Last Update:&nbsp;<span>1 October 2021 11.53 pm PDT</span>
          &nbsp;
          <UndoIcon className={styles.refreshIcon} />
        </button>

        <TableExport
          label=""
          disableExport={false}
          onButtonClick={() => handleOnExport('xlsx')}
          className={styles.exportButton}
          exportContent={
            <>
              <div className={styles.exportOptions}>
                <span>Export As</span>
                <button
                  className={styles.exportOption}
                  onClick={() => handleOnExport('xlsx')}
                  disabled={false}
                >
                  <XLSXExportImage /> .XLSX
                </button>

                <button
                  className={styles.exportOption}
                  onClick={() => handleOnExport('csv')}
                  disabled={false}
                >
                  <CSVExportImage /> .CSV
                </button>
              </div>
            </>
          }
        />
      </div>
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlanningMeta);
