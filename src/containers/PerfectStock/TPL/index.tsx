import React from 'react';
import { connect } from 'react-redux';

/* Actions */
import { fetchTplVendors, setTplActiveVendor } from '../../../actions/PerfectStock/Tpl';

/* Interfaces */
import { TplVendor } from '../../../interfaces/PerfectStock/Tpl';

/* Selectors */
import { getTplActiveVendor, getTplVendors } from '../../../selectors/PerfectStock/Tpl';

/* Containers */
import TPLVendor from './TPLVendor';
// import {ReactComponent as PlusIcon} from '../../../assets/images/plusIcon.svg';

/* Styles */
import styles from './index.module.scss';

interface Props {
  activeTplVendor: TplVendor;
  tplVendors: TplVendor[];
  fetchTplVendors: () => void;
  setTplActiveVendor: (vendor: TplVendor) => void;
}

const TPL = (props: Props) => {
  const { fetchTplVendors, tplVendors, setTplActiveVendor, activeTplVendor } = props;

  React.useEffect(() => {
    fetchTplVendors();
  }, []);

  // const handleCreateNewVendor = () => {
  //   const newVendor = DEFAULT_NEW_TPL_VENDOR;
  //   const newId = tplVendors.length + 10;
  //   newVendor.id = newId;
  //   const newVendors = [...tplVendors, DEFAULT_NEW_TPL_VENDOR];
  //   setTplVendors(newVendors);
  //   return;
  // };

  return (
    <main>
      <div className={styles.tplVendorTabList}>
        {tplVendors?.map((vendor: TplVendor) => {
          const isSelected =
            activeTplVendor?.id === vendor.id && activeTplVendor?.isNew === vendor.isNew;
          return (
            <div
              className={`
                ${styles.tplVendor}
                ${isSelected ? styles.tplVendor__selected : ''}
              `}
              onClick={() => setTplActiveVendor(vendor)}
              key={vendor.id}
            >
              <span>{vendor.name}</span>
            </div>
          );
        })}
        {/* <div 
          className={styles.tplVendor}
          onClick={handleCreateNewVendor}
        >
          <span>
            <PlusIcon />
          </span>
        </div> */}
      </div>
      <TPLVendor />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tplVendors: getTplVendors(state),
    activeTplVendor: getTplActiveVendor(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTplVendors: () => dispatch(fetchTplVendors()),
    setTplActiveVendor: (vendor: TplVendor) => dispatch(setTplActiveVendor(vendor)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TPL);
