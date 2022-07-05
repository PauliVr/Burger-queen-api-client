import { useEffect } from 'react';
import { useState } from 'react';
import { helpHttp } from '../../api/helpHttp';
import LogOut from '../botones/logOut/LogOut';
import Loader from '../loader/Loader';
import Message from '../loader/Message';
import OrderCard from './OrderCard';
import './WaiterHome.scss';
import { information, userFirebaseName } from '../../router/PrivateRoutes';
import OrderResume from './OrderResume';

export default function WaiterHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [employeData, setEmployeData] = useState({});
  const [open, setOpen] = useState(false);
  const [dataResume, setDataResume] = useState(null);

  let api = helpHttp();
  let url = 'https://burger-queen-api-pauli.herokuapp.com/orders';

  useEffect(() => {
    setEmployeData({
      name: userFirebaseName,
      rol: information,
    });
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setData(res);
          setErrors(null);
        } else {
          setData(null);
          setErrors(res);
        }
        setLoading(false);
      });
  }, [url]);

  const changeOrderState = (orderState) => {
    setOpen(orderState);
  };

  const dataRes = (data) => {
    console.log(data);
    setDataResume(data);
  };

  return (
    <section className='container__home'>
      <article className='bar'>
        <LogOut></LogOut>
      </article>

      <article className='orders'>
        <div className='container__resume'>
          {open && <OrderResume isChangeState={changeOrderState} isData={dataResume} />}
        </div>
        <h1 className='orders__title'>{'pedidos actuales'.toUpperCase()}</h1>
        <div className='orders__employe'>
          {loading && <Loader></Loader>}
          {errors && <Message msg={`Error ${errors.status}: ${errors.statusText}`}></Message>}
          {data &&
            data.map((order) => {
              return (
                <OrderCard
                  key={Math.random().toString(36).slice(2)}
                  isData={order}
                  isEmploye={employeData.name}
                  isRol={employeData.rol}
                  isChangeState={changeOrderState}
                  setData={dataRes}
                ></OrderCard>
              );
            })}
        </div>
      </article>
    </section>
  );
}
