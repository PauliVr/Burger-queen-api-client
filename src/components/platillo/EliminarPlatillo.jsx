
import './EliminarPlatillo.scss';
export default function EliminarPlatillo(props){
  return(
    <section className="container__form">
      <button
        type='button'
        className='btn__close'
        onClick={() => {
          props.delete(false);
        }}
      >
        <img className='btn__img' src='/assets/close-icon.svg' alt='IconClose' />
      </button>

      <div className="form">
        <h1 className="form__title">{'registrar platillo'.toUpperCase()}</h1>
        <form action="" className="form__form">
          <div className="group">
            <label htmlFor="nombre" className='group__label'>{'nombre'.toUpperCase()}</label>
            <input type="text" className="group__input" placeholder="Hamburguesa con queso" />
          </div>

           <div className='group'>
            <label htmlFor='type' className='group__label'>
              {'menú'.toUpperCase()}
            </label>
            <div className='group__group--radio'>
              <div className='group--radio'>
                <input
                  type='radio'
                  id='desayuno'
                  name='desayuno'
                  value='desayuno'
                />
                <label className='radio__label' htmlFor='desayuno'>
                  {'desayuno'.toUpperCase()}
                </label>
              </div>
              <div className='group--radio'>
                <input
                  type='radio'
                  id='comida'
                  name='comida'
                  value='comida'
                />
                <label className='radio__label' htmlFor='comida'>
                  {'comida'.toUpperCase()}
                </label>
              </div>
            </div>
          </div>

        <div className="group">
            <label htmlFor="descripcion">{'descripción'.toUpperCase()}</label>
            <input type="text" className="group__input" placeholder="Hamburguesa de carne con queso y..." />
          </div>

          <div className="group">
            <label htmlFor="precio">{'precio'.toUpperCase()}</label>
            <input type="number" className="group__input" placeholder="69.90" />
          </div>

          <div className="group">
            <label htmlFor="img">{'imagen'.toUpperCase()}</label>
            <input type="image" className="group__input" alt="" width="48" height="48" />
          </div>

        <button className='btn--register'>{'registrar platillo'.toUpperCase()}</button>

        </form>
      </div>

    </section>
  );

}