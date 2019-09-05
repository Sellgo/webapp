import React from 'react';
import { Grid } from 'semantic-ui-react';
import PreviewTable from './PreviewTable';
import ColumnMappings from './ColumnMappings';
import styles from '../UploadSupplierFiles.module.css';

const DataMapping = () => {
  return (
    <Grid verticalAlign="middle" className={styles.ouline_box}>
      <Grid.Row>
        <Grid.Column>
          <ColumnMappings />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16} className={styles.previewTableContainer}>
          <PreviewTable />
        </Grid.Column>
        {/* <Grid.Column width={4}>
          <Message />
        </Grid.Column> */}
      </Grid.Row>
    </Grid>
  );
};

export default DataMapping;
