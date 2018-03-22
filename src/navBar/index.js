import store, * as storeActions from './store';
import async, * as asyncActions from './async';

import NavBar from './container';

export const actions = { ...storeActions, ...asyncActions };
export const nav = { store, async };

export default NavBar;
