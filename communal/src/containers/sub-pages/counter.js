import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle } from 'reactstrap';

import { Numbs } from '../../consts/magic-numbers';

class CounterCompo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    handleCounterOperation(optSign) {
        switch (optSign) {
            case '+':
                this.setState((preState) => {
                    return {
                        counter: preState.counter + Numbs.ONE
                    };
                });
                break;
            case '-':
                this.setState((preState) => {
                    if (preState.counter === Numbs.ZERO) {
                        return null;
                    } else {
                        return {
                            counter: preState.counter - Numbs.ONE
                        };
                    }
                });
                break;
            default:
                break;
        }
    };

    resetCounter() {
        this.setState(() => {
            return {
                counter: Numbs.ZERO
            };
        });
    };

    render() {
        return (
            <div className="row mx-3">
                <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                    <Card>
                        <CardHeader>
                            Counter (plus or minus)
                        </CardHeader>
                        <CardBody>
                        <CardTitle>
                            Current Counter: {this.state.counter}
                        </CardTitle>
                        {/* <CardText></CardText> */}
                        <Button outline color="info"
                            onClick={() => this.handleCounterOperation('+') }>
                            +1
                        </Button>
                        <Button outline color="info"
                            onClick={() => this.handleCounterOperation('-') }>
                            -1
                        </Button>
                        <Button color="warning" size="lg" block
                            className="rounded-0 mt-2" onClick={() => this.resetCounter()}>
                            Reset
                        </Button>
                        </CardBody>
                        <CardFooter>Counter Footer</CardFooter>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CounterCompo;
