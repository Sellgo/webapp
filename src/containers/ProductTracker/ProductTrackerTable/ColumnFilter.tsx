import * as React from 'react';
import { Card, Dropdown, Checkbox } from 'semantic-ui-react';
import { columnFilter } from '../../../utils/dummy';

const ColumnFilterCard = (props: any) => {
  return (
    <div className="column-filter-card">
      <Card>
        <Card.Content>
          <div>
            <span>
              <b>Select Columns:</b>
              <br />
            </span>
            {columnFilter.map((check, i) => (
              <Checkbox key={i} label={check.key} checked={check.value} />
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ColumnFilterCard;
