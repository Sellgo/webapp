import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/* Interfaces */
import { Location } from '../../../../interfaces/SellerMap';

interface CenterMapProps {
  mapCenter: Location;
  mapZoom: number;
}

const CenterMapAndZoom = (props: CenterMapProps) => {
  const { mapCenter, mapZoom } = props;
  const map = useMap();

  useEffect(() => {
    map.setView(mapCenter, mapZoom);
  }, [mapCenter, mapZoom]);

  return null;
};

export default CenterMapAndZoom;
