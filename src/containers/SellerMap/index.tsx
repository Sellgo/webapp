import axios from 'axios';

import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { setLoadingData } from '../../actions/LeadsTracker';
// import { AppConfig } from '../../config';
// import { sellerIDSelector } from '../../selectors/Seller';
import { success } from '../../utils/notifications';

/* Styling */
import styles from './index.module.scss';

type Location = [number, number];

const INITIAL_CENTER: Location = [37.09024, -95.712891];
const INITIAL_ZOOM = 4.8;
const MIN_ZOOM = 2.5;
const MAX_ZOOM = 8.7;
const WORLD_MAP_BOUNDS: Location[] = [
  [-90, -180],
  [90, 180],
];

const SellerDetailsCard = (props: any) => {
  const { merchantId } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [merchantInfo, setMerchantInfo] = useState({ asin: '' });

  useEffect(() => {
    const sellerId = 1000000002;
    setLoadingData(true);
    // eslint-disable-next-line max-len
    const URL = `http://18.207.105.104/api/sellers/${sellerId}/merchants-database?page=1&per_page=1&marketplace_id=ATVPDKIKX0DE&merchant_ids=${merchantId}`;

    if (sellerId && merchantId) {
      axios.get(URL).then(resp => {
        const { data } = resp;
        if (data && data.results) {
          setIsLoading(false);
          setMerchantInfo(data.results[0]);
        }
      });
    }
  }, [merchantId]);

  return (
    <article className={styles.sellerCard}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Merchant ID :{merchantId}</h1>
          <p>Sales Estimate :{merchantInfo.asin}</p>
        </>
      )}
    </article>
  );
};

// plot sellers markers
const PlotAllMarkers = (props: any) => {
  const { sellersData } = props;

  const [showSellerCard, setShowSellerCard] = useState(false);
  const [merchantId, setMerchantId] = useState('');

  return (
    <>
      {sellersData.map((data: any) => {
        const center: Location = [data.latitude, data.longitude];
        return (
          <Marker
            key={data.merchant_id}
            data-id={data.merchant_id}
            position={center}
            eventHandlers={{
              click: (e: any) => {
                setShowSellerCard(true);
                setMerchantId(e.target.options['data-id']);
              },
            }}
          >
            <Tooltip direction="top" offset={[-15, -10]}>
              Click for more details
            </Tooltip>
          </Marker>
        );
      })}
      {showSellerCard && <SellerDetailsCard merchantId={merchantId} />}
    </>
  );
};

/* Main Container COmponent */

const MapTest = () => {
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
