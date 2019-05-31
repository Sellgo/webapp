import {
  FETCH_AUTH_BEGIN,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
} from './constants';
// below action and method only for sample
const fetchAuthBegin = () => ({
  type: FETCH_AUTH_BEGIN,
});

const fetchAuthSuccess = payload => ({
  type: FETCH_AUTH_SUCCESS,
  payload,
});

const fetchAuthFailure = error => ({
  type: FETCH_AUTH_FAILURE,
  error,
});

export const fetchAuth = authData => dispatch => {
  dispatch(fetchAuthBegin());
  return (
    fakeFetchAuth(authData)
      .then(json => {
        dispatch(fetchAuthSuccess(json.payload));
        localStorage.setItem('token', json.payload.token);
        return json.payload;
      })
      .catch(error => dispatch(fetchAuthFailure(error)))
  );
};

const fakeFetchAuth = ({ inputPassword, inputEmail }) =>
  new Promise((resolve, reject) => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(() => {
      if (inputEmail === '123' && inputPassword === 'qwe') {
        resolve({
          ok: true,
          payload: {
            id: '123',
            token: '456',
          },
        });
      } else {
        reject(new Error('Password or Email incorrect'));
      }
    }, 1000);
  });
