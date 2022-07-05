import { useEffect, useState } from 'react';
import { helpHttp } from '../../api/helpHttp';
import { Navbar } from '../navbar/Navbar';
import Loader from '../loader/Loader';
import Message from '../loader/Message';
import OrderCard from '../waiterHome/OrderCard';
import './Chef.scss';
import { information, userFirebaseName } from '../../router/PrivateRoutes';
export default function Chef() {
  const [loader, setLoader] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  let api = helpHttp();
  let url = 'https://burger-queen-api-pauli.herokuapp.com/orders';

  useEffect(() => {
    setLoader(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          const chefOrders = res.filter((order) => {
            console.log(order);
            return order.state !== 'pagado';
          });
          setData(chefOrders);
          setError(null);
        } else {
          setData(null);
          setError(res);
        }
        setLoader(false);
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
        setError(res);
      }
    });
  };

  return (
    <section className='container__chef'>
      <Navbar active='home' type='chef'></Navbar>

      <article className='chef__orders'>
        <h1 className='chef__orders--title'>{'pedidos actuales'.toUpperCase()}</h1>
        <div className='chef__orders--dashboard'>
          {loader && <Loader></Loader>}
          {error && <Message msg={`Error ${error.status}: ${error.statusText}`}></Message>}
          {data &&
            data.map((order) => {
              return (
                <OrderCard
                  key={Math.random().toString(36).slice(2)}
                  isData={order}
                  isUpdate={updateData}
                  isEmploye={userFirebaseName}
                  isRol={information}
                ></OrderCard>
              );
            })}
        </div>
      </article>
    </section>
  );
}
