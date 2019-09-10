import clone from 'lodash/fp/clone';
import setWith from 'lodash/fp/setWith';
import curry from 'lodash/fp/curry';

export const setIn = curry(
  <T extends object>(obj: T, path: string, value: any): T => setWith(clone, path, value, clone(obj))
);
