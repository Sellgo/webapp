import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MIN_ZOOM, WORLD_MAP_BOUNDS } from '../../../constants/SellerMap';

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
    if (mapBounds === WORLD_MAP_BOUNDS) {
      map.setMinZoom(MIN_ZOOM);
    }
    map.setMinZoom(mapZoom - 0.5);
  }, [centerLocation, mapZoom, mapBounds]);

  return null;
};
