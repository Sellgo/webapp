import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../../hooks';
import { validateAndUploadCsv, setLoadingShow } from '../../../actions/UploadSupplier';
import { Grid, Icon, Label, Segment, Header } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import UploadStepPieChart from './../../../components/Chart/UploadStepPieChart';
import {
  currentErrorFile,
  currentProgressShow,
  currentResultUpload,
  currentResultVal,
  currentError,
} from '../../../selectors/UploadSupplier';

interface SubmitProps {
  validateAndUploadCsv: any;
  onFinished: () => void;
  currentProgressShow: any;
  currentErrorFile: any;
  setLoadingShow: any;
  currentResult: any;
  currentVal: any;
  currentError: any;
}

const Submit = (props: SubmitProps) => {
  const {
    validateAndUploadCsv,
    currentProgressShow,
    setLoadingShow,
    currentErrorFile,
    currentResult,
    onFinished,
    currentVal,
    currentError,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const totalRows = Number(currentVal) + Number(currentError);
  const percentErr = Math.round((Number(currentError) / totalRows) * 100);
  const percentVal = Math.round((Number(currentVal) / totalRows) * 100);
  const errServerUpload = currentResult === 'DATA_REPORT' ? true : false;

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
                <UploadStepPieChart
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
  currentProgressShow: currentProgressShow(state),
  currentErrorFile: currentErrorFile(state),
  currentResult: currentResultUpload(state),
  currentVal: currentResultVal(state),
  currentError: currentError(state),
});

const mapDispatchToProps = {
  validateAndUploadCsv,
  setLoadingShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
