import React from 'react';
import { Popup, Progress } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constnats */
import getStartedInstructions from '../../../assets/onboardingResources/PerfectStock/getStartedInstructions.json';

/* Actions */
import { getPerfectStockGetStartedStatus } from '../../../selectors/UserOnboarding';
import { updatePerfectStockGetStartedStatus } from '../../../actions/UserOnboarding';

/* Assets */
import { ReactComponent as YoutubeLogo } from '../../../assets/images/youtubeLogo.svg';
import { ReactComponent as GreenCheckCircle } from '../../../assets/images/greenCheckCircle.svg';
import history from '../../../history';

interface Props {
  perfectStockGetStartedStatus: any;
  updatePerfectStockGetStartedStatus: (key: string, status: boolean) => void;
}

const GetStarted = (props: Props) => {
  const { perfectStockGetStartedStatus, updatePerfectStockGetStartedStatus } = props;
  return (
    <Popup
      on={'click'}
      trigger={
        <div className={styles.getStartedButton}>
          <div className={styles.circle}>4</div>
          Get started
        </div>
      }
      position="top right"
      content={
        <div className={styles.getStartedModal}>
          <p className={styles.getStartedHeader}> GET STARTED </p>
          <Progress percent={20} color="blue" progress="percent" className={styles.progressBar} />
          {getStartedInstructions.map((instruction, index) => {
            const instructionCompleted = perfectStockGetStartedStatus[instruction.key];
            const onClick = () => {
              history.push(instruction.link);
              if (instruction.key === 'salesProjectionTour') {
                updatePerfectStockGetStartedStatus('isSalesProjectionTourRunning', true);
              } else if (instruction.key === 'orderPlanningTour') {
                updatePerfectStockGetStartedStatus('isOrderPlanningTourRunning', true);
              }
              updatePerfectStockGetStartedStatus(instruction.key, true);
            };
            return (
              <div
                key={index}
                className={`
                  ${styles.getStartedInstruction}
                  ${instructionCompleted ? styles.getStartedInstruction__completed : ''}
                `}
                onClick={onClick}
              >
                {instructionCompleted ? (
                  <GreenCheckCircle />
                ) : (
                  <div className={styles.notCompletedCircle} />
                )}
                <div className={styles.instructionWrapper}>
                  <h1>
                    {index + 1}. {instruction.title}
                  </h1>
                  {instruction.youtubeLink && instruction.youtubeLabel && (
                    <a href={instruction.youtubeLink} target="_blank" rel="noopener noreferrer">
                      <YoutubeLogo /> &nbsp;{instruction.youtubeLabel}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      }
      basic
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    perfectStockGetStartedStatus: getPerfectStockGetStartedStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updatePerfectStockGetStartedStatus: (key: string, status: boolean) =>
      dispatch(updatePerfectStockGetStartedStatus(key, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);
