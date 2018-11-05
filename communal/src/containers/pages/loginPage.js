import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { startLogin } from '../../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div>
        <Button color="info" className="rounded-0"
            onClick={ startLogin }>
            Login Page
        </Button>
    </div>
);

/* const mapStateToProps = (state) => ({
}) */

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage);
