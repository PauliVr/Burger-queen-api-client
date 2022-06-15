import './Message.scss';
export default function Message(props) {
  return (
    <section className='error'>
      <h2 className='error__msg'>{props.msg}</h2>
      <img className='error__img' src='/assets/animated/message_error.svg' alt='' />
    </section>
  );
}
