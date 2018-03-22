import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SENT,
  AUTHENTICATING_START,
  AUTHENTICATING_STOP
} from './async';

const AUTH_FROM_STORAGE = 'AUTH_FROM_STORAGE';
export const authFromStorage = auth => ({
  type: AUTH_FROM_STORAGE,
  payload: auth
});

const initState = {
  token: '',
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  isAuth: false,
  authenticating: false
};

const localStore = JSON.parse(window.localStorage.getItem('auth'));
if (!!localStore && localStore.isAuth && !!localStore.token) {
  Object.keys(localStore).forEach(prop => (initState[prop] = localStore[prop]));
}

const authStore = (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case AUTH_FROM_STORAGE:
      return { ...state, ...payload };
    case AUTHENTICATING_START:
      return { ...state, authenticating: true };
    case AUTHENTICATING_STOP:
      return { ...state, authenticating: false };
    case REGISTER_SUCCESS:
      return { ...state, isAuth: true, ...payload.data };
    case REGISTER_ERROR:
      return { ...state, registrationLoginDrawerOpen: true };
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, ...payload.data };
    case LOGIN_ERROR:
      return { ...state, registrationLoginDrawerOpen: true };
    case LOGOUT_SENT:
      return {
        token: '',
        email: '',
        isAuth: false,
        authenticating: false,
        registrationLoginDrawerOpen: false,
        registrationLoginType: null
      };
    default:
      return state;
  }
};

export default authStore;
