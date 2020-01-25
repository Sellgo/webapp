import * as React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { columnFilter } from '../../../utils/dummy';

const ColumnFilterCard = (props: any) => {
  const { handleColumnChange, columnFilterData } = props;
  return (
    <div className="column-filter-card">
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
