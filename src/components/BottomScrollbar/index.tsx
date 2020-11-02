import { Column, getColumnClass } from '../Table';
import * as React from 'react';
import './index.scss';

interface Props {
  columns: Column[];
}

const BottomScroll = (props: Props) => {
  const { columns } = props;
  const onScroll = (evt: any) => {
    const middleHeader = document.querySelector('.middle-header');
    const middleBody = document.querySelector('.middle-body');
    if (!!middleBody && middleHeader) {
      middleBody.scrollLeft = evt.target.scrollLeft;
      middleHeader.scrollLeft = evt.target.scrollLeft;
    }
  };
  return (
    <div className={'bottom-scrollbar .middle-scroll-cell'} onScroll={onScroll}>
      {columns.map((c: Column) => (
        <div
          className={`middle-scroll-cell ${getColumnClass(c)} bottom-cell`}
          key={`bs-${c.dataKey}`}
        />
      ))}
    </div>
  );
};

export default BottomScroll;
