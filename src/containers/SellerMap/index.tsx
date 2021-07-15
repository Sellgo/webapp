import React, { useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { connect } from 'react-redux';
import { Loader, Segment } from 'semantic-ui-react';

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

/* Selectors */
import {
  getCenterLocationForMap,
  getIsLoadingSellerForMap,
  getMapBounds,
  getMapZoom,
  getSellerDataForMap,
} from '../../selectors/SellerMap';

/* Interfaces */
import { SellerMapPayload, Location } from '../../interfaces/SellerMap';

/* Actions */
import { fetchSellersForMap } from '../../actions/SellerMap';

/* Components */
import QuotaMeter from '../../components/QuotaMeter';
import PageHeader from '../../components/PageHeader';
import PlotAllMarkers from './PlotAllMarkers';
import SellerMapFilter from './SellerMapFilters';
import { CenterMapAndZoom } from './MapUtils';

interface Props {
  match: any;
  isLoadingSellersForMap: boolean;
  sellerDataForMap: any;
  fetchSellersForMap: (payload: SellerMapPayload) => void;
  centerForMap: Location;
  mapBounds: Location[];
  mapZoom: number;
}

/* Main Container Component */
const SellerMap = (props: Props) => {
  const {
    match,
    isLoadingSellersForMap,
    sellerDataForMap,
    fetchSellersForMap,
    centerForMap,
    mapBounds,
    mapZoom,
  } = props;

  // Effect to run on first load
  useEffect(() => {
    fetchSellersForMap({ maxCount: 1000 });
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
          preferCanvas
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

          {/* ============================================ */}
          {/* Place map utils here before map is prepared */}

          {/* Center based on location */}
          <CenterMapAndZoom centerLocation={centerForMap} mapBounds={mapBounds} mapZoom={mapZoom} />

          {/* ============================================ */}

          {isLoadingSellersForMap ? (
            <Segment className={styles.sellerMapLoader}>
              <Loader
                active={isLoadingSellersForMap}
                size="large"
                content="Populating sellers on map..."
              />
            </Segment>
          ) : (
            <>
              {/* Perform clustering only if count > 50 */}
              {sellerDataForMap.length > 50 ? (
                <MarkerClusterGroup>
                  <PlotAllMarkers sellersData={sellerDataForMap || []} />
                </MarkerClusterGroup>
              ) : (
                <PlotAllMarkers sellersData={sellerDataForMap || []} />
              )}
            </>
          )}
        </MapContainer>
      </section>
    </main>
  );
};

const mapStateToProps = (state: any) => ({
  isLoadingSellersForMap: getIsLoadingSellerForMap(state),
  sellerDataForMap: getSellerDataForMap(state),
  centerForMap: getCenterLocationForMap(state),
  mapBounds: getMapBounds(state),
  mapZoom: getMapZoom(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellersForMap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerMap);
