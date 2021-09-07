import React from 'react';
import { Table } from 'rsuite';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import './index.scss';

/* Utils */
import { downloadFile } from '../../../../../utils/download';
import { success } from '../../../../../utils/notifications';

/* Actions */
import { unTrackKeywordTrackerTableProduct } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';
import { UnTrackKeywordTrackerTableProduct } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props extends RowCell {
  unTrackKeywordTrackerTableProduct: (payload: UnTrackKeywordTrackerTableProduct) => void;
}

const ActionsCell = (props: Props) => {
  const { unTrackKeywordTrackerTableProduct, ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const exportXlsxReport = rowData.report_xlsx_url;

  const keywordTrackProductId = rowData[dataKey];

  /* Handle All Exports */
  const handleExport = async (type: 'xlsx' | 'csv') => {
    if (type === 'xlsx') {
      await downloadFile(exportXlsxReport);
      success('File Successfully downloaded');
    }
  };

  const handleUntrackProduct = () => {
    unTrackKeywordTrackerTableProduct({ keywordTrackProductId });
  };

  return (
    <Table.Cell {...otherProps}>
      <div className="keywordTrackerActionCellWrapper">
        <Popup
          className="keywordTrackerActionsCell"
          trigger={<Icon name="ellipsis vertical" className="keywordTrackerActionsCellTrigger" />}
          on="click"
          position="bottom right"
          offset="-15"
          content={
            <div className="keywordTrackerActionsCellContent">
              <button onClick={handleUntrackProduct}>
                <Icon name="trash" className="keywordTrackerActionIcon" />
                Delete Product
              </button>

              <button disabled={!exportXlsxReport} onClick={() => handleExport('xlsx')}>
                <Icon name="download" className="keywordTrackerActionIcon" />
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
