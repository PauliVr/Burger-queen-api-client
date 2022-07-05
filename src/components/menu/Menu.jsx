import './Menu.scss';
import { Navbar } from '../navbar/Navbar';
import { helpHttp } from '../../api/helpHttp';
import { useEffect, useState } from 'react';
import Order from '../botones/orden/Order';
import {
  initialState,
  shoppingInitialState,
  shoppingReducer,
} from '../../reducers/shoppingReducer';
import { useReducer } from 'react';
import ProductItem from '../menu/ProductItem';
import Loader from '../loader/Loader';
import Message from '../loader/Message';
import Cart from './Cart';
import { TYPES } from '../../actions/shoppingActions';
import { userFirebaseName } from '../../router/PrivateRoutes';

const newDate = () => {
  let today = new Date();
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  let month = monthNames[today.getMonth()];
  let day = today.getDate() + '/' + month + '/' + today.getFullYear();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' hrs';
  let registerDay = day + ' ' + time;
  // console.log(registerDay);
  // setDate(registerDay);
  return registerDay;
};
const date = newDate();
// console.log(newDate());

//error de campos en la orden
let errorInfoOrder;

export default function Menu() {
  const [db, setDb] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [table, setTable] = useState(0);
  const [menu, setMenu] = useState([]);
  const [cartData, setCartData] = useState([]);

  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart } = state;
  console.log(state);

  //Manejo de Loaders y errores
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //manejo de los datos de la orden
  const [orderInfo, setOrderInfo] = useState({});

  // const [count, setCount] = useState(0);
  let api = helpHttp();
  let url = 'https://burger-queen-api-pauli.herokuapp.com/products';

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setDb(res);
        setMenu(res);
        setError(null);
        initialState(res);
      } else {
        setDb(null);
        setMenu(null);
        setError(res);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(menu);
  }, [menu]);

  function filterData(type) {
    const menuFilter = db.filter((product) => product.type === type);
    setMenu(menuFilter);
    // initialState(menuFilter);
    // dispatch({ type: TYPES.FILTER_PRODUCTS, payload: menuFilter });
  }

  function isOpen(newState) {
    setOpen(newState);
    console.log(newState);
  }

  function userName(newName) {
    console.log(newName);
    setName(newName);
  }

  function userTable(newTable) {
    console.log(newTable);
    setTable(newTable);
  }

  const dataCart = (cart) => {
    setCartData(cart);
  };

  const addToCart = (id) => {
    console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    console.log(state);
  };

  const delFromCart = (id, all = false) => {
    console.log(id, all);
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = (string) => {
    dispatch({ type: TYPES.CLEAR_CART });
    console.log(string);
  };

  // console.log(products);

  const infoOrder = (event) => {
    event.persist();
    const { name } = event.target;
    const val = event.target.value;

    if (name && val) {
      setOrderInfo({
        ...orderInfo,
        [name]: val,
      });
      console.log(orderInfo);
    } else {
      return (errorInfoOrder = 'Completa los campos para registrar la orden');
    }
  };

  return (
    <section className='container__menu'>
      <Navbar active='platillos' type='mesero'></Navbar>
      <div className='menu'>
        <div className='menu__cart'>
          {open === true ? (
            <Cart
              open={isOpen}
              isClear={clearCart}
              isCart={state.cart}
              isDelFromCart={delFromCart}
              employe={userFirebaseName}
              date={date}
              orderData={orderInfo}
            ></Cart>
          ) : (
            ''
          )}
        </div>
        <div className='menu__info'>
          <div className='menu__order'>
            <h1 className='menu__title--text'>{'nuevo pedido'.toUpperCase()}</h1>
            <div className={`menu__order-info ${open ? 'collapsed' : 'expanded'}`}>
              <div>
                <h2 className='menu__info--employe'>{'empleado'.toUpperCase()}</h2>
                <h3 className='menu__info--date'>{date}</h3>
              </div>
              <div>
                <div className='inputs__group'>
                  <label htmlFor='cliente' className='menu__info--forms'>
                    {'cliente'.toUpperCase()}
                  </label>
                  <input
                    className='inputs__group--input'
                    type='text'
                    id='cliente'
                    name='clientName'
                    onChange={infoOrder}
                    placeholder='Jhon Doe'
                  />
                </div>
                <div className='inputs__group'>
                  <label className='menu__info--forms' htmlFor='table'>
                    {'mesa'.toUpperCase()}
                  </label>
                  <select
                    className='inputs__group--options'
                    id='table'
                    name='tables'
                    onChange={infoOrder}
                  >
                    <option className='options__opt' value='1'>
                      0
                    </option>
                    <option className='options__opt' value='1'>
                      1
                    </option>
                    <option className='options__opt' value='2'>
                      2
                    </option>
                    <option className='options__opt' value='3'>
                      3
                    </option>
                    <option className='options__opt' value='4'>
                      4
                    </option>
                    <option className='options__opt' value='5'>
                      5
                    </option>
                    <option className='options__opt' value='6'>
                      6
                    </option>
                    <option className='options__opt' value='7'>
                      7
                    </option>
                    <option className='options__opt' value='8'>
                      8
                    </option>
                    <option className='options__opt' value='9'>
                      9
                    </option>
                    <option className='options__opt' value='10'>
                      10
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className='btn__container'>
              <div className='btn__group'>
                <h3>{'menú'.toUpperCase()}</h3>
                <button className='btn__group--button' onClick={() => filterData('Desayuno')}>
                  {'desayuno'.toUpperCase()}
                </button>
                <button className='btn__group--button' onClick={() => filterData('Comida')}>
                  {'comida'.toUpperCase()}
                </button>
              </div>
              <div className='btn__list'>
                <Order open={isOpen}></Order>
              </div>
            </div>
          </div>
        </div>
        <div className='platillos__menu'>
          <h3 className='menu__title'>{'elige los platillos'.toUpperCase()}</h3>
          <div className='menu__platillos'>
            {loading && <Loader></Loader>}
            {error && <Message msg={`Error ${error.status}: ${error.statusText}`}></Message>}
            {menu &&
              menu.map((platillo) => (
                <ProductItem
                  key={Math.random().toString(36).slice(2)}
                  platillo={platillo}
                  addToCart={addToCart}
                ></ProductItem>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
