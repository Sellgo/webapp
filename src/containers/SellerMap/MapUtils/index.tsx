import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/* Interfaces */
import { Location } from '../../../interfaces/SellerMap';

/* Constants */
import { INITIAL_ZOOM } from '../../../constants/SellerMap';

interface CenterMapProps {
  centerLocation: Location;
}

export const CenterMapAndZoom = (props: CenterMapProps) => {
  const { centerLocation } = props;
  const map = useMap();

  useEffect(() => {
    map.setView(centerLocation, INITIAL_ZOOM);
  }, [centerLocation]);

  return null;
};
