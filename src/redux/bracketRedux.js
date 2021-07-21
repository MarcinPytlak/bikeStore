import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
export const getBracket = ({ bracket }) => bracket;

/* action name creator */
const reducerName = 'bracket';
const createActionName = name => `app/${reducerName}/${name}`;


/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_BRACKET = createActionName('ADD_TO_BRACKET');
const REMOVE_FROM_BRACKET = createActionName('REMOVE_FROM_BRACKET');
const UPDATE_BRACKET = createActionName('UPDATE_BRACKET');
const CHANGE_BRACKET = createActionName('CHANGE_BRACKET');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToBracket = payload => ({ payload, type: ADD_TO_BRACKET});
export const removeFromBracket = payload => ({ payload, type: REMOVE_FROM_BRACKET});
export const updateBracket = payload => ({ payload, type: UPDATE_BRACKET});
export const changeBracket = payload => ({ payload, type: CHANGE_BRACKET});

const countSumAdd = (bracketsum, productprice, productpieces) => {

  return bracketsum +=  parseInt(productprice) * productpieces;
}
const countSumRemove = (bracketsum, productprice, productpieces) => {
  return bracketsum -=  parseInt(productprice) * productpieces;
}

const addToCard = (statePart, action) => {
  let obj = {id: action.payload.id}
  
  if(statePart.bracketProducts.filter(e=> (e.id === obj.id)).length === 0){
    const bracketProducts = [
      ...statePart.bracketProducts, action.payload
    ]
    const total = countSumAdd(statePart.total, action.payload.price, action.payload.pieces)
    return {...statePart, bracketProducts, total};
  } else {
    alertify.alert('Error', 'You cannot add the same product twice', function(){alertify.error('error')});
    return {...statePart}
  }
}

const removeFromCard = (statePart, action) => {
  const bracketProducts = [
    ...statePart.bracketProducts.filter(item => item !== action.payload)
  ]
  const total = countSumRemove(statePart.total, action.payload.price, action.payload.pieces)
  return {...statePart, bracketProducts, total};
}

const changeCard = (statePart, action) => {
  let total = 0;
  let value  = statePart.bracketProducts.filter(product => product.id === action.payload[1] ? countSum(product.pieces, action.payload[0]) : null);
  console.log(value);
  function countSum (values, number){
  if(values < number){
    total = statePart.total = statePart.total + parseInt(action.payload[2]);
  } else {
     total = statePart.total = statePart.total - parseInt(action.payload[2]);
    }
}
console.log(total);
 const bracketProducts = [
    ...statePart.bracketProducts.filter(product => product.id === action.payload[1] ? product.pieces = action.payload[0] : product)
 ] 
  return {...statePart, bracketProducts, total}
}

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
      case ADD_TO_BRACKET:
        return addToCard(statePart, action);
      case REMOVE_FROM_BRACKET:
        return removeFromCard(statePart, action);
      case UPDATE_BRACKET:
        statePart.bracketProducts.map(product => product.id === action.payload[1] ? product.remarks = action.payload[0] : product);
        return {...statePart};
      case CHANGE_BRACKET:
        return changeCard(statePart, action);
        //statePart.bracketProducts.map(product => product.id === action.payload[1] ? product.pieces = action.payload[0] : product);
      default:
        return statePart;
    }
  };