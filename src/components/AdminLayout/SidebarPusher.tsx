import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Sidebar } from 'semantic-ui-react';
import { setScrollTop } from '../../actions/Suppliers';
import { newProductDesignPathNames } from '../../constants';

const SidebarPusher = ({
  children,
  visible,
  dimmed,
  scrollTop,
  handleAnimationChange,
  setScrollTop,
}: {
  children: any;
  visible: boolean;
  dimmed: boolean;
  scrollTop: boolean;
  handleAnimationChange: () => void;
  setScrollTop: (value: boolean) => void;
}) => {
  const [scrollValue, setScrollValue] = React.useState(0);
  const [currentValue, setCurrentValue] = React.useState(0);

  React.useEffect(() => {
    const getElement: any = document.querySelector('.pusher');
    getElement.addEventListener('scroll', handleScroll);

    const prevScrollTop = currentValue < scrollValue ? false : true;
    if (prevScrollTop !== scrollTop) {
      setScrollTop(!scrollTop);
    }
    if (scrollValue !== currentValue) {
      setCurrentValue(scrollValue);
    }
  }, [scrollValue]);

  const handleScroll = React.useCallback((e: any) => {
    setScrollValue(e.currentTarget.scrollTop);
  }, []);

  const isNewProduct = newProductDesignPathNames.includes(window.location.pathname);

  return (
    <Sidebar.Pusher
      dimmed={dimmed}
      onClick={() => {
        visible && handleAnimationChange();
      }}
      className={`container Sidebar__pusher ${visible ? '' : 'pusher-scroll-x'} ${
        isNewProduct ? 'newSidebar__pusher' : ''
      }`}
    >
      {children}
    </Sidebar.Pusher>
  );
};

const mapStateToProps = (state: any) => ({
  scrollTop: get(state, 'supplier.setScrollTop'),
});

const mapDispatchToProps = {
  setScrollTop: (value: boolean) => setScrollTop(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarPusher);
