import { Column, getColumnClass } from '../Table';
import * as React from 'react';
import './index.scss';
import { useEffect, useRef } from 'react';

interface Props {
  columns: Column[];
  name: string;
  filteredColumns?: any;
}

const BottomScroll = (props: Props) => {
  const { columns, name, filteredColumns } = props;
  const bottomScrollContent = useRef(null);
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

      if (middleHeader) {
        middleHeader.scrollLeft = evt.target.scrollLeft;
      }
      if (table) {
        table.scrollLeft = evt.target.scrollLeft;
      }
    }
  };

  useEffect(() => {
    const table = document.querySelector('.generic-table');
    const middleHeader = document.querySelector('.middle-header');
    const middleBody = document.querySelector('.middle-body');
    if (!!middleBody && middleHeader && table) {
      middleBody.scrollLeft = table.scrollLeft;
      middleHeader.scrollLeft = table.scrollLeft;
    }
  }, [filteredColumns]);

  return (
    <div className={'bottom-scrollbar'} onScroll={onScroll} ref={bottomScrollContent}>
      {columns.map((c: Column) => (
        <div
          className={`${
            name === 'products' ? 'middle-scroll-cell' : 'ptr-scrollbar'
          } ${getColumnClass(c)} bottom-cell`}
          key={`bs-${c.dataKey}`}
        />
      ))}
    </div>
  );
};

export default BottomScroll;
