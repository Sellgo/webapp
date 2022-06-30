import { Column, getColumnClass } from '../Table';
import * as React from 'react';
import './index.scss';

interface Props {
  columns: Column[];
  name: string;
}

const BottomScroll = (props: Props) => {
  const { columns, name } = props;
  const onScroll = (evt: any) => {
    if (name === 'products') {
      const middleHeader = document.querySelector('.middle-header');
      const middleBody = document.querySelector('.middle-body');

      if (!!middleBody && middleHeader) {
        middleBody.scrollLeft = evt.target.scrollLeft;
        middleHeader.scrollLeft = evt.target.scrollLeft;
      }
    } else {
      const table = document.querySelector('.generic-table');
      const middleHeader = document.querySelector('.middle-header');
      const middleBody = document.querySelector('.middle-body');

      if (middleBody) {
        middleBody.scrollLeft = evt.target.scrollLeft;
      }

      if (middleHeader) {
        middleHeader.scrollLeft = evt.target.scrollLeft;
      }
      if (table) {
        table.scrollLeft = evt.target.scrollLeft;
      }
    }
  };

  return (
    <div className={'bottom-scrollbar'} onScroll={onScroll}>
      {columns.map((c: Column) => (
        <div
          className={`${name === 'products' ? 'middle-scroll-cell' : 'ptr-scrollbar'} ${
            name === 'trackerTable' ? 'trackerTable' : ''
          } ${getColumnClass(c)} bottom-cell`}
          key={`bs-${c.dataKey}`}
        />
      ))}
    </div>
  );
};

export default BottomScroll;
