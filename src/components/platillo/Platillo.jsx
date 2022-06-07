import { useEffect, useState } from 'react';
import { helpHttp } from '../../api/helpHttp';
import AgregarPlatillo from '../botones/agregar/AgregarPlatillo';
import Chart from '../botones/charts/Chart';
import Empleados from '../botones/crear empleados/Empleados';
import Delete from '../botones/deleteEmploye/Delete';
import Edit from '../botones/editEmploye/Edit';
import Home from '../botones/home-admin/Home';
import LogOut from '../botones/logOut/LogOut';
import Platillos from '../botones/platillos/Platillos';
import './Platillo.scss';

export default function Platillo(props) {
  const [data, setData] = useState([]);
  let api = helpHttp();
  let url = 'http://localhost:5000/products';

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        setData(res);
      } else {
        setData(null);
      }
      console.log(data);
    });
  }, []);

  return (
    <section className='container__platillos'>
      <div className='platillos__bar'>
        <div className='platillos__bar--opciones'>
          <Home />
          <Empleados />
          <Platillos />
          <Chart />
        </div>
        <div className='platillos__bar--log'>
          <LogOut />
        </div>
      </div>
      <div className='platillos'>
        <div className='platillos__register'></div>
        <h1 className='platillos__title'>{'administrar platillos'.toUpperCase()}</h1>
        <div className='platillos__info'>
          <AgregarPlatillo />
          <div className='tabla'>
            <table className='tabla__platillos'>
              <thead className='tabla__columns'>
                <tr className='tabla__header'>
                  <th className='tabla__title'>{'id'.toUpperCase()}</th>
                  <th className='tabla__name'>{'nombre'.toUpperCase()}</th>
                  <th className='tabla__desc'>{'descripción'.toUpperCase()}</th>
                  <th className='tabla__title'>{'precio'.toUpperCase()}</th>
                  <th className='tabla__img'>{'imagen'.toUpperCase()}</th>
                  <th className='tabla__title'>{'menú'.toUpperCase()}</th>
                  <th className='tabla__title'>{'acciones'.toUpperCase()}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((platillo) => {
                  console.log(platillo);
                  return (
                    <tr key={platillo._id}>
                      <td className='tabla__user--text'>{platillo.id}</td>
                      <td className='tabla__user--text'>{platillo.name}</td>
                      <td className='tabla__user--text'>{platillo.description}</td>
                      <td className='tabla__user--text'>{'$' + platillo.price}</td>
                      <td className='tabla__user--text'>{platillo.image}</td>
                      <td className='tabla__user--text'>{platillo.type}</td>
                      <td className='tabla__user--btns '>
                        <Delete></Delete>
                        <Edit></Edit>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
