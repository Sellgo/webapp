import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import SellerInformation from './SellerInformation';
import InnerTree from './InnerTree';
const SellerDetails = (props: any) => {
  const [treeData, setTreeData] = React.useState([
    {
      title: () => <SellerInformation details={props.details} />,
      className: 'card',
      children: [
        {
          title: () => <InnerTree />,
          className: 'inner-tree',
        },
      ],
    },
  ]);

  return (
    <div className="seller-details">
      <SortableTree
        treeData={treeData}
        theme={CustomTreeRenderer}
        canDrag={false}
        isVirtualized={false}
        onChange={(data: any) => setTreeData(data)}
        rowHeight={({ treeIndex }) => {
          return treeIndex === 0 ? 75 : 400;
        }}
      />
    </div>
  );
};

export default SellerDetails;
