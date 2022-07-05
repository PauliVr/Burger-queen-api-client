import './Registro.scss';
import Agregar from '../botones/agregar/Agregar';
import Delete from '../botones/delete/Delete';
import Edit from '../botones/editEmploye/Edit';
import { useState } from 'react';
import { useEffect } from 'react';
import FormularioRegistro from './FormularioRegistro';
import EliminarRegistro from './EliminarRegistro';
import { getEmploye } from '../../firebase/Firebase.js';
import { Navbar } from '../navbar/Navbar';

export default function Registro() {
  const [register, setRegister] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [id, setId] = useState('');
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

  function isId(id, name) {
    setId(id);
    setName(name);
  }

  // console.log(name, id);
  /**
   * está función agrega la fata a la variable de estado DataUpdate y se la manda al formulario por props
   * @param {Object} data
   */
  function assignData(data) {
    setDataUpdate(data);
  }

  return (
    <section className='container_dashboard'>
      <Navbar active='empleados' type='admin'></Navbar>
      <div className='dashboard'>
        <div className='container__register'>
          {isDelete === true ? <EliminarRegistro delete={onDelete} name={name} isId={id} /> : ''}
          {register === true ? <FormularioRegistro register={isRegister} data={dataUpdate} /> : ''}
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
                        <Delete delete={onDelete} isId={isId} id={user.uid} name={user.name} />
                        <Edit register={isRegister} isEdite={assignData} data={user} isId={isId} />
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
