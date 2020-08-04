import React from 'react';
import { Grid, Select, Form, Dropdown } from 'semantic-ui-react';
import styles from '../UploadSupplier.module.scss';
import { FieldsToMap, PRODUCT_ID_TYPES } from '../../../../constants/UploadSupplier';
import {
  reversedColumnMappingsSelector,
  fileHeaderSelector,
  isFirstRowHeaderSelector,
  primaryIdTypeSelector,
} from '../../../../selectors/UploadSupplier';
import { connect } from 'react-redux';
import {
  mapColumn,
  toggleFirstRowHeader,
  setPrimaryIdType,
} from '../../../../actions/UploadSupplier';
import isNil from 'lodash/isNil';

interface ColumnMappingsProps {
  availableFields: string[];
  mapColumn: typeof mapColumn;
  reversedColumnMappings: { [key: string]: number | string };
  isFirstRowHeader: boolean;
  toggleFirstRowHeader: typeof toggleFirstRowHeader;
  setPrimaryIdType: typeof setPrimaryIdType;
  primaryIdType: string;
}

const ColumnMappings = ({
  availableFields,
  mapColumn,
  reversedColumnMappings,
  primaryIdType,
  setPrimaryIdType,
}: ColumnMappingsProps) => {
  const availableFieldOptions = availableFields.map((availableField, index) => ({
    text: availableField,
    value: index,
  }));
  const productIdOptions = PRODUCT_ID_TYPES.map(id => ({ text: id, value: id }));

  return (
    <>
      <Grid>
        <Grid.Row className={`stackable ${styles.data_map_col}`}>
          {FieldsToMap.map(({ key, label }) => (
            <Grid.Column key={key} width={3}>
              <Form.Field>
                {key === 'primary_id' ? (
                  <Dropdown
                    inline
                    className={styles.dropdown_pid}
                    onChange={(event, data) => setPrimaryIdType(data.value as string)}
                    value={primaryIdType}
                    name="primary_id_type"
                    options={productIdOptions}
                  />
                ) : (
                  <label className={styles.block}>{label}</label>
                )}
                <Select
                  className={styles['dropdwn-wdth']}
                  style={{ minWidth: '80.74px' }}
                  onChange={(event, data) => mapColumn(data.value as number, key)}
                  value={isNil(reversedColumnMappings[key]) ? -1 : reversedColumnMappings[key]}
                  name={key}
                  options={[{ text: '-', value: -1 }, ...availableFieldOptions]}
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
  primaryIdType: primaryIdTypeSelector(state),
  isFirstRowHeader: isFirstRowHeaderSelector(state),
});

const mapDispatchToProps = {
  mapColumn,
  toggleFirstRowHeader,
  setPrimaryIdType,
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnMappings);
