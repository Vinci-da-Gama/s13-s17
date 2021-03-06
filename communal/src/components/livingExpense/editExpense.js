import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardHeader, CardFooter, CardBody, Row, Col } from 'reactstrap';

import ExpenseForm from './Expense_Form';
import { startEditExpense, startRemoveExpense } from '../../actions/expenses';

export class EditExpenseCompo extends Component {
    onSubmit(expense) {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/dashboard');
    }

    onRemove() {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <Row>
                <Card body inverse>
                    <CardHeader tag="h2" className="text-secondary">
                        Edit_Expense
                    </CardHeader>
                    <CardBody>
                        <ExpenseForm expense={this.props.expense}
                            onSubmit={(expense) => { this.onSubmit(expense); }}
                            currentUrl={this.props.match.url} />
                        <Col xs="12" sm="6" md="4"
                            className="offset-0 offset-sm-3 offset-md-4 my-3">
                            <Button color="danger" outline block
                                className="rounded-0" onClick={() => { this.onRemove(); }}>
                                Remove_Expense
                            </Button>
                        </Col>
                    </CardBody>
                    <CardFooter className="text-muted">Footer</CardFooter>
                </Card>
            </Row>
        );
    }
};

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((currExpense) => currExpense.id === props.match.params.id),
    isAuthen: !!state.auth.uid
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (targetIdObj) => dispatch(startRemoveExpense(targetIdObj))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseCompo);
