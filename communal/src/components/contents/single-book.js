import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import UlCompo from './ul';
import ResourceCompo from './resource';
import { Numbs } from '../../consts/magic-numbers';

export default ({ books, match }) => {
    const targetBook = books.find(({ id }) => id === match.params.bookId);
    if (books.length === Numbs.ZERO || !targetBook) {
        return (
            <div>
                loading books...
            </div>
        );
    }
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">
                    { targetBook.name }
                </h4>
                <p className="card-text">
                    { targetBook.description }
                </p>
                <UlCompo collection={ targetBook.resources } match={ match } />
                <hr />
                <Route path={`${match.path}/:resourceId`}
                    render={(props) => <ResourceCompo {...props} book={ targetBook } />} />
            </div>
        </div>
    );
};
