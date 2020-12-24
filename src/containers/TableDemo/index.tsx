import React from 'react';
import Table from 'rc-table';
import './index.scss';

const TableDemo = () => {
  const columns: any[] = [
    {
      title: 'title1',
      dataIndex: 'a',
      key: 'a',
      width: 80,
      fixed: 'left',
    },
    { title: 'title2', dataIndex: 'b', key: 'b', width: 80, fixed: 'left' },
    {
      title: 'title3',
      fixed: 'left',
    },
    { title: 'title6', dataIndex: 'c', key: 'f' },
    { title: 'title7', dataIndex: 'c', key: 'g' },
    { title: 'title8', dataIndex: 'c', key: 'h' },
    { title: 'title9', dataIndex: 'b', key: 'i' },
    { title: 'title10', dataIndex: 'b', key: 'j' },
    { title: 'title11', dataIndex: 'b', key: 'k', width: 100, fixed: 'right' },
    { title: 'title12', dataIndex: 'b', key: 'l', width: 80, fixed: 'right' },
  ];

  const data = [
    { a: 'aaa', b: 'bbb', c: '内容内容内容内容内容', d: 3, key: '1' },
    { a: 'aaa', b: 'bbb', c: '内容内容内容内容内容', d: 3, key: '2' },
    { a: 'aaa', c: '内容内容内容内容内容', d: 2, key: '3' },
    { a: 'aaa', c: '内容内容内容内容内容', d: 2, key: '4' },
    { a: 'aaa', c: '内容内容内容内容内容', d: 2, key: '5' },
    { a: 'aaa', c: '内容内容内容内容内容', d: 2, key: '6' },
    { a: 'aaa', c: '内容内容内容内容内容', d: 2, key: '7' },
    { a: 'aaa', c: '内容内容内容内容内容', d: 2, key: '8' },
    { a: 'aaa', c: '内容内容内容内容内容', d: 2, key: '9' },
  ];
  return (
    <div>
      <Table columns={columns} data={data} scroll={{ x: 1650, y: 300 }}/>
    </div>
  );
};

export default TableDemo;
