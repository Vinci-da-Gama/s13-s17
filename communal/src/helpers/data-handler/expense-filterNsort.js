import moment from 'moment';

import { Numbs, NagNumbs } from '../../consts/magic-numbers';

// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter(expense => {
			const createdAtMoment = moment(expense.createdAt);
			const startDateMatch = startDate
                ? startDate.isSameOrBefore(createdAtMoment, 'day')
                : true;
			const endDateMatch = endDate
				? endDate.isSameOrAfter(createdAtMoment, 'day')
				: true;
			const textMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase());

			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? Numbs.ONE : NagNumbs.NAG_ONE;
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? Numbs.ONE : NagNumbs.NAG_ONE;
			} else {
				return null;
			}
		});
};
