import React from 'react';
import { connect } from 'react-redux';
import JoyRide from 'react-joyride';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import SellerDatabaseFilters from './DatabaseFilters';
import SellerDatabaseTable from './DatabaseTable';
import DatabaseExport from './DatabaseExport';

/* Components */
import FilterMessage from '../../../components/FilterMessage';
import DefaultDisplay from './DefaultDisplay';
import SellgoGetStarted from '../../SellgoGetStarted';
// import SellgoGreetingVideoSection from '../../NewSellgoSubscription/VideoSection';

/* Selectors */
import { getFilterMessage } from '../../../selectors/SellerResearch/SellerDatabase';
import { getSellgoGetStartedJoyRideStatus } from '../../../selectors/UserOnboarding';

/* Interfaces */
import {
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../../interfaces/SellerResearch/SellerDatabase';

/* ACtions */
import { fetchSellerDatabase } from '../../../actions/SellerResearch/SellerDatabase';
import { updateSellgoGetStartedJoyRideStatus } from '../../../actions/UserOnboarding';

interface Props {
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  showFilterMessage: ShowFilterMessage;
  updateSellgoGetStartedJoyRideStatus: (key: string, status: boolean) => void;
  sellgoGetStartedJoyRideStatus: any;
}

const steps = [
  {
    target: '.HeaderSortCell_headerText__alignMiddle__3P4Sh',
    content:
      'Days until stock out shows total number of days of domestic inventory still in stock.',
    placement: 'bottom' as const,
    disableBeacon: true,
  },
  {
    target: '.OrderPlanningMeta_createOrderButton__2PKw2',
    content: 'The first step to your reordering needs, click here to start creating smart order.',
    placement: 'bottom' as const,
    disableBeacon: true,
  },
  {
    target: '.InputTabSelection_inputTabSelection__2ez_k',
    content:
      'Click here to change view of future inventory burnout or future stockout prediction or today inventory details.',
    disableBeacon: true,
  },
  {
    target: '.InventoryBarCell_inventoryBarCell__1_Vrh',
    content: 'Inventory burnout indicator.',
    disableBeacon: true,
  },
  {
    target: '.timeLine',
    content: 'Streamline Gantt chart details',
    disableBeacon: true,
  },
  {
    target: '.timeLine-edit-order',
    content: 'click here to edit order.',
    disableBeacon: true,
  },
  {
    target: '.NavigationButton_navigationButton__1_nZU',
    content: 'Click here to go to order planning setting',
    disableBeacon: true,
  },
];

const SellerDatabase = (props: Props) => {
  const {
    showFilterMessage,
    fetchSellerDatabase,
    sellgoGetStartedJoyRideStatus,
    updateSellgoGetStartedJoyRideStatus,
  } = props;
  // const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [showFilterInitMessage, setShowFilterInitMessage] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (localStorage.getItem('isFilteredOnce')) {
      fetchSellerDatabase({ restoreLastSearch: true });
      return;
    }
    setShowFilterInitMessage(true);
  }, []);

  // React.useEffect(() => {
  //   const skippedVideo = window.localStorage.getItem('skippedSellgoGreetingVideo');

  //   if (skippedVideo) {
  //     setIsModalOpen(false);
  //   } else {
  //     setIsModalOpen(true);
  //   }
  // }, []);
  return (
    <main className={styles.sellerDatbasePage}>
      <SellerDatabaseFilters setShowFilterInitMessage={setShowFilterInitMessage} />

      {showFilterInitMessage ? (
        <DefaultDisplay />
      ) : (
        <>
          <FilterMessage
            active={showFilterMessage.show}
            message={showFilterMessage.message}
            type={showFilterMessage.type}
            className={styles.filterMessage}
          />
          <DatabaseExport />
          <SellerDatabaseTable />
        </>
      )}
      {/* {isModalOpen && <SellgoGreetingVideoSection setIsModalOpen={setIsModalOpen} />} */}
      <SellgoGetStarted />
      <JoyRide
        steps={steps}
        run={sellgoGetStartedJoyRideStatus.isSellerDatabaseTourRunning}
        continuous={true}
        showProgress={true}
        callback={(data: any) => {
          if (data.action === 'close' || data.action === 'reset') {
            updateSellgoGetStartedJoyRideStatus('isSellerDatabaseTourRunning', false);
          }
        }}
        styles={{
          options: {
            primaryColor: '#000',
            zIndex: 100000000000,
          },
        }}
        scrollToFirstStep={false}
        disableScrolling={true}
        disableCloseOnEsc={true}
      />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    showFilterMessage: getFilterMessage(state),
    sellgoGetStartedJoyRideStatus: getSellgoGetStartedJoyRideStatus(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
    updateSellgoGetStartedJoyRideStatus: (key: string, status: boolean) =>
      dispatch(updateSellgoGetStartedJoyRideStatus(key, status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabase);
