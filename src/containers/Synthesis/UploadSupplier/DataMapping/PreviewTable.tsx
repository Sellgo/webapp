import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  fileStringArraySelector,
  columnMappingsSelector,
  fileHeaderSelector,
} from '../../../../selectors/UploadSupplier';

const NUMBER_OF_ROWS_TO_DISPLAY = 6;
interface PreviewTableProps {
  fileStringArray: string[][];
  columnHeaders: string[];
  columnMappings: any;
}

const PreviewTable = (props: PreviewTableProps) => {
  const { fileStringArray, columnHeaders } = props;
  if (fileStringArray.length === 0) {
    return <div>Empty Table</div>;
  }

  const previewRows = fileStringArray.slice(0, NUMBER_OF_ROWS_TO_DISPLAY);
  const remainingRowsLength =
    fileStringArray.length > NUMBER_OF_ROWS_TO_DISPLAY
      ? fileStringArray.length - NUMBER_OF_ROWS_TO_DISPLAY
      : 0;

  return (
    <Table celled={true} unstackable={true}>
      <Table.Header>
        <Table.Row>
          {columnHeaders.map(columnHeader => (
            <Table.HeaderCell key={columnHeader}>{columnHeader}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {previewRows.map((previewRow, index) => (
          <Table.Row key={index}>
            {previewRow.map((previewRowValue, index) => (
              <Table.Cell className="PreviewTable__cell" key={index}>
                {previewRowValue}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      {remainingRowsLength ? (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={columnHeaders.length}>
              {remainingRowsLength} More
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      ) : null}
    </Table>
  );
};

const mapStateToProps = (state: object) => ({
  columnHeaders: fileHeaderSelector(state),
  fileStringArray: fileStringArraySelector(state),
  columnMappings: columnMappingsSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewTable);
