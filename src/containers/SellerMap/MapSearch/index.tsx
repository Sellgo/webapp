import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, EsriProvider } from 'leaflet-geosearch';
import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  WORLD_MAP_BOUNDS,
} from '../../../constants/SellerMap';

// add the geo search on the map
const MapSearch = () => {
  const map = useMap();
  const provider = new EsriProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    classNames: {
      container: 'mapSearchContainer',
      button: 'mapSearchButton',
      resetButton: 'mapSearchResetButton',
      msgbox: 'mapSearchMsgBox',
      form: 'mapSearchForm',
      input: 'mapSearchInput',
    },
    searchLabel: 'Enter a location',
    keepResult: false,
    updateMap: true,
    maxSuggestions: 5,
  });

  useEffect(() => {
    map.addControl(searchControl);

    console.log(map.getCenter());

    const handleResetButtonClick = () => {
      map.setView(INITIAL_CENTER, INITIAL_ZOOM);
      map.setMinZoom(MIN_ZOOM);
      map.setMaxZoom(MAX_ZOOM);
      map.setMaxBounds(WORLD_MAP_BOUNDS);
    };

    const resetButton = document.querySelector('.mapSearchResetButton');
    if (resetButton) {
      resetButton.addEventListener('click', handleResetButtonClick);
    }

    return () => {
      map.removeControl(searchControl);
      if (resetButton) {
        resetButton.removeEventListener('click', handleResetButtonClick);
      }
    };
  }, []);

  return null;
};

export default MapSearch;
