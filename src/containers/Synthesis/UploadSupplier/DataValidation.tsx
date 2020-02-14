import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { dataQualityReportSelector } from '../../../selectors/UploadSupplier';
import { DataQualityReport } from '../../../interfaces/UploadSupplier';
import styles from './UploadSupplier.module.css';
import numberToLetter from '../../../utils/numberToLetter';

interface DataValidationProps {
  dataQualityReport: DataQualityReport;
}

const DataValidation = (props: DataValidationProps) => {
  const { dataQualityReport } = props;

  return (
    <Grid
      verticalAlign="middle"
      style={{ justifyContent: 'left' }}
      className={styles['ouline-box']}
    >
      <List>
        {dataQualityReport.errorCells.length > 0
          ? renderIssuesReport(dataQualityReport)
          : renderNoIssuesReport()}
        <List.Item></List.Item>
        <List.Item>
          <List.Header>
            {dataQualityReport.totalValidProducts} products will be added to Profit Finder.
          </List.Header>
        </List.Item>
      </List>
    </Grid>
  );
};

const renderIssuesReport = (dataQualityReport: DataQualityReport) => {
  const metricMessages = [
    { metric: dataQualityReport.upcNonNumeric, message: 'invalid UPC' },
    { metric: dataQualityReport.upcMissing, message: 'missing UPC' },
    { metric: dataQualityReport.costInvalid, message: 'invalid product cost' },
    { metric: dataQualityReport.costMissing, message: 'missing product cost' },
    { metric: dataQualityReport.msrpInvalid, message: 'invalid MSRP' },
    { metric: dataQualityReport.msrpMissing, message: 'missing MSRP' },
  ];

  return (
    <>
      <List.Item>
        <List.Header>Detected Issues</List.Header>
      </List.Item>

      {metricMessages.map(metricMessage => {
        if (metricMessage.metric > 0) {
          return (
            <List.Item key={metricMessage.metric}>
              Number of rows with {metricMessage.message}: {metricMessage.metric}
            </List.Item>
          );
        }
      })}

      <List.Item>
        {`Cells detected with errors:${dataQualityReport.errorCells.map(
          cell => ' ' + numberToLetter(cell[0]) + String(cell[1] + 1)
        )}`}
      </List.Item>

      <List.Item></List.Item>
      <List.Item>
        <List.Header>Solution</List.Header>
      </List.Item>
      <List.Item>- Fix data on CSV and re-upload</List.Item>
      <List.Item>OR</List.Item>
      <List.Item>
        - Proceed and submit (rows with errors will not be added to Profit Finder)
      </List.Item>
    </>
  );
};

const renderNoIssuesReport = () => (
  <List.Item>
    <List.Header>No issues found.</List.Header>
  </List.Item>
);

const mapStateToProps = (state: {}) => ({
  dataQualityReport: dataQualityReportSelector(state),
});

export default connect(mapStateToProps)(DataValidation);
