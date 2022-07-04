import { useState } from 'react';
import { useEffect } from 'react';
import { helpHttp } from '../../api/helpHttp';
import './Cart.scss';

let acumulador = 0;
export default function Cart({ open, isClear, isCart, isDelFromCart, employe, date, orderData }) {
  const { clientName, tables } = orderData;

  const [database, setDatabase] = useState(null); //db
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  let api = helpHttp();
  let url = 'http://localhost:5000/orders';

  useEffect(() => {
    setTotal(0);
    console.log(total);
    let totalPrice = 0;
    isCart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    setTotal(totalPrice.toFixed(2));
    console.log(total);

    setData({
      id: Date.now().toString(),
      employe: employe,
      date: date,
      client: clientName,
      table: tables,
      order: isCart,
      total: totalPrice,
      state: 'preparando',
    });

    console.log(isCart);
  }, [url, isCart]);

  const createData = (db) => {
    let options = { body: db, headers: { 'content-type': 'application/json' } };

    api.post(url, options).then((res) => {
      if (!res.err) {
        setDatabase([...database, res]);
      } else {
        setError(res);
      }
    });
  };

  // const totalMount = (cart) => {
  //   console.log(cart);
  //   const price = cart.forEach((item) => (totalPrice = item.price * item.quantity));
  //   console.log(price);
  //   totalPrice = Number(cart.price) + Number(cart.quantity);
  //   acumulador = acumulador + totalPrice;
  //   console.log(acumulador);
  //   // setTotal(...total, acumulador);
  // };
  // totalMount(isCart);
  // // console.log(total);

  return (
    <section className='container__order'>
      <div className='close'>
        <button
          type='button'
          className='button__close'
          onClick={() => {
            open(false);
          }}
        >
          <img className='btn__img' src='/assets/close-icon.svg' alt='IconClose' />
        </button>
        <h1 className='close__title'>{'pedido'.toUpperCase()}</h1>
      </div>

      <div className='order'>
        <article className='order__info'>
          <h4>{'empleado: '.toUpperCase() + employe}</h4>
          <h4>{'fecha: '.toUpperCase() + date}</h4>
          <h4>{'mesa: '.toUpperCase() + tables}</h4>
          <h4>{'cliente: '.toUpperCase() + clientName}</h4>
        </article>
        <div className='order__dishes'>
          <table className='order__table'>
            <thead className='order_thead'>
              <tr className='order__columns'>
                <th className='order__tlabels'>{'platillo'.toUpperCase()}</th>
                <th className='order__tlabels'>{'cantidad'.toUpperCase()}</th>
                <th className='order__tlabels'>{'eliminar'.toUpperCase()}</th>
                <th className='order__tlabels'>{'precio'.toUpperCase()}</th>
              </tr>
            </thead>
            {isCart.map((item) => (
              <tbody key={Math.random().toString(36).slice(2)} className='order__tbody'>
                <tr className='order__trow'>
                  <td className='order__tdata'>
                    <div className='tdata__dish'>
                      <img src={item.img} alt={item.name} />
                      <p>{item.name.toUpperCase()}</p>
                    </div>
                  </td>
                  <td className='order__tdata'>
                    <p className='tdata__quantity'>{item.quantity}</p>
                  </td>
                  <td className='order__tdata'>
                    <button className='tdata__btn--clear' onClick={() => isDelFromCart(item.id)}>
                      <img src='/assets/trash-icon.svg' alt='botón eliminar' />
                      <p>{'eliminar'.toUpperCase()}</p>
                    </button>
                  </td>
                  <td className='order__tdata'>
                    {' '}
                    <p className='tdata__price'>${item.price * item.quantity}</p>{' '}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className='total'>
        <h2 className='total__title'>{'total'.toUpperCase()}</h2>
        <h2 className='total__price'>{total}</h2>
      </div>
      <div className='prepare'>
        <button
          className='prepare__btn--prepare'
          onClick={() => {
            isClear('clear');
          }}
        >
          {'Limpiar pedido'.toUpperCase()}
        </button>

        <button
          className='prepare__btn--clear'
          onClick={() => {
            console.log(data);
            createData(data);
          }}
        >
          {'preparar pedido'.toUpperCase()}
        </button>
      </div>
    </section>
  );
}
