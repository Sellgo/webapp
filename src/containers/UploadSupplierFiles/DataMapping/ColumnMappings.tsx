import React from 'react';
import { Header, Grid, Select, Form, Checkbox } from 'semantic-ui-react';
import styles from '../UploadSupplierFiles.module.css';
import { FieldsToMap } from '../../../constants/constants';
import {
  reversedColumnMappingsSelector,
  csvHeaderSelector,
  isFirstRowHeaderSelector,
} from '../../../selectors/UploadSupplierFiles';
import { connect } from 'react-redux';
import { mapColumn, toggleFirstRowHeader } from '../../../actions/UploadSupplierFiles';
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
  isFirstRowHeader,
  toggleFirstRowHeader,
}: ColumnMappingsProps) => {
  const availableFieldOptions = availableFields.map((availableField, index) => ({
    text: availableField,
    value: index,
  }));

  return (
    <>
      <Header className={styles.marginTop} as="h3">
        <span>Column Mapping{'  '}</span>
        <Checkbox
          style={{ marginLeft: 20 }}
          checked={isFirstRowHeader}
          onChange={toggleFirstRowHeader}
          label="has header?"
        />
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
  availableFields: csvHeaderSelector(state),
  reversedColumnMappings: reversedColumnMappingsSelector(state),
  isFirstRowHeader: isFirstRowHeaderSelector(state),
});

const mapDispatchToProps = {
  mapColumn,
  toggleFirstRowHeader,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnMappings);
