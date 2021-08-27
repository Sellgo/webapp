import React from 'react';
import { Table } from 'rsuite';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import './index.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Actions */
import { unTrackTrackerProductsTableKeyword } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { UnTrackProductsTableKeyword } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props extends RowCell {
  unTrackTrackerProductsTableKeyword: (payload: UnTrackProductsTableKeyword) => void;
}

const ActionsCell = (props: Props) => {
  const { unTrackTrackerProductsTableKeyword, ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const keywordTrackId = rowData[dataKey];

  const handleUnTrackKeyword = () => {
    console.log(keywordTrackId);
    unTrackTrackerProductsTableKeyword({ keywordTrackId });
  };

  return (
    <Table.Cell {...otherProps} style={{ padding: 0 }}>
      <Popup
        className="productKeywordActionsCell"
        trigger={<Icon name="ellipsis vertical" className="productKeywordActionsCellTrigger" />}
        on="click"
        position="bottom right"
        closeOnDocumentClick
        content={
          <div className="productKeywordActionsCellContent">
            <button onClick={handleUnTrackKeyword}>
              <Icon name="trash" className="productKeywordActionIcon" />
              Delete Keyword
            </button>
          </div>
        }
      />
    </Table.Cell>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    unTrackTrackerProductsTableKeyword: (payload: UnTrackProductsTableKeyword) =>
      dispatch(unTrackTrackerProductsTableKeyword(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ActionsCell);
