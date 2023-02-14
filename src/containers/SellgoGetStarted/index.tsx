import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Popup, Progress } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constnats */
import getStartedInstructions from '../../assets/onboardingResources/SellerResearch/getStartedInstructions.json';

/* Actions */
import { getSellgoGetStartedStatus, getShowSellgoGetStarted } from '../../selectors/UserOnboarding';
import {
  updateSellgoGetStartedStatus,
  updateSellgoGetStartedJoyRideStatus,
  // fetchPerfectStockGetStartedStatus,
} from '../../actions/UserOnboarding';

/* Assets */
import { ReactComponent as YoutubeLogo } from '../../assets/images/youtubeLogo.svg';
import { ReactComponent as GreenCheckCircle } from '../../assets/images/greenCheckCircle.svg';
import history from '../../history';

function sleep(n: number) {
  return new Promise(resolve => setTimeout(resolve, n));
}
interface Props {
  sellgoGetStartedStatus: any;
  updateSellgoGetStartedStatus: (key: string, status: boolean) => void;
  updateSellgoGetStartedJoyRideStatus: (key: string, status: boolean) => void;
  // fetchPerfectStockGetStartedStatus: () => void;
  showGetStarted: boolean;
}

const SellgoGetStarted = (props: Props) => {
  const {
    sellgoGetStartedStatus,
    updateSellgoGetStartedStatus,
    updateSellgoGetStartedJoyRideStatus,
    // fetchPerfectStockGetStartedStatus,
    showGetStarted,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isGetStartedVisible, setIsGetStartedVisible] = useState<boolean>(false);
  // useEffect(() => {
  //   fetchPerfectStockGetStartedStatus();
  // }, []);

  let completedSteps = 0;
  Object.values(sellgoGetStartedStatus).forEach((getStartedStatus: any) => {
    if (getStartedStatus) {
      completedSteps += 1;
    }
  });
  useEffect(() => {
    // if (completedSteps === Object.keys(sellgoGetStartedStatus).length && !showGetStarted) {
    //   setIsGetStartedVisible(false);
    // } else {
    //   setIsGetStartedVisible(true);
    // }
    setIsGetStartedVisible(true);
  }, [completedSteps, showGetStarted]);
  return (
    <>
      {isGetStartedVisible && (
        <Popup
          on={'click'}
          trigger={
            <div className={styles.getStartedButton}>
              <div className={styles.circle}>
                {Object.keys(sellgoGetStartedStatus).length - completedSteps}
              </div>
              Get started
            </div>
          }
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          position="top right"
          content={
            <div className={styles.getStartedModal}>
              <p className={styles.getStartedHeader}> GET STARTED </p>
              <Progress
                percent={(100 / Object.keys(sellgoGetStartedStatus).length) * completedSteps}
                color="blue"
                progress="percent"
                className={styles.progressBar}
              />
              {getStartedInstructions.map((instruction, index) => {
                const instructionCompleted = sellgoGetStartedStatus[instruction.key];
                const onClick = async () => {
                  history.push(instruction.link);
                  await sleep(1000);
                  if (instruction.key === 'sellgoTour') {
                    updateSellgoGetStartedJoyRideStatus('isSellgoTourRunning', true);
                    setIsOpen(false);
                  } else if (instruction.key === 'exportTour') {
                    updateSellgoGetStartedJoyRideStatus('isSellerDatabaseTourRunning', true);
                    setIsOpen(false);
                  } else if (instruction.key === 'crmTour') {
                    updateSellgoGetStartedJoyRideStatus('isCollectionTourRunning', true);
                    setIsOpen(false);
                  }
                  updateSellgoGetStartedStatus(instruction.key, true);
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
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellgoGetStartedStatus: getSellgoGetStartedStatus(state),
    showGetStarted: getShowSellgoGetStarted(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // fetchPerfectStockGetStartedStatus: () => dispatch(fetchPerfectStockGetStartedStatus()),
    updateSellgoGetStartedStatus: (key: string, status: boolean) =>
      dispatch(updateSellgoGetStartedStatus(key, status)),
    updateSellgoGetStartedJoyRideStatus: (key: string, status: boolean) =>
      dispatch(updateSellgoGetStartedJoyRideStatus(key, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellgoGetStarted);
