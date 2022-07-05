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
import CashPayment from './CashPayment';
import { Navbar } from '../navbar/Navbar';

export default function WaiterHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [employeData, setEmployeData] = useState({});
  const [open, setOpen] = useState(false);
  const [dataResume, setDataResume] = useState(null);
  const [card, setCard] = useState(false);
  const [cash, setCash] = useState(false);

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
          const employeOrders = res.filter((order) => {
            return order.employe === userFirebaseName && order.state !== 'pagado';
          });
          setData(employeOrders);
          setErrors(null);
        } else {
          setData(null);
          setErrors(res);
        }
        setLoading(false);
      });
  }, [url]);

  const updateData = (db) => {
    let endpoint = `${url}/${db.id}`;
    let options = { body: db, headers: { 'content-type': 'application/json' } };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = data.map((el) => (el.id === db.id ? db : el));
        setData(newData);
      } else {
        setErrors(res);
      }
    });
  };

  const changeOrderState = (orderState) => {
    setOpen(orderState);
  };

  const dataRes = (data) => {
    console.log(data);
    setDataResume(data);
  };

  const isCard = (status) => {
    setCard(status);
    console.log(card);
  };

  const isCash = (status) => {
    setCash(status);
    console.log(cash);
  };

  return (
    <section className='container__home'>
      <Navbar active='home' type='mesero'></Navbar>

      <article className='orders'>
        <div className='container__resume'>
          {/* {card && <CardPayment isCard={isCard} isData={dataResume}></CardPayment>} */}
          {cash && (
            <CashPayment
              isCash={isCash}
              isData={dataResume}
              isUpdateData={updateData}
            ></CashPayment>
          )}
          {open && (
            <OrderResume
              isChangeState={changeOrderState}
              isData={dataResume}
              isCard={isCard}
              isCash={isCash}
            />
          )}
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
                  isCard={isCard}
                  isCash={isCash}
                  isUpdate={updateData}
                ></OrderCard>
              );
            })}
        </div>
      </article>
    </section>
  );
}
