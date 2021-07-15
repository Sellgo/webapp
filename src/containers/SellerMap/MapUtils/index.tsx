import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/* Interfaces */
import { Location } from '../../../interfaces/SellerMap';

/* Constants */
import { INITIAL_ZOOM } from '../../../constants/SellerMap';

interface CenterMapProps {
  centerLocation: Location;
  mapBounds: Location[];
}

export const CenterMapAndZoom = (props: CenterMapProps) => {
  const { centerLocation, mapBounds } = props;
  const map = useMap();

  useEffect(() => {
    map.setView(centerLocation, INITIAL_ZOOM);
  }, [centerLocation]);

  useEffect(() => {
    map.setZoom(INITIAL_ZOOM);
    map.setMaxBounds(mapBounds);
  }, [mapBounds]);

  return null;
};
