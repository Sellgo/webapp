import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { connect } from 'react-redux';
import { Loader, Segment } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getCenterLocationForMap,
  getIsLoadingSellerForMap,
  getMapBounds,
  getMapZoom,
  getSellerDataForMap,
} from '../../../selectors/SellerResearch/SellerMap';

/* Actions */
import { fetchSellersForMap } from '../../../actions/SellerResearch/SellerMap';

/* Containers */
import SellersList from './SellersList';
import SellerMapFilter from './SellerMapFilter';
import GlobalMapFilters from './GlobalMapFilters';
import PlotAllMarkers from './PlotAllMarkers';
import CenterMapAndZoom from './CenterMapAndZoom';

/* Interfaces */
import { SellerMapPayload, Location } from '../../../interfaces/SellerResearch/SellerMap';

/* Constants */
import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  WORLD_MAP_BOUNDS,
} from '../../../constants/SellerResearch/SellerMap';

/* Assets */
import arrowButton from '../../../assets/images/angle-left-black.svg';

interface Props {
  isLoadingSellersForMap: boolean;
  sellerDataForMap: any;
  fetchSellersForMap: (payload: SellerMapPayload) => void;
  mapCenter: Location;
  mapBounds: Location[];
  mapZoom: number;
}

/* Main Component */
const MapPanel = (props: Props) => {
  const { isLoadingSellersForMap, sellerDataForMap, mapCenter, mapZoom } = props;

  const [showFilter, setShowFilter] = React.useState<boolean>(true);

  return (
    <section className={styles.sellerMapsContainer}>
      {/* Filter Section */}
      <SellerMapFilter showFilter={showFilter} />

      <button
        className={`${styles.toggleShowFiltersButton} ${
          !showFilter ? styles.toggleShowFiltersButton__closed : ''
        }`}
        onClick={() => setShowFilter(!showFilter)}
      >
        <img src={arrowButton} alt="arrow-button" />
      </button>

      {/* Main map display */}
      <div className={styles.mapContainer}>
        {/* Seller map global filters */}
        <GlobalMapFilters />

        {/* Main map */}
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
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap
          />

          {/* ============================================ */}
          {/* Place map utils here before map is prepared */}

          {/* Center based on location */}
          <CenterMapAndZoom mapCenter={mapCenter} mapZoom={mapZoom} />

          {/* ============================================ */}

          {isLoadingSellersForMap ? (
            <Segment className={styles.sellerMapLoader}>
              <Loader
                className={showFilter ? styles.sellerMapLoader__loader__small : ''}
                active={isLoadingSellersForMap}
                size="large"
                content="Populating sellers on map..."
              />
            </Segment>
          ) : (
            <>
              <MarkerClusterGroup>
                <PlotAllMarkers sellersData={sellerDataForMap || []} />
              </MarkerClusterGroup>
            </>
          )}
        </MapContainer>
      </div>

      {/* Sellers List */}
      <SellersList />
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  isLoadingSellersForMap: getIsLoadingSellerForMap(state),
  sellerDataForMap: getSellerDataForMap(state),
  mapCenter: getCenterLocationForMap(state),
  mapBounds: getMapBounds(state),
  mapZoom: getMapZoom(state),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellersForMap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPanel);
