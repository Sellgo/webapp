import * as React from 'react';
import { Popup, Icon, Checkbox, Container, Divider } from 'semantic-ui-react';

const CheckboxFilter = (props: any) => {
  const { title, check } = props;

  return (
    <Container className="checkbox-filter">
      <div className="checkbox-filter-container">
        <div className="filter-title">
          <p>{title}</p>
        </div>
        {check &&
          check.map((data: any) => {
            return (
              <div key={data.key}>
                <Checkbox label={data.key} checked={data.value} />
                <Popup
                  className="add-supplier-popup"
                  trigger={<Icon name="question circle" size="small" color="grey" />}
                  position="top left"
                  size="tiny"
                />
              </div>
            );
          })}
      </div>
      <Divider />
    </Container>
  );
};
export default CheckboxFilter;
