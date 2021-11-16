import React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Actions */
import { getLatestSupplier } from '../../actions/Suppliers';
import { getSellerSubscription } from '../../selectors/Subscription';

/* Components */
import SidebarDropdown from './SidebarDropdown';

/* Constants */
import { getActiveIndex, OPTIONS } from '../../constants/AdminLayout';

/* Utils */
import { isBetaAccount, isSubscriptionIdFreeAccount } from '../../utils/subscriptions';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';
import { NavOptions, NavbarBarOption } from '../../interfaces/Admin';

/* ---------- CSS Logic for the Nav Bar ---------- */
/* eslint-disable-next-line max-len */
/* https://medium.com/@9cv9official/create-a-beautiful-hover-triggered-expandable-sidebar-with-simple-html-css-and-javascript-9f5f80a908d1 */
/* ----------------------------------------------- */

interface Props {
  sellerSubscription: SellerSubscription;
  match: any;
}

const Sidebar = (props: Props) => {
  const { sellerSubscription, match } = props;

  const [navOptions, setNavOptions] = React.useState<NavOptions>(OPTIONS);
  const [currentPath, setCurrentPath] = React.useState<string>(match.url);

  const activePageIndex = getActiveIndex(currentPath);
  const [expandedIndex, setExpandedIndex] = React.useState<number>(activePageIndex);

  const handleDisableNavOption = (label: string, options: NavOptions) => {
    return options.map((mainOption: NavbarBarOption) => {
      if (mainOption.label === label) {
        mainOption.disabled = true;

        mainOption.subOptions &&
          mainOption.subOptions.map((subOption: NavbarBarOption) => {
            subOption.disabled = true;
            return subOption;
          });
      } else {
        mainOption.subOptions &&
          mainOption.subOptions.map((subOption: NavbarBarOption) => {
            if (subOption.label === label) {
              subOption.disabled = true;
            }
            return subOption;
          });
      }
      return mainOption;
    });
  };

  const handleUpdateNavPath = (oldPath: string, newPath: string, options: NavOptions) => {
    return options.map((mainOption: NavbarBarOption) => {
      mainOption.subOptions &&
        mainOption.subOptions.map((subOption: NavbarBarOption) => {
          if (subOption.path === oldPath) {
            subOption.path = newPath;
          }
          return subOption;
        });
      return mainOption;
    });
  };

  React.useEffect(() => {
    let newNavOptions: NavOptions = [...navOptions];

    /* Adding supplier id to profit-finder path parameter */
    let supplier_id = '';
    const latest = getLatestSupplier();
    if (latest) {
      supplier_id = latest.supplier_id;
    }
    newNavOptions = handleUpdateNavPath(
      '/profit-finder',
      `/profit-finder/${supplier_id}`,
      newNavOptions
    );

    /* Disable profit finder if no supplier file is available */
    if (supplier_id.length === 0) {
      newNavOptions = handleDisableNavOption('Profit Finder', newNavOptions);
    }

    /* Disable menu for free subscriptions */
    if (
      isSubscriptionIdFreeAccount(sellerSubscription.subscription_id) ||
      isBetaAccount(sellerSubscription)
    ) {
      newNavOptions = handleDisableNavOption('Product Research', newNavOptions);
      newNavOptions = handleDisableNavOption('Wholesale Bulk Analysis', newNavOptions);
      newNavOptions = handleDisableNavOption('Seller Research', newNavOptions);
      newNavOptions = handleDisableNavOption('Keyword Research', newNavOptions);
    }

    setNavOptions(newNavOptions);
  }, []);

  /* Update path on changes */
  React.useEffect(() => {
    setCurrentPath(match.url);
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
        {navOptions.map((option: NavbarBarOption, index: number) => {
          return (
            <SidebarDropdown
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

export default connect(mapStateToProps)(Sidebar);
