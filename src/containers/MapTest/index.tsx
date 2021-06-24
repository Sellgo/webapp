import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet';

/* Styling */
import styles from './index.module.scss';

type Location = [number, number];
const center: Location = [37.09024, -95.712891];
const zoom = 5;

const UseHooksComponent = () => {
  const map = useMap();
  console.log('map center:', map.getCenter());

  // return null on hooks
  return null;
};

// plot sellers markers
const PlotAllMarkers = (props: any) => {
  const { sellersData } = props;

  return (
    <>
      {sellersData.map((data: any) => {
        const center: Location = [data.latitude, data.longitude];
        return (
          <Marker position={center} key={data.merchant_id}>
            <Circle center={center} radius={10000} fillColor="red" fillOpacity={0.8} />
            <Popup>Clicked merchant {data.merchant_id}</Popup>
          </Marker>
        );
      })}
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
        center={center}
        zoom={zoom}
        minZoom={2}
        maxZoom={10}
        closePopupOnClick
        className={styles.map}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UseHooksComponent />
        <PlotAllMarkers sellersData={mapData} />
      </MapContainer>
    </section>
  );
};

export default MapTest;
