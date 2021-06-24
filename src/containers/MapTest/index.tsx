import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

/* Styling */
import styles from './index.module.scss';

type Location = [number, number];

const INITIAL_CENTER: Location = [37.09024, -95.712891];
const INITIAL_ZOOM = 4.8;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8.7;
const WORLD_MAP_BOUNDS: Location[] = [
  [-90, -180],
  [90, 180],
];

const SellerDetailsCard = () => {
  return (
    <>
      <article className={styles.sellerCard}>
        <h1>Seller Name</h1>
        <p>Sales Estimate</p>
      </article>
    </>
  );
};

// plot sellers markers
const PlotAllMarkers = (props: any) => {
  const { sellersData } = props;

  const [showSellerCard, setShowSellerCard] = useState(false);

  return (
    <>
      {sellersData.map((data: any) => {
        const center: Location = [data.latitude, data.longitude];
        return (
          <Marker
            position={center}
            key={data.merchant_id}
            eventHandlers={{
              click: e => {
                console.log('marker clicked', e);
                setShowSellerCard(true);
              },
            }}
          />
        );
      })}
      {showSellerCard && <SellerDetailsCard />}
    </>
  );
};

/* Main Container COmponent */

const MapTest = () => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    axios
      .get('http://18.207.105.104/api/sellers/1000000002/merchantmaps/search?max_count=1000')
      .then(resp => setMapData(resp.data));
  }, []);

  return (
    <section className={styles.mapContainer}>
      <MapContainer
        animate
        center={INITIAL_CENTER}
        zoom={INITIAL_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        closePopupOnClick
        className={styles.map}
        doubleClickZoom={false}
        maxBounds={WORLD_MAP_BOUNDS}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap
        />
        <MarkerClusterGroup>
          <PlotAllMarkers sellersData={mapData} />
        </MarkerClusterGroup>
      </MapContainer>
    </section>
  );
};

export default MapTest;
