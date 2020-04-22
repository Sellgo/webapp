import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../../hooks';
import {
  validateAndUploadCsv,
  setLoadingShow,
  setUploadSupplierStep,
} from '../../../actions/UploadSupplier';
import { Grid, Icon, Label, Segment, Header } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import UploadStepPieChart from './../../../components/Chart/UploadStepPieChart';
import {
  currentProgressShow,
  currentResultUpload,
  currentValid,
  currentError,
} from '../../../selectors/UploadSupplier';

interface SubmitProps {
  validateAndUploadCsv: any;
  onFinished: () => void;
  currentProgressShow: any;
  setLoadingShow: any;
  currentResult: any;
  currentValid: any;
  currentError: any;
  setStep: any;
}

const Submit = (props: SubmitProps) => {
  const {
    validateAndUploadCsv,
    currentProgressShow,
    setLoadingShow,
    currentResult,
    onFinished,
    currentValid,
    currentError,
    setStep,
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
      await validateAndUploadCsv();
      onFinished();
    } catch (error) {
      let errors = ['Something went wrong!'];
      if (error && error.response && error.response.data && error.response.data.message) {
        errors = error.response.data.message;
      }
      setError(errors.join());
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
                  <span>{percentError}%</span>
                </span>
                <UploadStepPieChart
                  options={{
                    data: [
                      {
                        name: 'Processed',
                        y: percentValid,
                        color: '#4ad991',
                      },
                      {
                        name: 'Errors',
                        y: percentError,
                        color: '#fd8373',
                      },
                    ],
                  }}
                />
                <span className="Submit__file-process">
                  <Label circular empty />
                  &nbsp;Processed SKUs <br />
                  <span>{percentValid}%</span>
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
  validateAndUploadCsv,
  setLoadingShow,
  setStep: setUploadSupplierStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
