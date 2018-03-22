import store, * as storeActions from './store';
import async, * as asyncActions from './async';

import AuthForm from './authForm';

export const actions = { ...storeActions, ...asyncActions };
export const auth = { store, async };

export default AuthForm;
