import ACTIONS from '../actions/actionTypes';
const initialState={
	isFetching:false,
	transactions:[],
	total:{},
	error:null
};
export default function (state= initialState,action) {
	switch (action.type) {
		case ACTIONS.GET_TOTAL_TRANSACTION_REQUEST:
		case ACTIONS.GET_TRANSACTION_HISTORY_REQUEST:{
			return {
				...state,
				isFetching: true
			}
		}
		case ACTIONS.GET_TOTAL_TRANSACTION_SUCCESS:{
			return {
					...state,
					isFetching: false,
					total:action.total
			}
		}
		case ACTIONS.GET_TRANSACTION_HISTORY_SUCCESS:{
			return {
					...state,
					isFetching: false,
					transactions:action.transactions
			}
		}

		case ACTIONS.GET_TOTAL_TRANSACTION_ERROR:
		case ACTIONS.GET_TRANSACTION_HISTORY_ERROR:{
			return {
				...state,
				error: action.error
			}
		}
		default:{
			return state
		}
	}
}