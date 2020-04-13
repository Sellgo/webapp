import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Divider, Modal, Progress, Grid } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import { setUploadSupplierStep, setProgressShow } from '../../../actions/UploadSupplier';
import { postSynthesisRun, setProgress } from '../../../actions/Suppliers';
import {
  currentStepSelector,
  processCompletedSelector,
  currentResultErrFile,
  currentErr,
  currentSynthesisId,
  currentProgress,
  currentProgressShow,
  currentProgressSpeed,
  currentProgressEta,
  currentLoadingShow,
} from '../../../selectors/UploadSupplier';
import { closeUploadSupplierModal } from '../../../actions/Modals';

interface ActionsProps {
  currentStep: number;
  setStep: (nextStep: number) => Promise<void>;
  currentErrFile: any;
  currentErr: any;
  currentSynId: any;
  currentProg: any;
  currentProgSpeed: any;
  currentProgEta: any;
  setSkipUpload: any;
  setProgressShow: any;
  setSkipUploadVal: any;
  currentProgShow: any;
  currentLoading: any;
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
  currentErrFile,
  currentErr,
  currentSynId,
  currentProg,
  currentProgSpeed,
  currentProgEta,
  currentProgShow,
  setSkipUpload,
  setProgressShow,
  setSkipUploadVal,
  currentLoading,
}: ActionsProps) => {
  const onNextStep = () => setStep(currentStep + 1);
  const onPrevStep = () => setStep(currentStep - 1);

  const handleClose = () => {
    setExit(!disableExit);
    setProgressShow(false);
    setSkipUploadVal(0);
  };

  const hasPrevStep = currentStep !== 0;
  const hasNextStep = currentStep !== 4;
  const [openConfirm, setConfirm] = useState(false);
  const [openProgress, setProgress] = useState(false);
  const [disableExit, setExit] = useState(false);

  if (processCompleted) {
    return (
      <div className={`${className || ''} ${styles.actions} submit-actions`}>
        {currentProgShow ? (
          <span className="Actions__err-download exit">
            <Button
              onClick={currentProg >= 100 ? closeModal : handleClose}
              size="small"
              basic={true}
              color="grey"
              disabled={currentProg >= 100 ? false : true}
              style={{ borderRadius: 20 }}
            >
              Exit
            </Button>
          </span>
        ) : (
          <a className="Actions__err-download" href={currentErrFile}>
            <Button size="small" basic={true} color="grey" style={{ borderRadius: 20 }}>
              <i className="fas fa-file-download" /> Download Error File
            </Button>
          </a>
        )}

        {openProgress && (
          <>
            <Grid className="Actions__progress-bar">
              <Progress
                percent={currentProg >= 100 ? 100 : currentProg}
                color="blue"
                autoSuccess
                progress
                inverted
                indicating
              />
              {currentProg < 100 ? (
                <Grid>
                  <span>Speed: {currentProgSpeed} SKU/min</span>
                  <span>Uploading File</span>
                  <span>ETA: {currentProgEta} Secs</span>
                </Grid>
              ) : (
                <Grid className="Actions__completed">
                  <span>Everything worked, your file is all ready.</span>
                </Grid>
              )}
            </Grid>
          </>
        )}
        {!currentProgShow && (
          <Button
            onClick={() => {
              currentErr ? setConfirm(!openConfirm) : setProgress(!openProgress);
              setProgressShow(true);
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
                setSkipUpload(currentSynId);
                setConfirm(!openConfirm);
                setProgress(!openProgress);
                setProgressShow(true);
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
        {hasPrevStep && !currentLoading && (
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
  currentErrFile: currentResultErrFile(state),
  currentErr: currentErr(state),
  currentSynId: currentSynthesisId(state),
  currentProg: currentProgress(state),
  currentProgShow: currentProgressShow(state),
  currentProgSpeed: currentProgressSpeed(state),
  currentProgEta: currentProgressEta(state),
  currentLoading: currentLoadingShow(state),
});

const mapDispatchToProps = {
  setStep: setUploadSupplierStep,
  closeModal: closeUploadSupplierModal,
  setSkipUpload: postSynthesisRun,
  setSkipUploadVal: setProgress,
  setProgressShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
