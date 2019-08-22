import React from 'react';
import { Header, Grid, GridColumn, Select, Form } from 'semantic-ui-react';
import styles from '../UploadSupplierFiles.module.css';
import { FieldsToMap } from '../../../constant/constant';
import {
  reversedColumnMappingsSelector,
  csvHeaderSelector,
} from '../../../selectors/UploadSupplierFiles';
import { connect } from 'react-redux';
import { mapColumn } from '../../../Action/UploadSupplierFilesActions';
import isNil from 'lodash/isNil';

interface ColumnMappingsProps {
  availableFields: string[];
  mapColumn: typeof mapColumn;
  reversedColumnMappings: { [key: string]: number };
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
      <Header className={styles.marginTop} as="h3">
        Column Mapping
      </Header>
      <Grid>
        <Grid.Row>
          {FieldsToMap.map(({ key, label }) => (
            <Grid.Column key={key} width={3}>
              <Form.Field>
                <label className="block">{label}</label>
                <Select
                  style={{ minWidth: '10em' }}
                  onChange={(event, data) => mapColumn(data.value as number, key)}
                  value={isNil(reversedColumnMappings[key]) ? -1 : reversedColumnMappings[key]}
                  name={key}
                  options={availableFieldOptions}
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
  availableFields: csvHeaderSelector(state),
  reversedColumnMappings: reversedColumnMappingsSelector(state),
});

const mapDispatchToProps = {
  mapColumn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnMappings);
