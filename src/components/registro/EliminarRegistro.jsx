import deleteEmploye from '../../firebase/Firebase';
import './EliminarRegistro.scss';

export default function EliminarRegistro(props) {
  console.log(props.id);
  console.log(props.name);

  async function deletedUser(id) {
    if (id) {
      await deleteEmploye(id);
      props.delete(false);
    }
    console.log('se elimino el usuario con id: ' + id);
  }

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
        <h1 className='delete__title'>{'eliminar empleado'.toUpperCase()}</h1>
        <img
          className='delete__img'
          src='/assets/animated/delete-employe.svg'
          alt='animated delete employe'
        ></img>
        <h4 className='delete__subtitle'>
          {'estas segur@ que deseas eliminar al empleado'.toUpperCase()}
        </h4>
        <p className='delete__name'>{props.name.toUpperCase()}</p>
        <button
          className='delete__btn'
          onClick={() => {
            deletedUser(props.id);
            console.log(props.id);
          }}
        >
          {'eliminar empleado'.toUpperCase()}
        </button>
      </div>
    </section>
  );
}
