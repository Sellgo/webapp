import React from 'react';

/* Styling */
import styles from './index.module.scss';

const WordFreqContent = () => {
  return (
    <ul className={styles.wordFreqList}>
      <li>
        <span>Word 1</span>
        <span>6,3567</span>
      </li>

      <li>
        <span>Word 2 </span>
        <span>6,3567</span>
      </li>

      <li>
        <span>Word 3</span>
        <span>6,3567</span>
      </li>

      <li>
        <span>Word 4</span>
        <span>6,3567</span>
      </li>

      <li>
        <span>Word 5</span>
        <span>6,3567</span>
      </li>

      <li>
        <span>Word 6</span>
        <span>6,3567</span>
      </li>
    </ul>
  );
};

export default WordFreqContent;
