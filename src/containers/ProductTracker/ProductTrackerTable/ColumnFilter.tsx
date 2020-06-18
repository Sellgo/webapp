import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Checkbox } from 'semantic-ui-react';

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

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const source = columnFilterData.findIndex(
      (c: any) => c.dataKey === columnFilterData[result.source.index].dataKey
    );
    const destination = columnFilterData.findIndex(
      (c: any) => c.dataKey === columnFilterData[result.destination.index].dataKey
    );
    const sourceIndex = columns.findIndex(
      (c: any) => c.dataKey === columnFilterData[result.source.index].dataKey
    );
    const destinationIndex = columns.findIndex(
      (c: any) => c.dataKey === columnFilterData[result.destination.index].dataKey
    );

    const items = reorder(columnFilterData, source, destination);
    const sorted = reorder(columns, sourceIndex, destinationIndex - 1);
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

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'droppableId'} direction={'vertical'}>
              {provided => {
                return (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {filters.map(
                      (check: any, i: any) =>
                        check.value && (
                          <Draggable
                            key={`fc--${Date.now() + i}`}
                            draggableId={check.dataKey}
                            index={i}
                          >
                            {provided => (
                              // @ts-ignore

                              <div
                                className="column-selection-container"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Checkbox
                                  checked={check.value}
                                  onChange={(e: any, data: any) =>
                                    handleColumnChange(e, { ...check, ...data })
                                  }
                                />
                                <span
                                  className="active-columns"
                                  style={{ cursor: 'move', color: '#98AECA', fontSize: 20 }}
                                >
                                  <b>:::&nbsp;</b>
                                </span>
                                <span>{check.key}</span>
                              </div>
                            )}
                          </Draggable>
                        )
                    )}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
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
