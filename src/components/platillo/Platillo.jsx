import { useEffect, useState } from 'react';
import { helpHttp } from '../../api/helpHttp';
import AgregarPlatillo from '../botones/agregar/AgregarPlatillo';
import Delete from '../botones/delete/Delete';
import Edit from '../botones/editEmploye/Edit';
import Loader from '../loader/Loader';
import Message from '../loader/Message';
import EliminarPlatillo from './EliminarPlatillo';
import FormularioPlatillo from './FormularioPlatillo';
import { Navbar } from '../navbar/Navbar';
import './Platillo.scss';

export default function Platillo() {
  const [data, setData] = useState(null); //db
  const [register, setRegister] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  //variables para el CRUD de API
  const [dataToEdit, setDataToEdit] = useState(null); //identifica si se edita un registro

  //manejo de errores y loader
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * @var state [id, setId]
   * variable para elevar el estado del botón al formulario, esta guarda el id del elemento a eliminar
   */
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  let api = helpHttp();
  let url = 'https://burger-queen-api-pauli.herokuapp.com/products';

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setData(res);
          setError(null);
        } else {
          setData(null);
          setError(res);
        }

        setLoading(false);
      });
  }, [url]);

  // console.log(data);

  const createData = (db) => {
    // console.log(data);
    db.id = Date.now().toString();
    db.price = Number(db.price);
    let options = { body: db, headers: { 'content-type': 'application/json' } };

    api.post(url, options).then((res) => {
      // console.log(db);
      if (!res.err) {
        setData([...data, res]);
      } else {
        setError(res);
      }
    });
    setRegister(false);
  };

  const updateData = (db) => {
    let endpoint = `${url}/${db.id}`;
    // console.log(endpoint);
    let options = { body: db, headers: { 'content-type': 'application/json' } };

    api.put(endpoint, options).then((res) => {
      // console.log(res);
      if (!res.err) {
        let newData = data.map((el) => (el.id === db.id ? db : el));
        // console.log(newData);
        setData(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { 'content-type': 'application/json' },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          let newData = data.filter((el) => el.id !== id);
          setData(newData);
        } else {
          setError(res);
        }
      });
    } else {
    }
    setIsDelete(false);
  };

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

  function isEditing(newValues) {
    setDataToEdit(newValues);
  }

  // console.log(dataToEdit);

  function clearDataToEdit() {
    setDataToEdit(null);
  }

  return (
    <section className='container__platillos'>
      <Navbar active='platillos' type='admin'></Navbar>
      <div className='platillos'>
        <div className='platillos__register'>
          {register === true ? (
            <FormularioPlatillo
              register={isRegister}
              isId={id}
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
          ) : (
            ''
          )}
          {isDelete === true ? (
            <EliminarPlatillo delete={onDelete} name={name} isId={id} deleteData={deleteData} />
          ) : (
            ''
          )}
        </div>
        <h1 className='platillos__title'>{'administrar platillos'.toUpperCase()}</h1>
        <div className='platillos__info'>
          <AgregarPlatillo register={isRegister} clearData={clearDataToEdit}></AgregarPlatillo>

          {loading && <Loader></Loader>}
          {error && <Message msg={`Error ${error.status}: ${error.statusText}`}></Message>}
          <div className='tabla'>
            {data && (
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
                    return (
                      <tr key={Math.random().toString(36).slice(2)}>
                        <td className='tabla__user--text'>{platillo.id}</td>
                        <td className='tabla__user--text'>{platillo.name}</td>
                        <td className='tabla__user--text'>{platillo.description}</td>
                        <td className='tabla__user--text'>{'$' + platillo.price}</td>
                        <td className='tabla__user--text'>
                          <img className='table__image' src={platillo.img} alt='platillo' />
                        </td>
                        <td className='tabla__user--text'>{platillo.type}</td>
                        <td className='tabla__user--btns '>
                          <Delete
                            delete={onDelete}
                            isId={isId}
                            id={platillo.id}
                            name={platillo.name}
                          ></Delete>
                          <Edit
                            register={isRegister}
                            isEdite={isEditing}
                            isId={isId}
                            data={platillo}
                          ></Edit>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
