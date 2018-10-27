import uuid from 'uuid';

import { ADD_EXPENSE, REMOVE_EXPENSE,
    EDIT_EXPENSE, SET_EXPENSES } from '../types';
import fDb from '../firebase/firebase';
import fbPathes from '../consts/firebase-pathes';
import { Numbs } from '../consts/magic-numbers';

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: ADD_EXPENSE,
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = Numbs.ZERO,
            createdAt = Numbs.ZERO
        } = expenseData;
        const expense = { description, note, amount, createdAt };
        return fDb.ref(fbPathes.expenses).push(expense)
        .then((resp) => {
            dispatch(addExpense({
                id: resp.key,
                ...expense
            }));
        })
        .catch((err) => {
            console.log('31 -- err: ', err);
        });
    };
};

export const setExpenses = (exps) => ({
    type: SET_EXPENSES,
    exps
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return fDb.ref(fbPathes.expenses).once('value')
        .then((resp) => {
            const expenses = [];
            resp.forEach((elem, idx) => {
                expenses.push({
                    id: elem.key,
                    ...elem.val()
                });
            });
            dispatch(setExpenses(expenses));
        })
        .catch((err) => {
            console.log('55 -- err: ', err);
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: REMOVE_EXPENSE,
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return fDb.ref(`${fbPathes.expenses}/${id}`).remove()
        .then((resp) => {
            // remove api will return undefined: resp = undefined
            dispatch(removeExpense({ id }));
        })
        .catch((err) => {
            console.log('74 -- ', err);
        });
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: EDIT_EXPENSE,
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return fDb.ref(`${fbPathes.expenses}/${id}`).update(updates)
        .then(() => {
            dispatch(editExpense(id, updates));
        }).catch((err) => {
            console.log('92 -- ', err);
        });
    };
};
