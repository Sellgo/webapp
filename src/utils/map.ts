import {
  INITIAL_CENTER,
  STATES_DROPDOWN_LIST,
  COUNTRY_DROPDOWN_LIST,
  WORLD_MAP_BOUNDS,
  INITIAL_ZOOM,
} from '../constants/SellerMap';

const offsetMapper = {
  STATE: {
    MIN_LAT_OFFSET: +2,
    MIN_LONG_OFFSET: +2,
    MAX_LAT_OFFSET: -2,
    MAX_LONG_OFFSET: -2,
  },
  COUNTRY: {
    MIN_LAT_OFFSET: +5,
    MIN_LONG_OFFSET: +3,
    MAX_LAT_OFFSET: -3,
    MAX_LONG_OFFSET: -5,
  },
};

/* Utility to calculate the center for the map */
export const calculateCenterForMap = (country: string, state: string) => {
  // if us state is present
  if (state && country === 'US') {
    const findCenterForState = STATES_DROPDOWN_LIST.find((usState: any) => {
      return usState.code === state;
    }).center;

    if (findCenterForState) {
      return findCenterForState;
    } else {
      return INITIAL_CENTER;
    }
  }
  // non-us states only filter by country
  else {
    // find the center for the country selected and dispatch the center
    const findCenterForCountry = COUNTRY_DROPDOWN_LIST.find((countryDetails: any) => {
      return countryDetails.code === country;
    }).center;
    if (findCenterForCountry) {
      return findCenterForCountry;
    } else {
      return INITIAL_CENTER;
    }
  }
};

/* Utility to calculate the zoom for map*/
export const calculateZoomForMap = (country: string, state: string) => {
  if (state && country === 'US') {
    return INITIAL_ZOOM + 1.7;
  }

  return INITIAL_ZOOM;
};

/* Utility to calculate the bounds for map */
export const calculateBoundsForMap = (
  country: string,
  state: string,
  box: { ne: number[] | null; sw: number[] | null }
) => {
  // calculate center for map
  const mapCenter = calculateCenterForMap(country, state);
  const mapZoom = calculateZoomForMap(country, state);

  if (!box.ne && !box.sw) {
    console.log('This is true');
    return {
      mapCenter,
      newMapBounds: WORLD_MAP_BOUNDS,
      mapZoom,
    };
  }

  const OFFSET = offsetMapper[state ? 'STATE' : 'COUNTRY'];
  const [MIN_LAT, MIN_LONG] = box.ne || [];
  const [MAX_LAT, MAX_LONG] = box.sw || [];

  const NE = [Number(MIN_LAT + OFFSET.MIN_LAT_OFFSET), Number(MIN_LONG + OFFSET.MIN_LONG_OFFSET)];
  const SW = [Number(MAX_LAT - OFFSET.MAX_LAT_OFFSET), Number(MAX_LONG - OFFSET.MAX_LONG_OFFSET)];

  const newMapBounds = [NE, SW];

  return {
    newMapBounds,
    mapCenter,
    mapZoom,
  };
};
