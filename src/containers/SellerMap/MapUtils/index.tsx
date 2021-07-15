import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MIN_ZOOM, WORLD_MAP_BOUNDS } from '../../../constants/SellerMap';

/* Interfaces */
import { Location } from '../../../interfaces/SellerMap';

interface CenterMapProps {
  mapCenter: Location;
  mapBounds: Location[];
  mapZoom: number;
}

export const CenterMapAndZoom = (props: CenterMapProps) => {
  const { mapCenter, mapBounds, mapZoom } = props;
  const map = useMap();

  useEffect(() => {
    map.setView(mapCenter, mapZoom);
    map.setMaxBounds(mapBounds);
    if (mapBounds === WORLD_MAP_BOUNDS) {
      map.setMinZoom(MIN_ZOOM);
    }
    map.setMinZoom(mapZoom - 0.5);
  }, [mapCenter, mapZoom, mapBounds]);

  return null;
};
