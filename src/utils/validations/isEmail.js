import normalizeEmail from './normalizeEmail';

export default (errorMessage = 'Invalid email address') => value => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(normalizeEmail(value)) ? undefined : errorMessage);
