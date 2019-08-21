import React from 'react';
import { Header, Grid, GridColumn, Select, Form } from 'semantic-ui-react';
import styles from '../UploadSupplierFiles.module.css';
import { FieldsToMap } from '../../../constant/constant';
import { Field } from 'redux-form';
import { SelectField } from '../../../components/ReduxFormFields';
import {
  csvSelector,
  reversedColumnMappingsSelector,
} from '../../../selectors/UploadSupplierFiles';
import { connect } from 'react-redux';
import { mapColumn } from '../../../Action/UploadSupplierFilesActions';
import reduce from 'lodash/reduce';

interface ColumnMappingsProps {
  availableFields: string[];
  mapColumn: typeof mapColumn;
  reversedColumnMappings: { [key: string]: string};
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
                <label>{label}</label>
                <Select
                  style={{ minWidth: '10em' }}
                  onChange={(event, data) => mapColumn(data.value as number, key)}
                  value={parseInt(reversedColumnMappings[key], 10)}
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
  availableFields: csvSelector(state).length > 0 ? csvSelector(state)[0] : [],
  reversedColumnMappings: reversedColumnMappingsSelector(state),
});

const mapDispatchToProps = {
  mapColumn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnMappings);
