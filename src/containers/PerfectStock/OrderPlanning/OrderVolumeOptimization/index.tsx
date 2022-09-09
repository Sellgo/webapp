import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Selectors */
import {
  getActivePurchaseOrder,
  getInventoryTableResults,
} from '../../../../selectors/PerfectStock/OrderPlanning';

/* Interfaces */
import { PurchaseOrder } from '../../../../interfaces/PerfectStock/OrderPlanning';

/* Utils */
import { error, success } from '../../../../utils/notifications';

/* Components */
import VolumeOptimizationAccodian from '../../../../components/VolumeOptimizationAccodian';

/* Constants */
import { AppConfig } from '../../../../config';

interface Props {
  activeOrder: PurchaseOrder;
  inventoryTableResults: any[];
}

const OrderVolumeOptimization = (props: Props) => {
  const { activeOrder, inventoryTableResults } = props;
  const [volumeOptimizationData, setVolumeOptimizationData] = useState<any>([]);
  const [containersConfigData, setContainersConfigData] = useState<any>([]);
  const sellerID = localStorage.getItem('userId');
  const fetchContainersConfig = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/shipping-container-configs`
      );

      if (status === 200) {
        const tempData: any[] = [];
        data.forEach((configData: any) => {
          tempData.push({
            key: configData?.shipping_container_id,
            value: configData?.shipping_container_id,
            text: configData?.container_name,
          });
        });
        setContainersConfigData(tempData);
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  };
  const fetchOptimizeVolumeData = async () => {
    try {
      const { status, data } = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerID}/purchase-orders/${activeOrder.id}/optimize-volume`
      );

      if (status === 200) {
        if (data && !(data.length > 0)) {
          try {
            const { status, data } = await axios.post(
              `${AppConfig.BASE_URL_API}sellers/${sellerID}/purchase-orders/${activeOrder.id}/optimize-volume`
            );
            if (status === 201) {
              setVolumeOptimizationData(data);
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          setVolumeOptimizationData(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  React.useEffect(() => {
    fetchContainersConfig();
  }, []);

  React.useEffect(() => {
    if (activeOrder.id && activeOrder.id >= 0) {
      fetchOptimizeVolumeData();
    }
  }, [activeOrder, inventoryTableResults]);

  const patchContainerChange = async (
    shipping_container_id: number,
    volume_optimization_id: number
  ) => {
    const formData = new FormData();
    formData.set('shipping_container_id', `${shipping_container_id}`);
    formData.set('volume_optimization_id', `${volume_optimization_id}`);

    try {
      const URL = `${AppConfig.BASE_URL_API}sellers/${sellerID}/purchase-orders/${activeOrder.id}/optimize-volume`;

      const { status, data } = await axios.patch(URL, formData);
      if (status === 200) {
        setVolumeOptimizationData(data);
        success('Volume optimization data updated successfully!');
      }
    } catch (err) {
      error('Cannot update volume optimization data');
      console.error(err);
    }
  };

  if (!activeOrder.id || activeOrder.id === -1) {
    return null;
  }

  return (
    <>
      {volumeOptimizationData &&
        volumeOptimizationData.length > 0 &&
        volumeOptimizationData.map((optimizationData: any) => {
          const { id } = optimizationData;
          return (
            <VolumeOptimizationAccodian
              key={optimizationData?.id}
              name={optimizationData?.name}
              containerDropDownOptions={containersConfigData}
              maxVolumeCBM={optimizationData?.container_size_cbm}
              maxVolumeFT={optimizationData?.container_size_cft}
              orderEfficency={optimizationData?.efficiency}
              orderVolumeCDM={optimizationData?.volume_cbm}
              orderVolumeFT={optimizationData?.volume_cft}
              dropDownActiveValue={optimizationData?.shipping_container_id}
              handleContainerChange={(value: number) => {
                patchContainerChange(value, id);
              }}
            />
          );
        })}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    activeOrder: getActivePurchaseOrder(state),
    inventoryTableResults: getInventoryTableResults(state),
  };
};

export default connect(mapStateToProps)(OrderVolumeOptimization);
