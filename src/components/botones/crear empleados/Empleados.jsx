import './Empleados.scss';
import { useNavigate } from 'react-router-dom';

export default function Empleados(props) {
  const navigate = useNavigate();
  return (
    <button className='btn__empleado' onClick={() => navigate('/registro')}>
      {props.active ? (
        <img src='/assets/user-circle-icon-white.svg' alt='icon edit' />
      ) : (
        <img src='/assets/userCircle-icon.svg' alt='icon edit' />
      )}
    </button>
  );
}
