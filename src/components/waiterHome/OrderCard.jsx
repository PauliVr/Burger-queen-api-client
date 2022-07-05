import './OrderCard.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import OrderResume from './OrderResume';

export default function OrderCard({
  isData,
  isRol,
  isEmploye,
  isChangeState,
  isUpdate,
  setData,
  isCard,
  isCash,
}) {
  const { id, employe, date, client, table, order, total, state } = isData;
  const [rol, setRol] = useState('');
  const [newData, setNewData] = useState(null);
  const [employeName, setEmployeName] = useState('');

  useEffect(() => {
    setNewData(isData);
    setRol(isRol);
    setEmployeName(isEmploye);
  }, [rol, employeName]);

  console.log(isData);

  function updateOrder(newState) {
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
    isUpdate(editedData);
    console.log(editedData);
  }

  function changeStateData(open, data, card, cash) {
    console.log(data);
    isChangeState(open);
    setData(data);
    isCard(card);
    isCash(cash);
  }

  return (
    <section className='container__card'>
      <article className='card'>
        <div className='card__status--figure'>
          <div
            className={
              `figure__circle ` +
              (state === 'preparando' && rol === 'mesero'
                ? 'orange'
                : state === 'listo' && rol === 'mesero'
                ? 'green'
                : state === 'preparando' && rol === 'cocinero'
                ? 'yellow'
                : 'deep-orange ')
            }
          >
            <img
              src={
                state === 'preparando' && rol === 'mesero'
                  ? '/assets/timer-icon.svg'
                  : state === 'listo' && rol === 'mesero'
                  ? '/assets/check-icon-white.svg'
                  : state === 'preparando' && rol === 'cocinero'
                  ? '/assets/timer-icon.svg'
                  : '/assets/paper-plane-icon-white.svg'
              }
              alt='icono'
            />
          </div>
          <div
            className={
              `figure__rectangle ` +
              (state === 'preparando' && rol === 'mesero'
                ? 'orange'
                : state === 'listo' && rol === 'mesero'
                ? 'green'
                : state === 'preparando' && rol === 'cocinero'
                ? 'yellow'
                : state === 'listo' && rol === 'cocinero'
                ? 'deep-orange '
                : '')
            }
          >
            <p className='figure__rectangle--text'>{state.toUpperCase()}</p>
          </div>
        </div>

        <section className='card__info'>
          <h4 className='card__info--date'>{date}</h4>
          <p className='card__info--employe'>
            <span className='span'>{rol.toUpperCase() + ' '}</span>
            {employeName.toUpperCase()}
          </p>
          <p className='card__info--client'>
            <span className='span'>{'cliente '.toUpperCase()}</span>
            {client.toUpperCase()}
          </p>
          <p className='card__info--table'>
            <span className='span'>{'mesa '.toUpperCase()}</span>
            {table}
          </p>
        </section>
        <section className='button'>
          {rol === 'mesero' ? (
            <button className='button__status' onClick={() => changeStateData(true, newData)}>
              {'Pagar pedido'.toUpperCase()}
            </button>
          ) : (
            <button className='button__status' onClick={() => updateOrder('listo')}>
              {'pedido listo'.toUpperCase()}
            </button>
          )}
        </section>
      </article>
    </section>
  );
}
