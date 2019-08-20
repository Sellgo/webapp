export default (lengthLimit, errorMessage = `Must ${lengthLimit} characters or more`) => (value) => {
  if (!value) return null;

  // length check
  if (value.length < lengthLimit) return errorMessage;

  return null;
};
