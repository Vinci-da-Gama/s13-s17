import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoutes from './private-routes';
import PublicRoutes from './public-routes';
import LoginPage from '../containers/pages/loginPage';
import HomeDashboardCompo from '../containers/pages/expeDashboard';
import AddExpense from '../components/livingExpense/AddExpense';
import expeEdit from '../components/livingExpense/editExpense';
import expeHelp from '../components/livingExpense/help';
import InebriantCompo from '../containers/pages/inebriant';
import HealthProductsCompo from '../containers/pages/health-products';
import CosmeticHlDelegateCompo from '../containers/pages/cosmetic_highLevelCompoDelegate';
import NestedDecisionCounter from '../containers/pages/nestedDecisionCounter';
import NestedBooksByParamsCompo from '../containers/pages/nestedByParams';
import NoFoundCompo from '../components/NoFound';

const RootRoute = () => (
    <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoutes path="/dashboard" component={HomeDashboardCompo} exact={true} />
        <PrivateRoutes path="/create" component={AddExpense} />
        <PrivateRoutes path="/edit/:id" component={expeEdit} />
        <PublicRoutes path="/help" component={expeHelp} />
        <PublicRoutes path="/inebriant" component={InebriantCompo} />
        <PublicRoutes path="/health" component={HealthProductsCompo} />
        <PublicRoutes path="/cosmetic_hlDegate" component={CosmeticHlDelegateCompo} />
        <PublicRoutes
            path="/nestedInDecisionNCounter"
            component={NestedDecisionCounter}
        />
        <PublicRoutes
            path="/nestedBooksByParams"
            component={NestedBooksByParamsCompo}
        />
        <Route component={NoFoundCompo} />
    </Switch>
);

export default RootRoute;
