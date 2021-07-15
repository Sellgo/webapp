import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/* Interfaces */
import { Location } from '../../../interfaces/SellerMap';

interface CenterMapProps {
  centerLocation: Location;
  mapBounds: Location[];
  mapZoom: number;
}

export const CenterMapAndZoom = (props: CenterMapProps) => {
  const { centerLocation, mapBounds, mapZoom } = props;
  const map = useMap();

  useEffect(() => {
    map.setView(centerLocation, mapZoom);
    map.setMaxBounds(mapBounds);
  }, [centerLocation, mapZoom, mapBounds]);

  return null;
};
