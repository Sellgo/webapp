import React, { useState, useEffect } from 'react';
import { Table } from 'rsuite';
import axios from 'axios';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Containers */
import Keyword from './Keyword';

/* Constants */
import {
  PRODUCT_KEYWORD_ROW_HEIGHT,
  TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../../constants/KeywordResearch/KeywordTracker';

/* Config */
import { AppConfig } from '../../../../../config';
import DeleteCell from '../../../../../components/NewTable/DeleteCell';

interface Props {
  triggerId: number;
  productId: number;
  refreshData: () => void;
}

const ProductKeywordTable = (props: Props) => {
  const { triggerId, productId, refreshData } = props;
  const [productKeywords, setProductKeywords] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchProductKeywords = async () => {
    try {
      const sellerID = localStorage.getItem('userId');
      const { data, status } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger/assignments?keyword_trigger_id=
          ${triggerId}&keyword_track_product_id=${productId}`
      );

      if (status === 200) {
        setProductKeywords(data);
      }
      setLoading(false);
    } catch (err) {
      console.log('errr');
      setLoading(false);
    }
  };

  const handleDeleteKeyword = async (keywordId: number) => {
    try {
      const sellerID = localStorage.getItem('userId');
      const { status } = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/keywords/trigger/delete-assignments`,
        {
          keyword_trigger_id: triggerId,
          keyword_track_id: keywordId,
        }
      );

      if (status === 200) {
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* Custom scroll logic */
  const handleCustomTableScroll = (e: any) => {
    const verticalScrollRef = document.querySelector(
      '#zapierProductTable #zapierKeywordTable .rs-table-body-wheel-area'
    );

    if (verticalScrollRef) {
      const newScrollY = verticalScrollRef.scrollTop + e.deltaY;
      verticalScrollRef.scrollTo({
        top: newScrollY,
        behavior: 'auto',
      });
    }
  };

  /* Need to overide the custom scroll behavior on mount */
  useEffect(() => {
    const bodyWheelArea = document.querySelector(
      '#zapierProductTable #zapierKeywordTable .rs-table-body-wheel-area'
    );

    if (bodyWheelArea) {
      bodyWheelArea.addEventListener('wheel', handleCustomTableScroll);
    }

    return () => {
      // run cleanup
      if (bodyWheelArea) {
        bodyWheelArea.removeEventListener('wheel', handleCustomTableScroll);
      }
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProductKeywords();
  }, [triggerId]);

  return (
    <>
      {/* Table Section */}
      <div className={styles.keywordTableWrapper}>
        <Table
          loading={isLoading}
          data={productKeywords}
          height={300}
          // shouldUpdateScroll={false}
          hover={false}
          rowHeight={PRODUCT_KEYWORD_ROW_HEIGHT}
          headerHeight={50}
          id="zapierKeywordTable"
          rowKey={TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY}
        >
          {/* Keyword Info */}
          <Table.Column verticalAlign="middle" fixed align="left" width={500} flexGrow={1}>
            <Table.HeaderCell>Keyword</Table.HeaderCell>
            <Keyword dataKey="keyword" />
          </Table.Column>
          {/* Delete Cell */}
          <Table.Column width={200} verticalAlign="middle" align="left">
            <Table.HeaderCell></Table.HeaderCell>
            <DeleteCell
              dataKey="keyword_track_id"
              deleteMessage="Remove this product from Zapier?"
              handleDelete={handleDeleteKeyword}
            />
          </Table.Column>
        </Table>
      </div>
    </>
  );
};

export default ProductKeywordTable;
