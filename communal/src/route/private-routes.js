import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import NavbarNPageTitle from '../components/navbar-page-title';

export const PrivateRoutes = ({
    isAuth,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuth ? (
            <div>
                <NavbarNPageTitle />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuth: !!state.auth.uid
});

// const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, null)(PrivateRoutes);
