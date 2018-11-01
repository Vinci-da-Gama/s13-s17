import { LOG_IN, LOG_OUT } from '../types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                uid: action.uid
            };
        case LOG_OUT:
            return {};
        default:
            return state;
    }
};
