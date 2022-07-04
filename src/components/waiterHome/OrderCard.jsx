import './OrderCard.scss';
import { useState } from 'react';
import { useEffect } from 'react';

export default function OrderCard({ isData, isRol, isEmploye, isChangeState }) {
  const { id, employe, date, client, table, order, total, state } = isData;
  const [rol, setRol] = useState('');
  const [employeName, setEmployeName] = useState('');

  useEffect(() => {
    setRol(isRol);
    setEmployeName(isEmploye);
  }, [rol, employeName]);

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
                : state === ' listo' && rol === 'cocinero'
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
            <button className='button__status' onClick={() => isChangeState('pagando..')}>
              {'Pagar pedido'.toUpperCase()}
            </button>
          ) : (
            <button className='button__status'>{'pedido listo'.toUpperCase()}</button>
          )}
        </section>
      </article>
    </section>
  );
}
