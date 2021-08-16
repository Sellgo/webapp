import React from 'react';

import { connect } from 'react-redux';

/* Selectors */
import { getKeywordReverseAsinList } from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Styling */
import styles from './index.module.scss';

interface Props {
  keywordReverseAsinList: string;
}

const ReverseAsinsList = (props: Props) => {
  const { keywordReverseAsinList } = props;

  // const [toAddAsins, setToAddAsins] = useState('');

  const asinList = keywordReverseAsinList.split(',');

  const combinedAsins = [...asinList];

  // const handleAddNewAsins = (e: any) => {
  //   setToAddAsins(e.target.value);
  // };

  return (
    <section className={styles.asinListMapper}>
      {combinedAsins.length > 0 && asinList[0] !== '' && (
        <div className={styles.asinList}>
          {combinedAsins.map((asin: string) => {
            return (
              <span key={asin} className={styles.asinPill}>
                {asin}
              </span>
            );
          })}
          {/* <input
            type="text"
            className={styles.asinInput}
            placeholder="Enter asins spearted by comma"
            value={toAddAsins.toUpperCase()}
            onChange={handleAddNewAsins}
            disabled={asinList.length === 10}
          /> */}
          {/* <span className={styles.infoDetail}>{10 - asinList.length || 0} more ASINs allowed.</span> */}
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordReverseAsinList: getKeywordReverseAsinList(state),
  };
};
export default connect(mapStateToProps)(ReverseAsinsList);
