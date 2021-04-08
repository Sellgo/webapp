import React from 'react';
import { Grid, Select, Form, Dropdown } from 'semantic-ui-react';
import styles from '../UploadSupplier.module.scss';
import { FieldsToMap, PRODUCT_ID_TYPES } from '../../../../constants/UploadSupplier';
import {
  reversedColumnMappingsSelector,
  fileHeaderSelector,
  primaryIdTypeSelector,
  fileStringArraySelector,
} from '../../../../selectors/UploadSupplier';
import { connect } from 'react-redux';
import { mapColumn, setPrimaryIdType, setColumnMappings } from '../../../../actions/UploadSupplier';
import isNil from 'lodash/isNil';
import { guessColumnMappings } from '../../../../utils/file';

interface ColumnMappingsProps {
  availableFields: string[];
  mapColumn: typeof mapColumn;
  reversedColumnMappings: { [key: string]: number | string };
  primaryIdType: string;
  setPrimaryIdType: typeof setPrimaryIdType;
  fileStringArray: string[][];
  setColumnMappings: typeof setColumnMappings;
}

const ColumnMappings = ({
  availableFields,
  mapColumn,
  reversedColumnMappings,
  primaryIdType,
  setPrimaryIdType,
  fileStringArray,
  setColumnMappings,
}: ColumnMappingsProps) => {
  const availableFieldOptions = availableFields.map((availableField, index) => ({
    text: availableField,
    value: index,
  }));
  const productIdOptions = PRODUCT_ID_TYPES.map(id => ({ text: id, value: id }));

  const primaryIdDropdownChange = (data: any) => {
    const primaryIdType = data.value as string;
    setPrimaryIdType(primaryIdType);
    const mappings = guessColumnMappings(fileStringArray, primaryIdType);
    if (mappings) {
      setColumnMappings(mappings);
    }
  };

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
                    onChange={(event, data) => primaryIdDropdownChange(data)}
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
  fileStringArray: fileStringArraySelector(state),
});

const mapDispatchToProps = {
  mapColumn,
  setPrimaryIdType,
  setColumnMappings,
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnMappings);
