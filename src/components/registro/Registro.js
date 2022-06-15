import './Registro.scss';
import LogOut from '../botones/logOut/LogOut';
import Agregar from '../botones/agregar/Agregar';
import Delete from '../botones/delete/Delete';
import Edit from '../botones/editEmploye/Edit';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioRegistro from './FormularioRegistro';
import EliminarRegistro from './EliminarRegistro';
import { getEmploye } from '../../firebase/Firebase.js';
import Home from '../botones/home-admin/Home';
import Empleados from '../botones/crear empleados/Empleados';
import Platillos from '../botones/platillos/Platillos';
import Chart from '../botones/charts/Chart';

export default function Registro(props) {
  const [register, setRegister] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getEmploye()
      .then((data) => {
        setUsers(data);
        setData(true);
      })
      .catch(() => {
        console.log('A Ocurrido un Error');
      });
  }, [data, register, isDelete]);

  useEffect(() => {
    // console.log(dataUpdate);
  }, [dataUpdate]);

  function isRegister(newState) {
    setRegister(newState);
  }

  function onDelete(newState) {
    setIsDelete(newState);
  }

  function deletedId(newId, newName) {
    setUserId(newId);
    setName(newName);
  }

  /**
   * está función agrega la fata a la variable de estado DataUpdate y se la manda al formulario por props
   * @param {Object} data
   */
  function assignData(data) {
    setDataUpdate(data);
  }

  return (
    <section className='container_dashboard'>
      <div className='bar'>
        <div className='bar__btn--opciones'>
          <Home />
          <Empleados />
          <Platillos />
          <Chart />
        </div>
        <div className='bar__btn--log'>
          <LogOut></LogOut>
        </div>
      </div>
      <div className='dashboard'>
        <div className='container__register'>
          {isDelete === true ? <EliminarRegistro name={name} id={userId} delete={onDelete} /> : ''}
          {register === true ? <FormularioRegistro delete={isRegister} data={dataUpdate} /> : ''}
        </div>
        <h1 className='dashboard__title--text'>{'administración de empleados'.toUpperCase()}</h1>
        <div className='container__employes'>
          <Agregar register={isRegister}></Agregar>
          <div className='table'>
            <table className='table__employes'>
              <thead className='table__columns'>
                <tr className='table__header'>
                  <th className='table__title'>{'empleado'.toUpperCase()}</th>
                  <th className='table__title'>{'puesto'.toUpperCase()}</th>
                  <th className='table__title'>{'telefono'.toUpperCase()}</th>
                  <th className='table__title'>{'correo'.toUpperCase()}</th>
                  <th className='table__title'>{'contraseña'.toUpperCase()}</th>
                  <th className='table__title'>{'acciones'.toUpperCase()}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.uid}>
                      <td className='table__user--text'>{user.name}</td>
                      <td className='table__user--text'>{user.rol}</td>
                      <td className='table__user--text'>{user.phone}</td>
                      <td className='table__user--text'>{user.email}</td>
                      <td className='table__user--text'>{user.password}</td>
                      <td className='table__user--btns'>
                        <Delete
                          delete={onDelete}
                          deleteId={deletedId}
                          id={user.uid}
                          name={user.name}
                        />
                        <Edit
                          delete={isRegister}
                          edit={assignData}
                          data={{
                            uid: user.uid,
                            name: user.name,
                            rol: user.rol,
                            phone: user.phone,
                            email: user.email,
                            password: user.password,
                          }}
                        />
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
