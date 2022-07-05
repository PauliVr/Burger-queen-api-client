import { useState } from 'react';
import { useEffect } from 'react';
import '../waiterHome/OrderResume.scss';

export default function OrderResume({ isChangeState, isData, isCard, isCash }) {
  const { client, date, employe, id, order, state, table, total } = isData;
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(order);
    console.log(data);
  }, [data]);

  return (
    <section className='resume'>
      <div className='resume__close'>
        <button type='button' className='button__close' onClick={() => isChangeState(false)}>
          <img className='btn__img' src='/assets/close-icon.svg' alt='IconClose' />
        </button>
        <h1 className='resume__title'>{'pagar pedido'.toUpperCase()}</h1>
      </div>

      <article className='resume__info'>
        <h4 className='resume__field resume__field--date'>
          {'fecha: '.toUpperCase()} <span>{date}</span>
        </h4>
        <h4 className='resume__field resume__field--employe'>
          {'mesero: '.toUpperCase()} <span>{employe.toUpperCase()}</span>
        </h4>
        <h4 className='resume__field resume__field--employe'>
          {'cliente: '.toUpperCase()} <span>{client.toUpperCase()}</span>
        </h4>
        <h4 className='resume__field resume__field--table'>
          {'mesa: '.toUpperCase()} <span>{table}</span>
        </h4>
      </article>

      <section className='resume__content'>
        <h3 className='resume__subtitle'>{'resumen del pedido'.toUpperCase()}</h3>

        {data &&
          data.map((product) => {
            return (
              <div className='resume__item-list' key={Math.random().toString(36).slice(2)}>
                <div className='resume__item'>
                  <img className='resume__img' src={product.img} alt='platillo' />
                  <p className='resume__items--plate'>
                    {product.quantity +
                      ' ' +
                      product.name.toUpperCase() +
                      ' ' +
                      '$' +
                      product.price * product.quantity}
                  </p>
                </div>
              </div>
            );
          })}

        <div className='resume__total'>
          <p>
            TOTAL <span>${total.toFixed(2)}</span>
          </p>
        </div>
      </section>

      <div className='payment'>
        <h3 className='payment__title'>SELECCIONA EL MÉTODO DE PAGO</h3>

        <div className='payment__methods'>
          {/* <button className='payment__button payment__button--card' onClick={() => isCard(true)}>
            PAGO CON TARJETA
          </button> */}
          <button className='payment__button payment__button--cash' onClick={() => isCash(true)}>
            PAGO EN EFECTIVO
          </button>
        </div>
      </div>
    </section>
  );
}
