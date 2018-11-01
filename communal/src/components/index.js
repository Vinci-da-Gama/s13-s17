import React from 'react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import RootRoute from '../route/routes';
/* import PageTitleCompo from './page-title';
import AppNavBarCompo from './navbar'; */
import FooterCompo from './footer';

export const History = createHistory();

const RootApp = () => (
    <div>
        <Router history={History}>
            <div className="container-fluid">
                {/* <AppNavBarCompo /> */}
                {/* <PageTitleCompo pathName={window.location.pathname.replace(/\//g, '')} /> */}
                <RootRoute />
            </div>
        </Router>
        <FooterCompo />
    </div>
);

export default RootApp;
