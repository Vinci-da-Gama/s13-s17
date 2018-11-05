import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { Numbs } from '../../consts/magic-numbers';

class RandomPickupDecision extends Component {
    render() {
        return (
            <Button outline block color="secondary" className="rounded-0"
                disabled={this.props.optLen <= Numbs.ZERO
                    ? true : false} onClick={this.props.rPickupDecision} >
                {this.props.btnName}
            </Button>
        );
    }
};

RandomPickupDecision.defaultProps = {
    btnName: 'What should I do?'
};

export default RandomPickupDecision;
