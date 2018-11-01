import 'react-dates/initialize';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';

import storeWithMiddleware from './store/store-config';
import RootApp, { History } from './components/index';
import registerServiceWorker from './registerServiceWorker';
import { firebase } from './firebase/firebase';
import { startSetExpenses } from './actions/expenses';
import { Login, Logout } from './actions/auth';
import Spinner from './components/spinner';

import '../style/index.scss';

export const rootTmpl = (
	<Provider store={storeWithMiddleware}>
        <RootApp />
		{/* <Router>
		</Router> */}
	</Provider>
);
const Utensil = document.querySelector('.root-dom-container');

// render(rootTmpl, Utensil);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        render(rootTmpl, Utensil);
        hasRendered = true;
    }
};

render(<Spinner />, Utensil);

firebase.auth().onAuthStateChanged((userStatus) => {
    if (userStatus) {
        storeWithMiddleware.dispatch(Login(userStatus.uid));
        storeWithMiddleware.dispatch(startSetExpenses())
        .then(() => {
            renderApp();
            // if login, alway go dashboard page until logout.
            console.log('45 -- login: ', userStatus.uid);
            if (History.location.pathname === '/') {
                History.push('/dashboard');
            }
        });
    } else {
        storeWithMiddleware.dispatch(Logout());
        renderApp();
        // if not login, always go index page.
        console.log('54 -- logout: ');
        History.push('/');
    }
});

registerServiceWorker();
