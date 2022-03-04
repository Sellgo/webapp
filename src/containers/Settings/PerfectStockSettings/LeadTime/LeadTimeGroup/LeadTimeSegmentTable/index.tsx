import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import DeleteCell from '../../../../../../components/NewTable/DeleteCell';
import EditValueCell from '../../../../../../components/NewTable/EditValueCell';
import EditValueSelectionCell from '../../../../../../components/NewTable/EditValueSelectionCell';

/* Constants */
import { LEAD_TIME_OPTIONS } from '../../../../../../constants/PerfectStock';

/* Interfaces */
import { LeadTime } from '../../../../../../interfaces/PerfectStock/SalesProjection';

interface Props {
  leadTimeSegments: LeadTime[];
  handleLeadTimeGroupEdit: (key: string, value: any, id: number) => void;
  handleLeadTimeDelete: (id: number) => void;
}

const LeadTimeSegmentTable = (props: Props) => {
  const { leadTimeSegments, handleLeadTimeGroupEdit, handleLeadTimeDelete } = props;

  /* Calculate duration sum of leadTimeSegments */
  const durationSum = leadTimeSegments?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.duration;
  }, 0);

  return (
    <section className={styles.keywordTrackerTableWrapper}>
      <Table
        // loading={false}
        data={leadTimeSegments}
        // height={420}
        autoHeight
        hover={false}
        rowHeight={60}
        headerHeight={55}
        id="leadTimeTable"
        shouldUpdateScroll={false}
      >
        {/* Lead Time Type */}
        <Table.Column width={200} verticalAlign="middle" align="center">
          <Table.HeaderCell>Lead Time Type</Table.HeaderCell>
          <EditValueSelectionCell
            dataKey="type"
            options={LEAD_TIME_OPTIONS}
            handleChange={handleLeadTimeGroupEdit}
            align="center"
            inputWidth={150}
          />
        </Table.Column>

        {/* Duration */}
        <Table.Column width={130} verticalAlign="middle" align="center">
          <Table.HeaderCell>
            <span className={styles.orangeNumber}>{durationSum}&nbsp;</span> Days
          </Table.HeaderCell>
          <EditValueCell
            dataKey="duration"
            handleChange={handleLeadTimeGroupEdit}
            appendMessage="days"
            isNumber
            isPositiveOnly
            isInteger
          />
        </Table.Column>

        {/* Delete Cell */}
        <Table.Column flexGrow={1} verticalAlign="middle" align="right">
          <Table.HeaderCell />
          <DeleteCell
            dataKey="id"
            deleteMessage="Remove this lead time?"
            handleDelete={handleLeadTimeDelete}
          />
        </Table.Column>
      </Table>
    </section>
  );
};

export default LeadTimeSegmentTable;
