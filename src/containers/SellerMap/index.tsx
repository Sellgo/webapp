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
import QuotaMeter from '../../components/QuotaMeter';
import PageHeader from '../../components/PageHeader';
import PlotAllMarkers from './PlotAllMarkers';
import SellerMapFilter from './SellerMapFilters';

/* Main Container Component */
const SellerMap = (props: any) => {
  const { match } = props;

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
    <main className={styles.sellerMap}>
      <PageHeader
        title={`Seller Database`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Map', to: '/seller-map' },
        ]}
        callToAction={<QuotaMeter />}
        auth={match.params.auth}
      />
      <SellerMapFilter />
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
          <ZoomControl position="topleft" />
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
    </main>
  );
};

export default SellerMap;
