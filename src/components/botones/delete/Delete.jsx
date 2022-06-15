import './Delete.scss';

export default function Delete(props) {
  return (
    <button
      className='btn__del'
      onClick={() => {
        // console.log(props.id);
        props.delete(true);
        props.isId(props.id);
      }}
    >
      <img src='/assets/trash-icon.svg' alt='icon' />
      <p className='btn__del--text'>ELIMINAR</p>
    </button>
  );
}
