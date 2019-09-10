export default (errorMessage = 'Required') => value => (value ? undefined : errorMessage);
