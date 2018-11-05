import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './Expense_Form';
import { startAddExpense } from '../../actions/expenses';

export class AddExpense extends Component {
	onSubmit(expense) {
		this.props.startAddExpense(expense);
		this.props.history.push('/dashboard');
	}

	render() {
		return (
			<div>
				<h2>Add Expense</h2>
				<hr />
				<ExpenseForm
					onSubmit={(expen = {}) => {
						this.onSubmit(expen);
					}}
					currentUrl={this.props.match.url}
				/>
			</div>
		);
	}
}

/* const mapStateToProps = (state) => ({
}); */

const mapDispatchToProps = (dispatch) => ({
	startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(
	null,
	mapDispatchToProps
)(AddExpense);
