import './Delete.scss';

export default function Delete(props) {
  return (
    <button
      className='btn__del'
      onClick={() => {
        props.delete(true);
      }}
    >
      <img src='/assets/trash-icon.svg' alt='icon' />
      <p className='btn__del--text'>ELIMINAR</p>
    </button>
  );
}
