import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import axios from 'axios';

import { success } from '../../utils/notifications';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';

/* Constants */
import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  WORLD_MAP_BOUNDS,
} from '../../constants/SellerMap';

/* Components */
import PlotAllMarkers from './PlotAllMarkers';

/* Main Container Component */
const SellerMap = () => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    axios
      .get('http://18.207.105.104/api/sellers/1000000002/merchantmaps/search?max_count=1000')
      .then(resp => {
        setMapData(resp.data);
        success(`Found ${resp.data.length} sellers`);
      })
      .catch(err => {
        console.error('Error fetching data', err.response);
      });
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
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
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

export default SellerMap;
