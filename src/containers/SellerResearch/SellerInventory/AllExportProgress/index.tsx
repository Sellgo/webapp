import React from 'react';
import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';

/* Styling */
import '../../../../styles/progressReset.scss';

/* Selectors */
import { getCentralExportProgress } from '../../../../selectors/SellerResearch/SellerInventory';

/* Interfaces */
import { CentralExportProgress } from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  centralExportProgress: CentralExportProgress;
}

const AllExportProgress = (props: Props) => {
  const { centralExportProgress } = props;

  const { showProgress, progress } = centralExportProgress;

  const progressPercent = Number.parseFloat(String(progress || '0'));

  return (
    <>
      {showProgress && (
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
    centralExportProgress: getCentralExportProgress(state),
  };
};

export default connect(mapStateToProps)(AllExportProgress);
