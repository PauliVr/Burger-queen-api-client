import './AgregarPlatillo.scss';

export default function AgregarPlatillo(props) {
  return (
    <button
      className='btn__agregar'
      onClick={() => {
        props.register(true);
      }}
    >
      <p className='btn__title'>{'Agregar platillo'.toUpperCase()}</p>
      <img className='btn_img' src='/assets/add-employe.svg' alt='icono agregar platillo' />
    </button>
  );
}
