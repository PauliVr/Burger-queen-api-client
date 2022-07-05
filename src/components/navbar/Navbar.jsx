import './Navbar.scss';
import Home from '../botones/home-admin/Home';
import Empleados from '../botones/crear empleados/Empleados';
import Platillos from '../botones/platillos/Platillos';
import LogOut from '../botones/logOut/LogOut';

export function Navbar(props) {
  return (
    <div className='navbar'>
      <div className='navbar__list'>
        <div className={props.active === 'home' ? 'navbar__btn--active' : ''}>
          <Home active={props.active === 'home' ? true : false} />
        </div>
        <div className={props.active === 'empleados' ? 'navbar__btn--active' : ''}>
          {props.type === 'admin' ? (
            <Empleados active={props.active === 'empleados' ? true : false} />
          ) : (
            ''
          )}
        </div>
        <div className={props.active === 'platillos' ? 'navbar__btn--active' : ''}>
          {props.type === 'admin' || props.type === 'mesero' ? (
            <Platillos type={props.type} active={props.active === 'platillos' ? true : false} />
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='navbar__btn--log'>
        <LogOut></LogOut>
      </div>
    </div>
  );
}
