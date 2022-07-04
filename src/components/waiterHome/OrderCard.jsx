import './OrderCard.scss';

export default function OrderCard({ isData }) {
  const { id, employe, date, client, table, order, total, state } = isData;

  return (
    <section className='container__card'>
      <article className='card'>
        <div className='card__status--figure'>
          <div className={`figure__circle` + (state === 'preparando' ? ' orange' : ' green')}>
            <img
              src={
                state === 'preparando' ? '/assets/timer-icon.svg' : '/assets/check-icon-white.svg'
              }
              alt='icono'
            />
          </div>
          <div className={`figure__rectangle` + (state === 'preparando' ? ' orange' : ' green')}>
            <p className='figure__rectangle--text'>{state.toUpperCase()}</p>
          </div>
        </div>

        <section className='card__info'>
          <h4 className='card__info--date'>{date}</h4>
          <p className='card__info--employe'>
            <span className='span'>{'mesero '.toUpperCase()}</span>
            {employe.toUpperCase()}
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
          <button className='button__status'>{'Pagar pedido'.toUpperCase()}</button>
        </section>
      </article>
    </section>
  );
}
