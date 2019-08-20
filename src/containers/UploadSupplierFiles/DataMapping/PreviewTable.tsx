import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { csvSelector, columnMappingsSelector } from '../../../selectors/UploadSupplierFiles';
import reduce from 'lodash/reduce';

interface PreviewTableProps {
  csv: string[][];
  columnMappings: any;
}

const PreviewTable = (props: PreviewTableProps) => {
  const { csv, columnMappings } = props;
  if (csv.length === 0) {
    return <div>Empty Table</div>;
  }

  const columnHeaders = csv.length > 0 ? csv[0] : [];
  const previewRows = csv.slice(1, 6);
  const remainingRowsLength = csv.length > 6 ? csv.length - 6 : 0;

  return (
    <Table celled={true}>
      <Table.Header>
        <Table.Row>
          {columnHeaders.map(columnHeader => (
            <Table.HeaderCell key={columnHeader}>{columnHeader}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          {columnHeaders.map((columnHeader, index) => (
            <Table.Cell key={columnHeader}>{columnMappings[index]}</Table.Cell>
          ))}
        </Table.Row>

        {previewRows.map((previewRow, index) => (
          <Table.Row key={index}>
            {previewRow.map((previewRowValue, index) => (
              <Table.Cell key={index}>{previewRowValue}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      {remainingRowsLength && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={columnHeaders.length}>
              {remainingRowsLength} More
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
};

const mapStateToProps = (state: object) => ({
  csv: csvSelector(state),
  columnMappings: columnMappingsSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewTable);
