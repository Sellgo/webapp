import * as React from 'react';
// import { Checkbox } from 'semantic-ui-react';
import { Item } from '../../../components/ColumnFilterItem';

const ColumnFilterCard = (props: any) => {
  const { handleColumnChange, columnFilterData, handleColumnDrop } = props;
  // const [index,setIndex] = React.useState(Number);
  const move = React.useCallback(
    (dragIndex, hoverIndex) => {
      handleColumnDrop({}, moveItem(dragIndex, hoverIndex));
    },
    [columnFilterData]
  );
  const moveItem = (old_index: any, new_index: any) => {
    const items = columnFilterData;

    const movingItem = items[old_index];
    items.splice(old_index, 1);
    items.splice(new_index, 0, movingItem);

    return items; // for testing
  };

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
              <Item
                check={check}
                index={i}
                handleColumnChange={handleColumnChange}
                id={i}
                moveCard={move}
              />
            )
        )}
      </div>
    </div>
  );
};

export default ColumnFilterCard;
