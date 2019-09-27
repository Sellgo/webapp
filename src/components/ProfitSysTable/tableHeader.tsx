import React from 'react';
import { Table, Checkbox, Icon } from 'semantic-ui-react';

const TableHeader = (props: any) => {
  const { header, column, direction, sortOnClick, onSelectAll } = props;
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Checkbox onChange={(e, data) => onSelectAll(e, data.checked)} />
          <span className="tbl_sort_icn singl_icn">
            <Icon className="down_arrow" name="angle down" />
          </span>
        </Table.HeaderCell>
        {Array.isArray(header) &&
          header.map((headerItem, i) => {
            return (
              <Table.HeaderCell
                // sorted={column === headerItem["name"] && headerItem['sortable'] ? direction : null}
                onClick={sortOnClick(headerItem['name'], headerItem['sortable'])}
                key={i}
              >
                <span>{headerItem['label']}</span>
                {headerItem['sortable'] && (
                  <span className="tbl_sort_icn">
                    <Icon className="up_arrow" name="angle up" />{' '}
                    <Icon className="down_arrow" name="angle down" />
                  </span>
                )}
                {headerItem['icon'] && (
                  <span className="tbl_sort_icn singl_icn">
                    <Icon className="down_arrow" name="angle down" />
                  </span>
                )}
                {headerItem['icon'] ? (
                  <img className="download_icn" src={headerItem['icon']} alt="dnwld_icn" />
                ) : null}
              </Table.HeaderCell>
            );
          })}
      </Table.Row>
    </Table.Header>
  );
};

export default TableHeader;
