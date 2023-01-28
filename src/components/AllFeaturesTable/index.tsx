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
          {header.map((headerVal: string, index: number) => {
            return (
              <th key={uuid()} className={index === 0 ? styles.first : ''}>
                <div>{headerVal}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {body.map((bodyRow: string[]) => {
          return (
            <tr key={uuid()}>
              {bodyRow.map((bodyVal: string, index: number) => {
                return (
                  <td key={uuid()} className={index === 0 ? styles.first : ''}>
                    <div className={bodyVal === '✓' ? styles.blue : ''}>{bodyVal}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AllFeaturesTable;
