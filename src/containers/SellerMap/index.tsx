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

/* Components */
import QuotaMeter from '../../components/QuotaMeter';
import PageHeader from '../../components/PageHeader';
import PlotAllMarkers from './PlotAllMarkers';
import SellerMapFilter from './SellerMapFilters';

/* Selectors */
import { getIsLoadingSellerForMap, getSellerDataForMap } from '../../selectors/SellerMap';

/* Interfaces */
import { SellerMapPayload } from '../../interfaces/SellerMap';

/* Actions */
import { fetchSellersForMap } from '../../actions/SellerMap';

interface Props {
  match: any;
  isLoadingSellersForMap: boolean;
  sellerDataForMap: any;
  fetchSellersForMap: (payload: SellerMapPayload) => void;
}

/* Main Container Component */
const SellerMap = (props: Props) => {
  const { match, isLoadingSellersForMap, sellerDataForMap, fetchSellersForMap } = props;

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
              {/* Force hide clusters markers group when no sellers exists to reove clustered nodes from map */}
              {sellerDataForMap.length > 0 && (
                <MarkerClusterGroup>
                  <PlotAllMarkers sellersData={sellerDataForMap || []} />
                </MarkerClusterGroup>
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
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellersForMap: (payload: SellerMapPayload) => dispatch(fetchSellersForMap(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerMap);
