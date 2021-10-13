import React, { useState } from 'react';
import { Table } from 'rsuite';
import { Icon, Popup, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Actions */
import {
  unTrackTrackerProductTableKeyword,
  fetchTrackerProductKeywordsHistory,
  triggerTrackerProductKeywordsHistoryExport,
  trackBoostProductTableKeyword,
} from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  TrackerProductKeywordsHistory,
  UnTrackProductsTableKeyword,
  TrackBoostProductsTableKeyword,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingTrackerProductKeywordsHistory,
  getTrackerProductKeywordsHistoryResult,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Components */
import { KeywordHistoryChart } from '../KeywordHistoryChart';

/* Icons */
import KeywordBoostTrackIcon from '../../../../../components/Icons/KeywordResearch/KeywordBoostTrack';

interface Props extends RowCell {
  unTrackTrackerProductTableKeyword: (payload: UnTrackProductsTableKeyword) => void;
  fetchTrackerProductKeywordsHistory: (payload: TrackerProductKeywordsHistory) => void;
  triggerTrackerProductKeywordsHistoryExport: (payload: TrackerProductKeywordsHistory) => void;
  trackBoostProductTableKeyword: (payload: TrackBoostProductsTableKeyword) => void;
  trackerProductKeywordsHistoryResults: any[];
  isLoadingTrackerProductKeywordsHistory: boolean;
}

const ActionsCell = (props: Props) => {
  const {
    unTrackTrackerProductTableKeyword,
    fetchTrackerProductKeywordsHistory,
    trackerProductKeywordsHistoryResults,
    isLoadingTrackerProductKeywordsHistory,
    triggerTrackerProductKeywordsHistoryExport,
    trackBoostProductTableKeyword,
    ...otherProps
  } = props;

  const [showModal, setShowModal] = useState(false);

  const { rowData, dataKey } = otherProps;

  const keywordTrackId = rowData[dataKey];
  const phrase = rowData.phrase;
  const isBoostTracked = rowData.is_boost;

  const handleUnTrackKeyword = () => {
    unTrackTrackerProductTableKeyword({ keywordTrackId });
  };

  const handleHistory = () => {
    setShowModal(true);
    fetchTrackerProductKeywordsHistory({ keywordTrackId });
  };

  const handleExport = () => {
    triggerTrackerProductKeywordsHistoryExport({ keywordTrackId });
  };

  const handleSearchOnAmazon = () => {
    const searchLink = `https://www.amazon.com/s?k=${phrase}`;
    window.open(searchLink, '_blank');
  };

  const handleTrackUntrackBoostKeyword = () => {
    trackBoostProductTableKeyword({
      keywordTrackId: keywordTrackId,
      is_boost: isBoostTracked ? 'false' : 'true',
    });
  };

  return (
    <>
      <Table.Cell {...otherProps}>
        <div className={styles.actionCellWrapper}>
          <Popup
            className={styles.actionCellPopup}
            trigger={<Icon name="ellipsis vertical" className={styles.actionCellTrigger} />}
            on="click"
            position="bottom right"
            closeOnDocumentClick
            content={
              <div className={styles.actionCellContent}>
                <button onClick={handleSearchOnAmazon} disabled={!phrase}>
                  <Icon name="amazon" className={styles.actionCellIcon} />
                  Search On Amazon
                </button>

                <button onClick={handleUnTrackKeyword}>
                  <Icon name="trash" className={styles.actionCellIcon} />
                  Delete Keyword
                </button>

                <button onClick={handleHistory}>
                  <Icon name="chart line" className={styles.actionCellIcon} />
                  History
                </button>

                <button onClick={handleExport}>
                  <Icon name="download" className={styles.actionCellIcon} />
                  Export XLSX
                </button>

                <button onClick={handleTrackUntrackBoostKeyword}>
                  <div
                    className={`${styles.actionCellIcon} ${styles.actionCellIcon__boostTrackIcon}`}
                  >
                    <KeywordBoostTrackIcon fill={isBoostTracked ? '#FC7900' : '#636d76'} />
                  </div>
                  {isBoostTracked ? 'Boost Off' : 'Boost On'}
                </button>
              </div>
            }
          />
        </div>
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
    triggerTrackerProductKeywordsHistoryExport: (payload: TrackerProductKeywordsHistory) =>
      dispatch(triggerTrackerProductKeywordsHistoryExport(payload)),
    trackBoostProductTableKeyword: (payload: TrackBoostProductsTableKeyword) =>
      dispatch(trackBoostProductTableKeyword(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionsCell);
