import 'react-dates/initialize';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import storeWithMiddleware from './store/store-config';
import RootApp from './components/index';
import registerServiceWorker from './registerServiceWorker';

import '../style/index.scss';

export const rootTmpl = (
	<Provider store={storeWithMiddleware}>
		<Router>
			<RootApp />
		</Router>
	</Provider>
);
const Utensil = document.querySelector('.root-dom-container');

render(rootTmpl, Utensil);
registerServiceWorker();
