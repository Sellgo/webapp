export const trackEvent = (payload: any) => {
  // @ts-ignore
  if (window.dataLayer) {
    // @ts-ignore
    const dataLayer = window.dataLayer;
    dataLayer.push({ ecommerce: null });
    dataLayer.push(payload);
  } else {
    console.log('no data layer?');
  }
};
