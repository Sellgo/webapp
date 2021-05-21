import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

interface Props {
  header: string[];
  body: string[][];
}

const AllFeaturesTable: React.FC<Props> = props => {
  const { header, body } = props;

  return (
    <table className={styles.allFeaturesTable}>
      <thead>
        <tr>
          {header.map((headerVal: string) => {
            return <th key={uuid()}>{headerVal}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {body.map((bodyRow: string[]) => {
          return (
            <tr key={uuid()}>
              {bodyRow.map((bodyVal: string) => {
                return <td key={uuid()}>{bodyVal}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AllFeaturesTable;
