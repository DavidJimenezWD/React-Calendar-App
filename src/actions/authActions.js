import { fetchConToken, fetchSinToken } from '../helpers/fecth';
import { types } from '../types/types';
import { eventLogout } from './eventsActions';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const data = await fetchSinToken('auth', { email, password }, 'POST');
    const resp = await data.json();

    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: resp.uid,
          name: resp.name,
        })
      );
    } else {
      alert(resp.msg);
    }
  };
};

// Lo registro y lo autentico

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const data = await fetchSinToken(
      'auth/new',
      { email, password, name },
      'POST'
    );
    const resp = await data.json();

    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(login({ email, password, name }));
    } else {
      alert(resp.msg);
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const data = await fetchConToken('auth/renew');
    const resp = await data.json();

    if (resp.ok) {
      localStorage.setItem('token', resp.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: resp.uid,
          name: resp.name,
        })
      );
    } else {
      dispatch(finishChecking());
    }
  };
};

const finishChecking = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.authLogout,
});
