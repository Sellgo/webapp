import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Actions */
import { getLatestSupplier } from '../../actions/Suppliers';
import { getSellerSubscription } from '../../selectors/Subscription';

/* Components */
import NavbarDropdown from './NavbarDropdown';

/* Constants */
import { getActiveIndex, OPTIONS } from '../../constants/AdminLayout';

/* Utils */
import { disableNavOption, updateNavPath } from '../../utils/nav';
import { isSubscriptionIdFreeAccount } from '../../utils/subscriptions';

/* Types */
import { NavOptions, MainNavOption } from '../../interfaces/Admin';
import { SellerSubscription } from '../../interfaces/Seller';

/* ---------- CSS Logic for the Nav Bar ---------- */
/* eslint-disable-next-line max-len */
/* https://medium.com/@9cv9official/create-a-beautiful-hover-triggered-expandable-sidebar-with-simple-html-css-and-javascript-9f5f80a908d1 */
/* ----------------------------------------------- */

interface Props {
  sellerSubscription: SellerSubscription;
  match: any;
}

const NavBar = (props: Props) => {
  const { sellerSubscription, match } = props;

  const [navOptions, setNavOptions] = React.useState<NavOptions>(OPTIONS);
  const [currentPath, setCurrentPath] = React.useState<string>(match.path);

  const activePageIndex = getActiveIndex(currentPath);
  const [expandedIndex, setExpandedIndex] = React.useState<number>(activePageIndex);

  React.useEffect(() => {
    const newNavOptions: NavOptions = [...navOptions];

    /* Adding supplier id to profit-finder path parameter */
    let supplier_id = '';
    const latest = getLatestSupplier();
    if (latest) {
      supplier_id = latest.supplier_id;
    }
    updateNavPath('/profit-finder', `/profit-finder/${supplier_id}`, newNavOptions);

    /* Disable profit finder if no supplier file is available */
    if (supplier_id.length === 0) {
      disableNavOption('Profit Finder', newNavOptions);
    }

    /* Disable menu for free subscriptions */
    if (isSubscriptionIdFreeAccount(sellerSubscription.subscription_id)) {
      disableNavOption('Product Research', newNavOptions);
      disableNavOption('Wholesale Bulk Analysis', newNavOptions);
      disableNavOption('Seller Research', newNavOptions);
      disableNavOption('Keyword Research', newNavOptions);
    }

    setNavOptions(newNavOptions);
  }, []);

  /* Update path on changes */
  React.useEffect(() => {
    setCurrentPath(match.path);
  }, [match]);

  const handleSetExpandedIndex = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = expandedIndex === index ? -1 : index;
    setExpandedIndex(newIndex);
  };

  return (
    <div className={styles.navbarWrapper}>
      <Accordion
        className={styles.navBar}
        /* Reset expanded index to active page when resetting menu */
        onMouseEnter={() => setExpandedIndex(activePageIndex)}
      >
        {navOptions.map((option: MainNavOption, index: number) => {
          return (
            <NavbarDropdown
              key={index}
              currentPath={currentPath}
              setCurrentPath={setCurrentPath}
              option={option}
              optionIndex={index}
              expandedIndex={expandedIndex}
              setExpandedIndex={handleSetExpandedIndex}
              mainOptionClassName={styles.mainNavOption}
              subOptionClassName={styles.subNavOptions}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: getSellerSubscription(state),
});

export default connect(mapStateToProps)(NavBar);
