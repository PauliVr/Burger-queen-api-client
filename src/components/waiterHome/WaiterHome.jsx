import { useEffect } from 'react';
import { useState } from 'react';
import { helpHttp } from '../../api/helpHttp';
import LogOut from '../botones/logOut/LogOut';
import Loader from '../loader/Loader';
import Message from '../loader/Message';
import OrderCard from './OrderCard';
import './WaiterHome.scss';

export default function WaiterHome(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  let api = helpHttp();
  let url = 'http://localhost:5000/orders';

  useEffect(() => {
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

  return (
    <section className='container__home'>
      <article className='bar'>
        <LogOut></LogOut>
      </article>

      <article className='orders'>
        <h1 className='orders__title'>{'pedidos actuales'.toUpperCase()}</h1>
        <div className='orders__employe'>
          {loading && <Loader></Loader>}
          {errors && <Message msg={`Error ${errors.status}: ${errors.statusText}`}></Message>}
          {data &&
            data.map((order) => {
              return (
                <OrderCard key={Math.random().toString(36).slice(2)} isData={order}></OrderCard>
              );
            })}
        </div>
      </article>
    </section>
  );
}
