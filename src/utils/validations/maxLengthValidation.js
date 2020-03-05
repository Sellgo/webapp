export default (lengthLimit, errorMessage = `Must ${lengthLimit} characters or less`) => value => {
  if (!value) return null;

  // length check
  if (value.length > lengthLimit) return errorMessage;

  return undefined;
};
