import './Edit.scss';

export default function Edit(props) {
  return (
    <button
      className='btn'
      onClick={() => {
        props.register(true);
        props.isEdite(props.data);
        props.isId(props.data.id);
      }}
    >
      <img className='btn__img' src='/assets/edit-icon.svg' alt='icon edit' />
      <p className='btn__text'>EDITAR</p>
    </button>
  );
}
