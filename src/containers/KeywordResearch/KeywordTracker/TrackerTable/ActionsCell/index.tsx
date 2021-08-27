import React from 'react';
import { Table } from 'rsuite';
import { Icon, Popup } from 'semantic-ui-react';

/* Styling */
import './index.scss';

/* Utils */
import { downloadFile } from '../../../../../utils/download';
import { success } from '../../../../../utils/notifications';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

const ActionsCell = (props: RowCell) => {
  const { rowData } = props;

  const exportXlsxReport = rowData.report_xlsx_url;

  /* Handle All Exports */
  const handleExport = async (type: 'xlsx' | 'csv') => {
    if (type === 'xlsx') {
      await downloadFile(exportXlsxReport);
      success('File Successfully downloaded');
    }
  };

  return (
    <Table.Cell {...props} style={{ padding: 0 }}>
      <Popup
        className="keywordTrackerActionsCell"
        trigger={<Icon name="ellipsis vertical" className="keywordTrackerActionsCellTrigger" />}
        on="click"
        position="bottom right"
        content={
          <div className="keywordTrackerActionsCellContent">
            <button>
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
    </Table.Cell>
  );
};

export default ActionsCell;
