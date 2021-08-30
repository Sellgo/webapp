import React, { useState } from 'react';
import { Table } from 'rsuite';
import { Icon, Popup, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import './index.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Actions */
import {
  unTrackTrackerProductTableKeyword,
  fetchTrackerProductKeywordsHistory,
} from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  TrackerProductKeywordsHistory,
  UnTrackProductsTableKeyword,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingTrackerProductKeywordsHistory,
  getTrackerProductKeywordsHistoryResult,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Components */
import { KeywordHistoryChart } from '../KeywordHistoryChart';

interface Props extends RowCell {
  unTrackTrackerProductTableKeyword: (payload: UnTrackProductsTableKeyword) => void;
  fetchTrackerProductKeywordsHistory: (payload: TrackerProductKeywordsHistory) => void;
  trackerProductKeywordsHistoryResults: any[];
  isLoadingTrackerProductKeywordsHistory: boolean;
}

const ActionsCell = (props: Props) => {
  const {
    unTrackTrackerProductTableKeyword,
    fetchTrackerProductKeywordsHistory,
    trackerProductKeywordsHistoryResults,
    isLoadingTrackerProductKeywordsHistory,
    ...otherProps
  } = props;

  const [showModal, setShowModal] = useState(false);

  const { rowData, dataKey } = otherProps;

  const keywordTrackId = rowData[dataKey];
  const phrase = rowData.phrase;

  const handleUnTrackKeyword = () => {
    unTrackTrackerProductTableKeyword({ keywordTrackId });
  };

  const handleHistory = () => {
    setShowModal(true);
    fetchTrackerProductKeywordsHistory({ keywordTrackId });
  };

  return (
    <>
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
              <button onClick={handleHistory}>
                <Icon name="chart line" className="productKeywordActionIcon" />
                History
              </button>
            </div>
          }
        />
      </Table.Cell>

      {/* Chart Modal  */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        onOpen={() => setShowModal(true)}
        className="keywordHistoryModal"
      >
        <KeywordHistoryChart
          phrase={phrase}
          chartingData={trackerProductKeywordsHistoryResults}
          isLoadingChart={isLoadingTrackerProductKeywordsHistory}
          closeChart={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    trackerProductKeywordsHistoryResults: getTrackerProductKeywordsHistoryResult(state),
    isLoadingTrackerProductKeywordsHistory: getIsLoadingTrackerProductKeywordsHistory(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    unTrackTrackerProductTableKeyword: (payload: UnTrackProductsTableKeyword) =>
      dispatch(unTrackTrackerProductTableKeyword(payload)),
    fetchTrackerProductKeywordsHistory: (payload: TrackerProductKeywordsHistory) =>
      dispatch(fetchTrackerProductKeywordsHistory(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionsCell);
