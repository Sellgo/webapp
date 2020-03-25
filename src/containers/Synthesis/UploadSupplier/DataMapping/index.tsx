import React from 'react';
import { Grid } from 'semantic-ui-react';
import PreviewTable from './PreviewTable';
import ColumnMappings from './ColumnMappings';
import styles from '../UploadSupplier.module.css';

const DataMapping = () => {
  return (
    <Grid verticalAlign="middle" className={`mapping-container ${styles['ouline-box']}`}>
      <Grid.Row>
        <Grid.Column>
          <ColumnMappings />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16} className={styles['preview-table-container']}>
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
