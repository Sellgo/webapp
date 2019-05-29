import {
  FETCH_AUTH_BEGIN,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  INPUT_PASSWORD,
  INPUT_EMAIL,
} from './constants';

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
      // return fetch('/auth')
      // .then(handleErrors)
      // .then(res => res.json())
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

export const handleInputEmail = inputEmail => ({
  type: INPUT_EMAIL,
  inputEmail,
});

export const handleInputPassword = inputPassword => ({
  type: INPUT_PASSWORD,
  inputPassword,
});
