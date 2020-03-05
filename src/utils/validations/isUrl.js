export const webUrl = value => {
  // eslint-disable-next-line max-len
  const regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
  return value && !regex.test(value) ? 'Invalid URL' : undefined;
};
