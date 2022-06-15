import './EliminarPlatillo.scss';
export default function EliminarPlatillo(props) {
  return (
    <section className='container__delete'>
      <button
        type='button'
        className='button__close'
        onClick={() => {
          props.delete(false);
        }}
      >
        <img className='btn__img' src='/assets/close-icon.svg' alt='IconClose' />
      </button>

      <div className='delete'>
        <h1 className='delete__title'>{'eliminar platillo'.toUpperCase()}</h1>
        <img
          className='delete__svg'
          src='/assets/animated/delete-dish.svg'
          alt='animated delete dish'
        ></img>
        <h4 className='delete__subtitle'>
          {'estas segur@ que deseas eliminar el platillo'.toUpperCase()}
        </h4>
        <p className='delete__name'>{'hamburguesa con queso'.toUpperCase()}</p>
        <button
          className='delete__btn'
          onClick={() => {
            // console.log('eliminando...');
            // console.log(props.isId);
            props.deleteData(props.isId);
          }}
        >
          {'eliminar platillo'.toUpperCase()}
        </button>
      </div>
    </section>
  );
}
