import { startAfter } from 'firebase/firestore';
import { TYPES } from '../actions/shoppingActions';

export let shoppingInitialState = {
  products: [],
  cart: [],
};

export function initialState(initialDatabase) {
  shoppingInitialState.products = initialDatabase;
  console.log(shoppingInitialState.products);
}

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find((product) => product.id === action.payload);
      console.log(newItem);

      let itemInCart = state.cart.find((item) => item.id === newItem.id);
      console.log(itemInCart);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
    }

    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      console.log(itemToDelete);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
            ),
          }
        : { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
    }

    case TYPES.CLEAR_CART:
      return shoppingInitialState;

    // case TYPES.FILTER_PRODUCTS: {
    //   if (action.payload) {
    //     return {
    //       products: action.payload,
    //       cart: [...state.cart],
    //     };
    //   }
    // }

    default:
      return state;
  }
}
