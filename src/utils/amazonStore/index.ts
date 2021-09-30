/* Get Domain from URL */
export const getDomain = (url: string) => {
  const returnedUrl = url.replace(/https?:\/\/(www.)?/i, '');
  if (returnedUrl.indexOf('/') === -1) {
    return returnedUrl;
  }
  return returnedUrl.split('/')[0];
};
