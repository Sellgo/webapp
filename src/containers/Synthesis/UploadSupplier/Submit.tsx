import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../../hooks';
import { validateAndUploadCsv, setShowLoading } from '../../../actions/UploadSupplier';
import { Grid, Icon, Label, Segment, Header } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import PieChart from './../../../components/Chart/PieChart';
import {
  currentErrorFile,
  currentShowProgress,
  currentResultUpload,
  currentResultValid,
  currentResultError,
} from '../../../selectors/UploadSupplier';

interface SubmitProps {
  validateAndUploadCsv: any;
  onFinished: () => void;
  currentShowProgress: any;
  currentErrorFile: any;
  setShowLoading: any;
  currentResult: any;
  currentResultValid: any;
  currentResultError: any;
}

const Submit = (props: SubmitProps) => {
  const {
    validateAndUploadCsv,
    currentShowProgress,
    setShowLoading,
    currentErrorFile,
    currentResult,
    onFinished,
    currentResultValid,
    currentResultError,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const totalRows = Number(currentResultValid) + Number(currentResultError);
  const percentErr = Math.round((Number(currentResultError) / totalRows) * 100);
  const percentVal = Math.round((Number(currentResultValid) / totalRows) * 100);
  const errServerUpload = currentResult === 'DATA_REPORT' ? true : false;

  useAsyncEffect(async () => {
    setLoading(true);
    setShowLoading(true);
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
    setShowLoading(false);
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
      {!currentShowProgress &&
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
            <Segment className={`Submit__pie-chart ${error || currentResultError ? '' : 'middle'}`}>
              {error || currentResultError ? (
                <Header>
                  We could not process some of your SKUs. If you would like to fix the issues please
                  <br />
                  click on "Download Error File" and re-upload the file in&nbsp;
                  <a href={currentErrorFile} className="Submit__select-file">
                    Select File
                  </a>
                </Header>
              ) : null}
              <Segment>
                <span className="Submit__file-error">
                  <Label circular empty />
                  &nbsp;Errors <br />
                  <span>{percentErr}%</span>
                </span>
                <PieChart
                  options={{
                    data: [
                      {
                        name: 'Processed',
                        y: percentVal,
                        color: '#4ad991',
                      },
                      {
                        name: 'Errors',
                        y: percentErr,
                        color: '#fd8373',
                      },
                    ],
                  }}
                />
                <span className="Submit__file-process">
                  <Label circular empty />
                  &nbsp;Processed SKUs <br />
                  <span>{percentVal}%</span>
                </span>
              </Segment>
            </Segment>
          </React.Fragment>
        ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentShowProgress: currentShowProgress(state),
  currentErrorFile: currentErrorFile(state),
  currentResult: currentResultUpload(state),
  currentResultValid: currentResultValid(state),
  currentResultError: currentResultError(state),
});

const mapDispatchToProps = {
  validateAndUploadCsv,
  setShowLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
