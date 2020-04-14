import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Divider, Modal, Progress, Grid } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import { setUploadSupplierStep, setShowProgress } from '../../../actions/UploadSupplier';
import { postSynthesisRun, setProgress } from '../../../actions/Suppliers';
import {
  currentStepSelector,
  processCompletedSelector,
  currentErrorFile,
  currentResultError,
  currentSynthesisId,
  currentProgress,
  currentShowProgress,
  currentSpeed,
  currentEta,
  currentShowLoading,
} from '../../../selectors/UploadSupplier';
import { closeUploadSupplierModal } from '../../../actions/Modals';

interface ActionsProps {
  currentStep: number;
  setStep: (nextStep: number) => Promise<void>;
  currentErrorFile: any;
  currentResultError: any;
  currentSynId: any;
  currentProgress: any;
  currentSpeed: any;
  currentEta: any;
  postSynthesisRun: any;
  setShowProgress: any;
  setProgress: any;
  currentShowProgress: any;
  currentShowLoading: any;
  className?: string;
  processCompleted: boolean;
  closeModal: typeof closeUploadSupplierModal;
}

const Actions = ({
  setStep,
  currentStep,
  className,
  processCompleted,
  closeModal,
  currentErrorFile,
  currentResultError,
  currentSynId,
  currentProgress,
  currentSpeed,
  currentEta,
  currentShowProgress,
  postSynthesisRun,
  setShowProgress,
  setProgress,
  currentShowLoading,
}: ActionsProps) => {
  const hasPrevStep = currentStep !== 0;
  const hasNextStep = currentStep !== 4;
  const [openConfirm, setConfirm] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [disableExit, setExit] = useState(false);

  const onNextStep = () => setStep(currentStep + 1);
  const onPrevStep = () => setStep(currentStep - 1);

  const handleClose = () => {
    setExit(!disableExit);
    setShowProgress(false);
    setProgress(0);
  };

  const handleNoErr = () => {
    setOpenProgress(!openProgress);
    setShowProgress(true);
  };

  if (processCompleted) {
    return (
      <div className={`${className || ''} ${styles.actions} submit-actions`}>
        {currentShowProgress ? (
          <span className="Actions__err-download exit">
            <Button
              onClick={currentProgress >= 100 ? closeModal : handleClose}
              size="small"
              basic={true}
              color="grey"
              disabled={currentProgress >= 100 ? false : true}
              style={{ borderRadius: 20 }}
            >
              Exit
            </Button>
          </span>
        ) : (
          <a className="Actions__err-download" href={currentErrorFile}>
            <Button size="small" basic={true} color="grey" style={{ borderRadius: 20 }}>
              <i className="fas fa-file-download" /> Download Error File
            </Button>
          </a>
        )}

        {openProgress && (
          <>
            <Grid className="Actions__progress-bar">
              <Progress
                percent={currentProgress >= 100 ? 100 : currentProgress}
                color="blue"
                autoSuccess
                progress
                inverted
                indicating
              />
              {currentProgress < 100 ? (
                <Grid>
                  <span>Speed: {currentSpeed} SKU/min</span>
                  <span>Uploading File</span>
                  <span>ETA: {currentEta} Secs</span>
                </Grid>
              ) : (
                <Grid className="Actions__completed">
                  <span>Everything worked, your file is all ready.</span>
                </Grid>
              )}
            </Grid>
          </>
        )}
        {!currentShowProgress && (
          <Button
            onClick={() => {
              currentResultError ? setConfirm(!openConfirm) : handleNoErr();
            }}
            className={styles.action}
            basic={true}
            color="black"
            primary={true}
          >
            Upload
          </Button>
        )}
        <Modal open={openConfirm} className="Actions__confirm-container">
          <Modal.Content>
            <div>
              <Header as="h4" icon>
                Skip Fixing File?
                <Header.Subheader>
                  Do you want to upload the file without fixing the errors first?
                </Header.Subheader>
              </Header>
              <Divider clearing />
            </div>
          </Modal.Content>
          <div className="Actions__btn">
            <Button content="No" onClick={() => setConfirm(!openConfirm)} />
            <Button
              content="Yes"
              onClick={() => {
                postSynthesisRun(currentSynId);
                setConfirm(!openConfirm);
                setOpenProgress(!openProgress);
                setShowProgress(true);
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div
      className={`new-supplier-cont ${className || ''} ${styles.actions} ${
        styles['supplier-btns']
      }`}
    >
      <div className={`${styles['btns-wrap']} ${styles.upload}`}>
        {currentStep === 2 && (
          <a
            className="Actions__template-download"
            href="https://sellgo-public-dev.s3.amazonaws.com/template.csv"
            download
          >
            <Button size="small" basic={true} color="grey" style={{ borderRadius: 20 }}>
              <i className="fas fa-file-download" /> Download Template
            </Button>
          </a>
        )}
        {hasPrevStep && !currentShowLoading && (
          <Button onClick={onPrevStep} className={styles.action} basic={true} color="grey">
            Previous
          </Button>
        )}
        {hasNextStep && (
          <Button
            onClick={onNextStep}
            className={currentStep === 0 ? `Actions__btn ${styles.action}` : styles.action}
            basic={true}
            color="black"
            primary={true}
          >
            {(() => {
              switch (currentStep) {
                case 4:
                  return 'Submit';
                default:
                  return 'Next';
              }
            })()}
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentStep: currentStepSelector(state),
  processCompleted: processCompletedSelector(state),
  currentErrorFile: currentErrorFile(state),
  currentResultError: currentResultError(state),
  currentSynId: currentSynthesisId(state),
  currentProgress: currentProgress(state),
  currentShowProgress: currentShowProgress(state),
  currentSpeed: currentSpeed(state),
  currentEta: currentEta(state),
  currentShowLoading: currentShowLoading(state),
});

const mapDispatchToProps = {
  setStep: setUploadSupplierStep,
  closeModal: closeUploadSupplierModal,
  postSynthesisRun,
  setProgress,
  setShowProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
