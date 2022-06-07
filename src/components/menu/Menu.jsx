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

  console.log(db);
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
        <h1 className='menu__title--text'>{'nuevo pedido'.toUpperCase()}</h1>
        <div className='menu__info'>
          <h2 className='menu__info--employe'>{'empleado'.toUpperCase()}</h2>
          <h3 className='menu__info--date'>{'lunes 6 de junio de 2022'}</h3>
          <div className='input__group'>
            <label htmlFor='cliente'>{'cliente'.toUpperCase()}</label>
            <input
              className='inputs__group--input'
              type='text'
              id='cliente'
              placeholder='Jhon Doe'
            />
          </div>
          <div className='inputs__group'>
            <label className='menu__info--forms' htmlFor='mesa'>
              {'mesa'.toUpperCase()}
            </label>
            <select className='inputs__group--options'>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
          </div>
          <div className='btn__group'>
            <h3>{'menú'.toUpperCase()}</h3>
            <button className='btn__group--button'>{'desayuno'.toUpperCase()}</button>
            <button className='btn__group--button'>{'comida'.toUpperCase()}</button>
          </div>
        </div>
        <div>
          <h3 className='menu__title'>{'elige los platillos'.toUpperCase()}</h3>
          <div className='menu__platillos'>
            {db.map((platillo) => {
              return (
                <button className='platillo__btn'>
                  <div className='platillo'>
                    <div className='platillo__img'>
                      <img className='img' src={platillo.image} alt='' />
                    </div>
                    <div className='platillo__info'>
                      <h3 className='platillo__name'>{platillo.name}</h3>
                      <p className='platillo__description'>{platillo.description}</p>
                      <p className='platillo__price'>{'$' + platillo.price}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
