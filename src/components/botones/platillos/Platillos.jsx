import './Platillos.scss';
import { useNavigate } from 'react-router-dom';

export default function Platillos(props) {
  const navigate = useNavigate();
  return props.type === 'admin' ? (
    <button className='btn__platillos' onClick={() => navigate('/platillos')}>
      {props.active ? (
        <img src='/assets/dish-icon-white.svg' alt='icon platillo' />
      ) : (
        <img src='/assets/platillo-icon.svg' alt='icon platillo' />
      )}
    </button>
  ) : props.type === 'mesero' ? (
    <button className='btn__platillos' onClick={() => navigate('/orden')}>
      {props.active ? (
        <img src='/assets/dish-icon-white.svg' alt='icon platillo' />
      ) : (
        <img src='/assets/platillo-icon.svg' alt='icon platillo' />
      )}
    </button>
  ) : (
    ''
  );
}
