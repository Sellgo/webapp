import React from 'react';
import { Grid, Select, Form } from 'semantic-ui-react';
import styles from '../UploadSupplier.module.css';
import { FieldsToMap } from '../../../../constants/UploadSupplier';
import {
  reversedColumnMappingsSelector,
  fileHeaderSelector,
  isFirstRowHeaderSelector,
} from '../../../../selectors/UploadSupplier';
import { connect } from 'react-redux';
import { mapColumn, toggleFirstRowHeader } from '../../../../actions/UploadSupplier';
import isNil from 'lodash/isNil';

interface ColumnMappingsProps {
  availableFields: string[];
  mapColumn: typeof mapColumn;
  reversedColumnMappings: { [key: string]: number };
  isFirstRowHeader: boolean;
  toggleFirstRowHeader: typeof toggleFirstRowHeader;
}

const ColumnMappings = ({
  availableFields,
  mapColumn,
  reversedColumnMappings,
}: ColumnMappingsProps) => {
  const availableFieldOptions = availableFields.map((availableField, index) => ({
    text: availableField,
    value: index,
  }));

  return (
    <>
      <Grid>
        <Grid.Row className={`stackable ${styles.data_map_col}`}>
          {FieldsToMap.map(({ key, label }) => (
            <Grid.Column key={key} width={3}>
              <Form.Field>
                <label className={styles.block}>{label}</label>
                <Select
                  className={styles['dropdwn-wdth']}
                  style={{ minWidth: '80.74px' }}
                  onChange={(event, data) => mapColumn(data.value as number, key)}
                  value={isNil(reversedColumnMappings[key]) ? -1 : reversedColumnMappings[key]}
                  name={key}
                  options={[{ text: '', value: -1 }, ...availableFieldOptions]}
                />
              </Form.Field>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: {}) => ({
  availableFields: fileHeaderSelector(state),
  reversedColumnMappings: reversedColumnMappingsSelector(state),
  isFirstRowHeader: isFirstRowHeaderSelector(state),
});

const mapDispatchToProps = {
  mapColumn,
  toggleFirstRowHeader,
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnMappings);
