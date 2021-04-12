import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import SellerInformation from './SellerInformation';
import InnerTree from './InnerTree';
const SellerDetails = () => {
  const [treeData, setTreeData] = React.useState([
    {
      title: () => <SellerInformation />,
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
        rowHeight={400}
      />
    </div>
  );
};

export default SellerDetails;
