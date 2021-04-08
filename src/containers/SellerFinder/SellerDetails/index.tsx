import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import SellerInformation from './SellerInformation';
const SellerDetails = () => {
  const [treeData, setTreeData] = React.useState([
    {
      title: () => <SellerInformation />,
      className: 'card',
      children: [{ title: () => <div>Seller Products</div> }],
    },
    // { title: () => <div>Some info</div>, children: [{ title: () => <div>Some info</div> }] },
  ]);
  return (
    <div className="seller-details">
      <SortableTree
        treeData={treeData}
        theme={CustomTreeRenderer}
        canDrag={false}
        isVirtualized={false}
        onChange={(data: any) => setTreeData(data)}
      />
    </div>
  );
};

export default SellerDetails;
