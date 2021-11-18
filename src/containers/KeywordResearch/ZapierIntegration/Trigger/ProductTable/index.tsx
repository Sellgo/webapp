import React, { useState } from 'react';
import { Table } from 'rsuite';
import axios from 'axios';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import StatsCell from '../../../../../components/NewTable/StatsCell';
import DeleteCell from '../../../../../components/NewTable/DeleteCell';
import ExpansionCell from '../../../../../components/NewTable/ExpansionCell';

/* Containers */
import ProductInfo from './ProductInfo';

/* Child Table */
import ProductKeywordTable from '../ProductKeywordTable';

/* Constants */
import { TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY } from '../../../../../constants/KeywordResearch/KeywordTracker';
import { AppConfig } from '../../../../../config';

interface Props {
  assignedProducts: any[];
  triggerId: number;
  refreshData: () => void;
}

const ProductTable = (props: Props) => {
  const { assignedProducts, triggerId, refreshData } = props;
  const [expandedRowKeys, setExpandedRowkeys] = useState<string[]>([]);

  const handleExpansion = (rowData: any) => {
    const rowId = rowData[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY];
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const sellerID = localStorage.getItem('userId');
      const { status } = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger/delete-assignments`,
        {
          keyword_trigger_id: triggerId,
          keyword_track_product_id: productId,
        }
      );

      if (status === 200) {
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={styles.keywordTrackerTableWrapper}>
      <Table
        // loading={false}
        data={assignedProducts}
        // height={420}
        autoHeight
        hover={false}
        rowHeight={60}
        headerHeight={55}
        id="zapierProductTable"
        shouldUpdateScroll={false}
        //  Props for table expansion
        rowKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY}
        rowExpandedHeight={300}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={(rowData: any) => (
          <ProductKeywordTable
            refreshData={refreshData}
            productId={rowData.keyword_track_product_id}
            triggerId={triggerId}
          />
        )}
      >
        {/* Expand Cell */}
        <Table.Column verticalAlign="top" fixed="left" align="left" width={30}>
          <Table.HeaderCell> </Table.HeaderCell>
          <ExpansionCell
            dataKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY}
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpansion}
          />
        </Table.Column>

        {/* Product Info */}
        <Table.Column minWidth={300} verticalAlign="top" fixed="left" align="left" flexGrow={1}>
          <Table.HeaderCell className={styles.productInfoHeader}>
            Product Information
          </Table.HeaderCell>
          <ProductInfo dataKey="productInfo" />
        </Table.Column>

        {/* Keywords */}
        <Table.Column width={200} verticalAlign="top" align="left">
          <Table.HeaderCell>Keywords</Table.HeaderCell>
          <StatsCell dataKey="assigned_keywords_count" align="center" />
        </Table.Column>

        {/* Delete Cell */}
        <Table.Column width={50} verticalAlign="top" align="left">
          <Table.HeaderCell></Table.HeaderCell>
          <DeleteCell
            dataKey="keyword_track_product_id"
            deleteMessage="Remove this product from Zapier?"
            handleDelete={handleDeleteProduct}
          />
        </Table.Column>
      </Table>
    </section>
  );
};

export default ProductTable;
