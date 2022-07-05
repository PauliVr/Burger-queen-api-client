import { useState } from 'react';
import './CardPayment.scss';

export default function CardPayment({ isCard, isData }) {
  const { client, date, employe, id, order, state, table, total } = isData;
  // const [label, setLabel] = useState(true);

  let array = [];
  const [cardNumber, setCardNumber] = useState({});
  const [maskCard, setMakCard] = useState('');
  const onChange = (event) => {
    event.persist();
    const { name } = event.target;
    const val = event.target.value;

    if (name && val) {
      setCardNumber({
        [name]: val,
      });
    }
  };

  // const maskify = (cardNumber) => {
  //   console.log(cardNumber);
  //   for (let i = cardNumber.length; i > 0; i--) {
  //     if (i <= cardNumber.length - 4) {
  //       array.push('*');
  //     } else {
  //       array.push(cardNumber[i]);
  //     }
  //   }
  //   console.log(array);
  //   setMakCard(array);
  //   console.log(array);
  // };

  return (
    <section className='cardPayment'>
      <div className='cardPayment__header'>
        <button
          type='button'
          className='button__close'
          onClick={() => {
            isCard(false);
          }}
        >
          <img className='btn__img' src='/assets/close-icon.svg' alt='IconClose' />
        </button>
        <h1 className='cardPayment__title'>PAGO CON TARJETA</h1>
      </div>

      <div className='cardPayment__image'>
        <img src='/assets/animated/card-payment.svg' alt='' />
      </div>

      <div className='cardPayment__card'>
        <form className='cardPayment__form' onSubmit={(e) => e.preventDefault()}>
          <div className='cardPayment__group'>
            <label htmlFor='name' className='cardPayment__label'>
              NOMBRE DEL PROPIETARIO
            </label>
            <input type='text' className='group__input' name='name' value={client} />
          </div>
          <div className='cardPayment__group'>
            <label htmlFor='cardNumber' className='cardPayment__label'>
              NÚMERO DE TARJETA
            </label>
            <input
              type='text'
              className='group__input'
              name='cardNumber'
              onKeyDown={onChange}
              defaultValue={maskCard}
            />
          </div>
          <div className='cardPayment__group'>
            {/* <button onClick={() => setLabel(!label)} >PAGO CON TARJETA</button> */}
          </div>
        </form>
      </div>

      {/* <p className={`cardPayment__successPayment cardPayment__successPayment${label ? '--hidden' : '--show' }`}>PAGO ACEPTADO</p> */}

      <div className='cardPayment__button'>
        <button>PAGAR</button>
      </div>
    </section>
  );
}
