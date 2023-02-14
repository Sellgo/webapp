import React from 'react';
import { connect } from 'react-redux';
import JoyRide from 'react-joyride';

/* Styling */
import styles from './index.module.scss';

/* Components */
import DatabaseExport from './DatabaseExport';
import SellgoGetStarted from '../../SellgoGetStarted';

/* Containers */
import SellerDatabaseTable from '../SellerDatabase/DatabaseTable';
import CollectionTableSearch from './CollectionTableSearch';

/* Selectors */
import { getFilterMessage } from '../../../selectors/SellerResearch/SellerDatabase';
import { getSellgoGetStartedJoyRideStatus } from '../../../selectors/UserOnboarding';

/* Interfaces */
import {
  SellerDatabasePayload,
  ShowFilterMessage,
} from '../../../interfaces/SellerResearch/SellerDatabase';

/* Actions */
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

const SellerCollection = (props: Props) => {
  const {
    fetchSellerDatabase,
    sellgoGetStartedJoyRideStatus,
    updateSellgoGetStartedJoyRideStatus,
  } = props;

  React.useEffect(() => {
    fetchSellerDatabase({ filterPayload: { isLookedUp: true, isCollection: true } });
  }, []);

  return (
    <main className={styles.sellerDatbasePage}>
      <CollectionTableSearch />
      <DatabaseExport />
      <SellerDatabaseTable />
      <SellgoGetStarted />
      <JoyRide
        steps={steps}
        run={sellgoGetStartedJoyRideStatus.isCollectionTourRunning}
        continuous={true}
        showProgress={true}
        callback={(data: any) => {
          if (data.action === 'close' || data.action === 'reset') {
            updateSellgoGetStartedJoyRideStatus('isCollectionTourRunning', false);
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
export default connect(mapStateToProps, mapDispatchToProps)(SellerCollection);
