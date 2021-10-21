import React, { useState } from 'react';
import { Table } from 'rsuite';
import { Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { downloadFile } from '../../../../../utils/download';
import { success } from '../../../../../utils/notifications';

/* Actions */
import { unTrackKeywordTrackerTableProduct } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';
import { UnTrackKeywordTrackerTableProduct } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Components */
import TableIcon from '../../../../../components/Icons/TableIcon';

interface Props extends RowCell {
  unTrackKeywordTrackerTableProduct: (payload: UnTrackKeywordTrackerTableProduct) => void;
}

const ActionsCell = (props: Props) => {
  const { unTrackKeywordTrackerTableProduct, ...otherProps } = props;

  const [openPopup, setOpenPopup] = useState(false);

  const { rowData, dataKey } = otherProps;

  const exportXlsxReport = rowData.report_xlsx_url;

  const keywordTrackProductId = rowData[dataKey];

  const asin = rowData.asin;

  /* Handle Close Popup */
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  /* Handle All Exports */
  const handleExport = async (type: 'xlsx' | 'csv') => {
    if (type === 'xlsx') {
      await downloadFile(exportXlsxReport);
      success('File Successfully downloaded');
    }
    handleClosePopup();
  };

  const handleUntrackProduct = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    unTrackKeywordTrackerTableProduct({ keywordTrackProductId });
    handleClosePopup();
  };

  const handleViewOnAmazon = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const amazonLink = `https://www.amazon.com/dp/${asin}`;
    window.open(amazonLink, '_blank');
    handleClosePopup();
  };

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.actionCellWrapper}>
        <Popup
          className={styles.actionCellPopup}
          trigger={
            <div className={styles.actionCellTrigger}>
              <TableIcon name="ellipsis vertical" />
            </div>
          }
          on="click"
          onOpen={e => {
            e.preventDefault();
            e.stopPropagation();
            setOpenPopup(true);
          }}
          position="bottom right"
          offset="-15"
          onClose={() => setOpenPopup(false)}
          open={openPopup}
          content={
            <div className={styles.actionCellContent}>
              <button disabled={!asin} onClick={handleViewOnAmazon}>
                <TableIcon name="amazon" className={styles.actionCellIcon} />
                View on Amazon
              </button>

              <button onClick={handleUntrackProduct}>
                <TableIcon name="trash" className={styles.actionCellIcon} />
                Delete Product
              </button>

              <button
                disabled={!exportXlsxReport}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleExport('xlsx');
                }}
              >
                <TableIcon name="download" className={styles.actionCellIcon} />
                Export XLSX
              </button>
            </div>
          }
        />
      </div>
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    unTrackKeywordTrackerTableProduct: (payload: UnTrackKeywordTrackerTableProduct) =>
      dispatch(unTrackKeywordTrackerTableProduct(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ActionsCell);
