import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';
import axios from 'axios';

import { success } from '../../utils/notifications';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';

/* Components */
import SellerMapInfoCard from '../../components/SellerMapInfoCard';

type Location = [number, number];

const INITIAL_CENTER: Location = [37.09024, -95.712891];
const INITIAL_ZOOM = 4.8;
const MIN_ZOOM = 2.5;
const MAX_ZOOM = 8.7;
const WORLD_MAP_BOUNDS: Location[] = [
  [-90, -180],
  [90, 180],
];

// plot sellers markers
const PlotAllMarkers = (props: any) => {
  const { sellersData } = props;

  const [showSellerCard, setShowSellerCard] = useState(true);
  const [internalId, setInternalId] = useState('');

  return (
    <>
      {sellersData.map((data: any) => {
        const center: Location = [data.latitude, data.longitude];
        return (
          <Marker
            key={data.id}
            data-id={data.id}
            position={center}
            eventHandlers={{
              click: (e: any) => {
                setShowSellerCard(true);
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
      {<SellerMapInfoCard internalId={internalId} showSellerCard={showSellerCard} />}
    </>
  );
};

// add the geo search on the map
const MapSearch = () => {
  const map = useMap();
  const provider = new EsriProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    classNames: {
      container: 'mapSearchContainer',
      button: 'mapSearchButton',
      resetButton: 'mapSearchResetButton',
      msgbox: 'mapSearchMsgBox',
      form: 'mapSearchForm',
      input: 'mapSearchInput',
    },
    searchLabel: 'Enter a location',
    keepResult: false,
    updateMap: true,
    maxSuggestions: 5,
  });

  useEffect(() => {
    map.addControl(searchControl);

    console.log(map.getCenter());

    const handleResetButtonClick = () => {
      map.setView(INITIAL_CENTER, INITIAL_ZOOM);
      map.setMinZoom(MIN_ZOOM);
      map.setMaxZoom(MAX_ZOOM);
      map.setMaxBounds(WORLD_MAP_BOUNDS);
    };

    const resetButton = document.querySelector('.mapSearchResetButton');
    if (resetButton) {
      resetButton.addEventListener('click', handleResetButtonClick);
    }

    return () => {
      map.removeControl(searchControl);
      if (resetButton) {
        resetButton.removeEventListener('click', handleResetButtonClick);
      }
    };
  }, []);

  return null;
};

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
      >
        <MapSearch />
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
