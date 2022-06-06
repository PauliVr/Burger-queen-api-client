import './Menu.scss';
import LogOut from '../botones/logOut/LogOut';

import Home from '../botones/home-admin/Home';
import Empleados from '../botones/crear empleados/Empleados';
import Platillos from '../botones/platillos/Platillos';
import Chart from '../botones/charts/Chart';
import { helpHttp } from '../../api/helpHttp';
import { useEffect, useState } from 'react';

export default function Menu(props) {
  const [db, setDb] = useState([]);
  let api = helpHttp();
  let url = 'http://localhost:5000/products';

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
      } else {
        setDb(null);
      }
    });
  }, []);

  return (
    <section className='container__menu'>
      <div className='bar'>
        <div className='bar__btns--opc'>
          <Home />
          <Empleados />
          <Platillos />
          <Chart />
        </div>
        <div className='bar__btn--log'>
          <LogOut></LogOut>
        </div>
      </div>
      <div className='menu'>
        <div className='menu__container'></div>
        <h1 className='menu__title--text'>{'menú'.toUpperCase()}</h1>
        <div className='menu__dishes'></div>
      </div>
    </section>
  );
}
