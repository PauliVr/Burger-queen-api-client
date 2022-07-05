import { useState } from 'react';
import { useEffect } from 'react';
import './CashPayment.scss';
let change;
export default function CardPayment({ isCash, isData, isUpdateData }) {
  const { id, employe, date, client, table, order, total, state } = isData;
  console.log(isData);
  const [received, setRecieved] = useState({});
  const [moneyChange, setMoneyChange] = useState(0);
  useEffect(() => {}, []);

  const onChangeData = (event) => {
    event.persist();
    const { name } = event.target;
    const val = event.target.value;

    if (name && val) {
      setRecieved({
        [name]: val,
      });
      console.log(received);
    } else {
      console.log('Ingresa la cantidad recibida');
    }
  };

  const totalChange = (total, receivedMount) => {
    console.log(receivedMount);
    console.log(total);
    change = receivedMount - total;
    setMoneyChange(change.toFixed(2));
  };

  function updateOrderState(newState) {
    // state = newState;
    const editedData = {
      id,
      employe,
      date,
      client,
      table,
      order,
      total,
      state: newState,
    };
    isUpdateData(editedData);
    console.log(isUpdateData);
  }

  return (
    <section className='cashPayment'>
      <div className='cashPayment__header'>
        <button
          type='button'
          className='button__close'
          onClick={() => {
            isCash(false);
          }}
        >
          <img className='btn__img' src='/assets/close-icon.svg' alt='IconClose' />
        </button>
        <h1 className='cashPayment__title'>PAGO EN EFECTIVO</h1>
      </div>
      <div className='cashPayment__image'>
        <img src='/assets/animated/cash-payment.svg' alt='' />
      </div>
      <div className='cashPayment__info'>
        <form className='cashPayment__form' onSubmit={(e) => e.preventDefault()}>
          <div className='cashPayment__group'>
            <label htmlFor='total' className='cashPayment__label'>
              TOTAL DEL PEDIDO
            </label>
            <input
              type='text'
              className='inputs__group--input'
              name='total'
              value={`$` + total.toFixed(2)}
            />
          </div>
          <div className='cashPayment__group'>
            <label htmlFor='received' className='cashPayment__label'>
              CANTIDAD RECIBIDA
            </label>
            <input
              type='text'
              className='inputs__group--input'
              name='received'
              onChange={onChangeData}
            />
          </div>
          <div className='cashPayment__group'>
            <button onClick={() => totalChange(total, received.received)}>CALCULAR</button>
          </div>
        </form>
      </div>
      <div className='cashPayment__change'>
        <label htmlFor='change'>CAMBIO</label>
        <input
          type='text'
          className='inputs__group--input'
          name='change'
          value={`$` + moneyChange}
        />
      </div>

      <div className='cashPayment__button'>
        <button onClick={() => updateOrderState('pagado')}>PAGAR</button>
      </div>
    </section>
  );
}
