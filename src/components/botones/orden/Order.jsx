import { useReducer } from 'react';
import { shoppingInitialState, shoppingReducer } from '../../../reducers/shoppingReducer';
import './Order.scss';

export default function Order({ open }) {
  return (
    <button
      className='btn__order'
      onClick={() => {
        open(true);
      }}
    >
      <p className='title__order'>{'Ver orden'.toUpperCase()}</p>
      <img className='img__order' src='/assets/order-icon.svg' alt='iconAdd' />
    </button>
  );
}
