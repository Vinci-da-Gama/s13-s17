import { Numbs } from '../../consts/magic-numbers';

export default expenses => {
	return expenses
		.map(expense => expense.amount)
		.reduce((sum, value) => sum + value, Numbs.ZERO);
};
