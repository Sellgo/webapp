import _ from 'lodash';

/* Get Domain from URL */
export const getDomain = (url: string) => {
  const returnedUrl = url.replace(/https?:\/\/(www.)?/i, '');
  if (returnedUrl.indexOf('/') === -1) {
    return returnedUrl;
  }
  return returnedUrl.split('/')[0];
};

/* Get ASIN from link */
export const convertAsinLinks = (data: string) => {
  const regex = RegExp('(?:[/dp/]|$)([A-Z0-9]{10})');
  const asinData = data.split(' ');
  _.each(asinData, (item, index) => {
    const res = item.match(regex);
    if (res) {
      asinData[index] = res[1];
    }
  });
  return asinData.join('');
};
