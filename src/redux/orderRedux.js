import Axios from 'axios';

/* selectors */
export const getAll = ({orders}) => orders;

/* action name creator */
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_ORDER = createActionName('ADD_ORDER');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addOrder = payload => ({ payload, type: ADD_ORDER });

/* thunk creators */

export const fetchAddOrder = (order) => {
    console.log(order);
    return async dispatch  => {
      dispatch(fetchStarted());
      try {
  
        let res = await Axios.post('http://localhost:8000/api/order', order);
        dispatch(addOrder(res.order));
      }
      catch(err) {
        dispatch(fetchError(err.message || true));
      }
    };
  };

/* reducer */
export const reducer = (statePart = [], action = {}) => {
    switch (action.type) {
      case FETCH_START: {
        return {
          ...statePart,
          loading: {
            active: true,
            error: false,
          },
        };
      }
      case FETCH_SUCCESS: {
        return {
          ...statePart,
          loading: {
            active: false,
            error: false,
          },
          data: action.payload,
        };
      }
      case FETCH_ERROR: {
        return {
          ...statePart,
          loading: {
            active: false,
            error: action.payload,
          },
        };
      }
      default:
      return statePart;
  }
};