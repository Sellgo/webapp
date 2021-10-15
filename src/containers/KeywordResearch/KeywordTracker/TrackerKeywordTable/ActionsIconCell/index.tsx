import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { RowCell } from '../../../../../interfaces/Table';

/* Actions */
import { trackBoostProductTableKeyword } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { TrackBoostProductsTableKeyword } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Icons */
import KeywordBoostTrackIcon from '../../../../../components/Icons/KeywordResearch/KeywordBoostTrack';

interface Props extends RowCell {
  trackBoostProductTableKeyword: (payload: TrackBoostProductsTableKeyword) => void;
}

const ActionsIconCell = (props: Props) => {
  const { trackBoostProductTableKeyword, ...otherProps } = props;

  const { rowData, dataKey } = otherProps;

  const keywordTrackId = rowData[dataKey];

  const isBoostTracked = rowData.is_boost;
  const handleTrackUntrackBoostKeyword = () => {
    trackBoostProductTableKeyword({
      keywordTrackId: keywordTrackId,
      is_boost: isBoostTracked ? 'false' : 'true',
    });
  };

  return (
    <>
      <Table.Cell {...otherProps}>
        <div className={styles.actionIconCellWrapper}>
          <button onClick={handleTrackUntrackBoostKeyword}>
            <KeywordBoostTrackIcon fill={isBoostTracked ? '#FC7900' : '#636d76'} />
          </button>
        </div>
      </Table.Cell>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    trackBoostProductTableKeyword: (payload: TrackBoostProductsTableKeyword) =>
      dispatch(trackBoostProductTableKeyword(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ActionsIconCell);
