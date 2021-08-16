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

  const asinList = keywordReverseAsinList.split(',');

  return (
    <>
      {asinList.length > 0 && asinList[0] !== '' && (
        <section className={styles.asinList}>
          {asinList.map((asin: string) => {
            return (
              <span key={asin} className={styles.asinPill}>
                {asin}
              </span>
            );
          })}
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordReverseAsinList: getKeywordReverseAsinList(state),
  };
};
export default connect(mapStateToProps)(ReverseAsinsList);
