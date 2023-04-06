import React from 'react';
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import ActionButton from '../ActionButton';

interface Props {
  tabs: string[];
  setCurrentTab: (a: number) => void;
  currentTab: number;
  className?: string;
}

const TabsRow = (props: Props) => {
  const { tabs, currentTab, setCurrentTab, className } = props;
  const TABS_ICON: { [key: string]: any } = {
    contact: <Icon name="building" />,
  };

  return (
    <div className={className}>
      {tabs.map((tab: string, index: number) => (
        <ActionButton
          key={`${tab}-${index}`}
          variant={currentTab === index ? 'primary' : 'secondary'}
          type={currentTab === index ? 'purpleGradient' : 'grey'}
          size="md"
          onClick={() => setCurrentTab(index)}
        >
          <div className={styles.tabInfo}>
            {TABS_ICON[tab]} <p className={styles.tabInfo__text}>{tab}</p>
          </div>
        </ActionButton>
      ))}
    </div>
  );
};

export default TabsRow;
