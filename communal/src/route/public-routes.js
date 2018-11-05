import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import NavbarNPageTitle from '../components/navbar-page-title';

export const PublicRoutes = ({
    isAuth,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuth ? (
            <Redirect to="/dashboard" />
        ) : (
            <div>
                <NavbarNPageTitle />
                <Component {...props} />
            </div>
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuth: !!state.auth.uid
});

// const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, null)(PublicRoutes);
