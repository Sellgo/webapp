import React, { useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';

/* Components */
import SellerMapInfoCard from '../../../../components/SellerMapInfoCard';

/* Interfaces */
import { Location } from '../../../../interfaces/SellerMap';

const PlotAllMarkers = (props: any) => {
  const { sellersData } = props;

  const [internalId, setInternalId] = useState('');

  return (
    <>
      {sellersData.length > 0 &&
        sellersData.map((data: any) => {
          const center: Location = [data.latitude, data.longitude];
          return (
            <Marker
              key={data.id}
              data-id={data.id}
              position={center}
              eventHandlers={{
                click: (e: any) => {
                  setInternalId(e.target.options['data-id']);
                },
              }}
            >
              <Tooltip direction="top" offset={[-15, -10]}>
                Click for more details
              </Tooltip>
            </Marker>
          );
        })}

      <SellerMapInfoCard internalId={internalId} />
    </>
  );
};

export default PlotAllMarkers;
