import { FETCH_CITY } from '../actions';

export default function(state={value:[1,2,3,4,5]}, action) {
    switch(action.type) {
        case FETCH_CITY: {
           const setValue = {value:[action.payload.data.id]}     
           console.log(_.omit(state,setValue));
           return { ...state, [action.payload.data.id]:action.payload.data };
        }

        default:
            return state;

    }
}