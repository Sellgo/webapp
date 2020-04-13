import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAsyncEffect } from '../../../hooks';
import { validateAndUploadCsv, setLoadingShow } from '../../../actions/UploadSupplier';
import { Grid, Icon, Label, Segment, Header } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
import PieChart from './../../../components/Chart/PieChart';
import {
  currentResultErrFile,
  currentProgressShow,
  currentResultUpload,
  currentResultVal,
  currentErr,
} from '../../../selectors/UploadSupplier';

interface SubmitProps {
  validateAndUploadCsv: any;
  onFinished: () => void;
  currentProgShow: any;
  currentErrFile: any;
  setLoadingShow: any;
  currentResult: any;
  currentVal: any;
  currentErr: any;
}

const Submit = (props: SubmitProps) => {
  const {
    validateAndUploadCsv,
    currentProgShow,
    setLoadingShow,
    currentErrFile,
    currentResult,
    onFinished,
    currentVal,
    currentErr,
  } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const totalRows = Number(currentVal) + Number(currentErr);
  const percentErr = Math.round((Number(currentErr) / totalRows) * 100);
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
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </Grid>
    );
  }

  return (
    <div className={`submit-container`}>
      {!currentProgShow &&
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
            <Segment className={`Submit__pie-chart ${error || currentErr ? '' : 'middle'}`}>
              {error || currentErr ? (
                <Header>
                  We could not process some of your SKUs. If you would like to fix the issues please
                  <br />
                  click on "Download Error File" and re-upload the file in&nbsp;
                  <a href={currentErrFile} className="Submit__select-file">
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
  currentProgShow: currentProgressShow(state),
  currentErrFile: currentResultErrFile(state),
  currentResult: currentResultUpload(state),
  currentVal: currentResultVal(state),
  currentErr: currentErr(state),
});

const mapDispatchToProps = {
  validateAndUploadCsv,
  setLoadingShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
