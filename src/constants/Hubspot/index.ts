export const NON_EDITABLE_FIELDS = ['professional_email_1', 'last_name', 'first_name'];

export const canSubmitHubspotMappings = (
  hubspotMappings: string | any[],
  hubspotPropertyType: { [x: string]: any }
) => {
  let errMsg = '';
  for (let index = 0; index < hubspotMappings.length; index++) {
    const { sellgo_prop_type, hubspot_prop, sellgo_prop } = hubspotMappings[index];
    if (
      hubspot_prop &&
      hubspotPropertyType[hubspot_prop] &&
      sellgo_prop_type !== hubspotPropertyType[hubspot_prop]
    ) {
      errMsg = `${hubspot_prop} property cannot be mapped with ${sellgo_prop} because of type difference`;
      break;
    }
  }
  return errMsg;
};
