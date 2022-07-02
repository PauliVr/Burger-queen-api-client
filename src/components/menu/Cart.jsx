import './Cart.scss';
export default function Cart({ open, isClear, isCart, isDelFromCart }) {
  console.log(isCart);
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
          <h4>{'empleado:'.toUpperCase()}</h4>
          <h4>{'fecha'.toUpperCase()}</h4>
          <h4>{'mesa: '.toUpperCase()}</h4>
          <h4>{'cliente: '.toUpperCase()}</h4>
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
        <h2 className='total__price'>$498.90</h2>
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
            console.log('preparando...');
          }}
        >
          {'preparar pedido'.toUpperCase()}
        </button>
      </div>
    </section>
  );
}
