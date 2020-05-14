import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../../hooks';
import {
  validateAndUploadFile,
  setLoadingShow,
  setUploadSupplierStep,
} from '../../../actions/UploadSupplier';
import { Grid, Icon, Label, Segment, Header } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import {
  currentProgressShow,
  currentResultUpload,
  currentValid,
  currentError,
} from '../../../selectors/UploadSupplier';
import RowValidationChart from './RowValidationChart';
import { handleUnauthorizedMwsAuth } from '../../../actions/Settings';
import { closeUploadSupplierModal } from '../../../actions/Modals';

interface SubmitProps {
  validateAndUploadFile: any;
  onFinished: () => void;
  currentProgressShow: any;
  handleUnauthorizedMwsAuth: any;
  setLoadingShow: any;
  currentResult: any;
  currentValid: any;
  currentError: any;
  setStep: any;
  closeUploadSupplierModal: typeof closeUploadSupplierModal;
}

const Submit = (props: SubmitProps) => {
  const {
    validateAndUploadFile,
    currentProgressShow,
    setLoadingShow,
    handleUnauthorizedMwsAuth,
    currentResult,
    onFinished,
    currentValid,
    currentError,
    setStep,
    closeUploadSupplierModal,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const totalRows = Number(currentValid) + Number(currentError);
  const percentError = Number(((Number(currentError) / totalRows) * 100).toFixed(1));
  const percentValid = Number(((Number(currentValid) / totalRows) * 100).toFixed(1));
  const errServerUpload = currentResult === 'DATA_REPORT' ? true : false;
  const onPrevStep = () => {
    setStep(2);
  };

  useAsyncEffect(async () => {
    setLoading(true);
    setLoadingShow(true);
    try {
      await validateAndUploadFile();
      onFinished();
    } catch (error) {
      let errorMessage = 'Something went wrong!';
      if (error && error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      if (error.response.status === 401) {
        closeUploadSupplierModal();
        handleUnauthorizedMwsAuth();
      }
    }
    setLoading(false);
    setLoadingShow(false);
  }, []);

  if (loading) {
    return (
      <Grid className="Submit__loader-container">
        <div className="Submit__loader">
          <div className="circle-loader">
            {[...Array(8)].map(i => (
              <div key={i} />
            ))}
          </div>
        </div>
      </Grid>
    );
  }

  return (
    <div className={`submit-container`}>
      {!currentProgressShow &&
        (!errServerUpload ? (
          <React.Fragment>
            <Icon name="exclamation circle" size="big" className={styles['check-error']} />
            <br />
            <p>
              <b>{error}</b>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Segment className={`Submit__pie-chart ${error || currentError ? '' : 'middle'}`}>
              {error || currentError ? (
                <Header>
                  We could not process some of your SKUs. If you would like to fix the issues please
                  <br />
                  click on "Download Error File" and re-upload the file in&nbsp;
                  <span onClick={onPrevStep} className="Submit__select-file">
                    Select File
                  </span>
                </Header>
              ) : null}
              <Segment>
                <span className="Submit__file-error">
                  <Label circular empty />
                  &nbsp;Errors <br />
                  <span>
                    {currentError} ({percentError}%)
                  </span>
                </span>
                <RowValidationChart percentValid={percentValid} percentError={percentError} />
                <span className="Submit__file-process">
                  <Label circular empty />
                  &nbsp;Processed SKUs <br />
                  <span>
                    {currentValid} ({percentValid}%)
                  </span>
                </span>
              </Segment>
            </Segment>
          </React.Fragment>
        ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentProgressShow: currentProgressShow(state),
  currentResult: currentResultUpload(state),
  currentValid: currentValid(state),
  currentError: currentError(state),
});

const mapDispatchToProps = {
  closeUploadSupplierModal,
  validateAndUploadFile,
  setLoadingShow,
  setStep: setUploadSupplierStep,
  handleUnauthorizedMwsAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
