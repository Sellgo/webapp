import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

/* Selectors */
import {
  getCentralScrapingProgress,
  getShowCentralScrapingProgress,
} from '../../../../selectors/SellerResearch/SellerInventory';

/* Actions */
import { fetchCentralScrapingProgress } from '../../../../actions/SellerResearch/SellerInventory';
import { CentralScrapingProgress } from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  showCentralScrapingProgress: boolean;
  centralScrapingProgress: CentralScrapingProgress[];
  fetchCentralScrapingProgress: () => void;
}

const CentralScrapingProgressBar = (props: Props) => {
  const { showCentralScrapingProgress, fetchCentralScrapingProgress } = props;

  const progressPercent = Number.parseFloat(String('50' || '0'));

  useEffect(() => {
    fetchCentralScrapingProgress();
  }, []);
  return (
    <>
      {showCentralScrapingProgress && (
        <Progress
          percent={progressPercent || 0}
          progress
          indicating
          className={'defaultProgressBar'}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    showCentralScrapingProgress: getShowCentralScrapingProgress(state),
    centralScrapingProgress: getCentralScrapingProgress(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCentralScrapingProgress: () => dispatch(fetchCentralScrapingProgress()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CentralScrapingProgressBar);
