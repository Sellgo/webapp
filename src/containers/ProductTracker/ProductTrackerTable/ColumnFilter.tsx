import * as React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { Container, Draggable } from 'react-smooth-dnd';
const ColumnFilterCard = (props: any) => {
  const {
    handleColumnChange,
    columnFilterData,
    handleColumnDrop,
    reorderColumns,
    columns,
    columnDnD,
  } = props;
  const [selectAll] = columnFilterData.filter((c: any) => c.key === 'Select All');
  const filters = columnFilterData.filter((c: any) => c.key !== 'Select All' && !!c.key);

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const applyDrag = (dragResult: any) => {
    const { removedIndex, addedIndex } = dragResult;
    if (removedIndex === null && addedIndex === null) return;
    const sourceDataKey = filters[removedIndex].dataKey;
    const destDataKey = filters[addedIndex].dataKey;
    let sourceIndex: any = undefined;
    let destinationIndex: any = undefined;

    let source: any = undefined;
    let destination: any = undefined;

    columnFilterData.forEach((c: any, index: any) => {
      if (c.dataKey === sourceDataKey) {
        source = index;
      }
      if (c.dataKey === destDataKey) {
        destination = index;
      }
    });

    columns.forEach((c: any, index: any) => {
      if (c.dataKey === sourceDataKey) {
        sourceIndex = index;
      }
      if (c.dataKey === destDataKey) {
        destinationIndex = index;
      }
    });

    const items = reorder(columnFilterData, source, destination);
    const sorted = reorder(columns, sourceIndex, destinationIndex);
    handleColumnDrop({}, items);
    reorderColumns(sorted);
  };
  if (columnDnD) {
    return (
      <div className="column-filter-card" onClick={(e: any) => e.stopPropagation()}>
        <div>
          <span style={{ paddingLeft: 30 }}>
            Active Columns
            <br />
          </span>
          <div className="column-selection-container">
            <Checkbox
              checked={selectAll.value}
              onChange={(e: any, data: any) => handleColumnChange(e, { ...selectAll, ...data })}
            />
            <span>{selectAll.key}</span>
            <br />
          </div>
          <Container onDrop={applyDrag} autoScrollEnabled={false}>
            {filters.map((check: any) => (
              <Draggable key={check.dataKey}>
                <div className="column-selection-container">
                  <Checkbox
                    checked={check.value}
                    onChange={(e: any, data: any) => handleColumnChange(e, { ...check, ...data })}
                  />
                  <span
                    className="active-columns"
                    style={{ cursor: 'move', color: '#98AECA', fontSize: 20 }}
                  >
                    <b>:::&nbsp;</b>
                  </span>
                  <span>{check.key}</span>
                </div>
              </Draggable>
            ))}
          </Container>
          <span style={{ paddingLeft: 30 }}>
            Inactive Columns
            <br />
          </span>
          {filters.map(
            (check: any, i: any) =>
              !check.value && (
                <div className="column-selection-container" key={`inactive---${i}`}>
                  <Checkbox
                    checked={check.value}
                    onChange={(e: any, data: any) => handleColumnChange(e, { ...check, ...data })}
                  />
                  <span className="inactive-columns">
                    <b>:::&nbsp;</b>
                  </span>
                  <span>{check.key}</span>
                </div>
              )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="column-filter-card" onClick={(e: any) => e.stopPropagation()}>
      <div>
        <span>
          <b>Select Columns:</b>
          <br />
        </span>
        {columnFilterData.map(
          (check: any, i: any) =>
            check.visible && (
              <Checkbox
                key={i}
                label={check.key}
                checked={check.value}
                onChange={(e: any, data: any) => handleColumnChange(e, data)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ColumnFilterCard;
