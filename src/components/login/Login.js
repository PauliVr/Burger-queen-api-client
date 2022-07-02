import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, userExist, db, app } from '../../firebase/Firebase.js';
import { useState } from 'react';

export default function LogIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState('');

  // async function getRol(uid) {
  //   const docRef = doc(db, `users/${uid}`);
  //   const docu = await getDoc(docRef);
  //   const information = docu.data().rol;
  //   return information;
  // }

  // function setUserFirebaseRol(userFirebase) {
  //   getRol(userFirebase.uid).then((rol) => {
  //     const userData = {
  //       uid: userFirebase.uid,
  //       email: userFirebase.email,
  //       rol: rol,
  //     };
  //     setUser(userData);
  //     setRol(rol);
  //     console.log(userData);
  //   });
  // }

  // console.log(rol);

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (userFirebase) => {
  //     console.log(userFirebase);
  //     if (userFirebase && userFirebase.uid) {
  //       //funcion final
  //       if (!user) {
  //         setUserFirebaseRol(userFirebase);
  //       }
  //       // navigate('/registro');
  //       navigate('/general-home/' + { user: user });
  //       // <App user={user} />;
  //       // <GeneralHome user=user />
  //       // return <>{userFirebase ? <GeneralHome /> : navigate('/login')}</>;
  //     }
  //   });
  //   console.log(user);
  // }, [navigate]);

  async function formLogin(e) {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, values.email, values.pass);
      console.log(result);
      const registered = await userExist(auth.currentUser.uid);
      if (registered && auth.currentUser.uid) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    // console.log(values);
  }

  return (
    <section className='login'>
      <div className='login__form'>
        <div className='form__logo'>
          <img
            className='form__icon'
            src='/assets/burguer-queen-icon.svg'
            alt='icono BurguerQueen'
          />
        </div>

        <form className='form' onSubmit={formLogin}>
          <div className='form__group'>
            <img className='form__icons' src='/assets/user-login-icon.svg' alt='icono user'></img>
            <div className='form_input'>
              <input
                className='form__text'
                type='text'
                id='input-email'
                name='email'
                onChange={handleChange}
                placeholder={'usuario'.toUpperCase()}
                required
              />
              <label htmlFor='input-email' className='form__label'>
                Ingresa tu correo
              </label>
            </div>
          </div>
          <div className='form__group'>
            <img className='form__icons' src='/assets/lock-login-icon.svg' alt='icono lock'></img>
            <div className='form__input'>
              <input
                className='form__text'
                type='text'
                id='input-pass'
                name='pass'
                onChange={handleChange}
                placeholder={'password'.toUpperCase()}
                required
              />
              <label htmlFor='input-pass' className='form__label'>
                Ingresa tu password
              </label>
            </div>
          </div>
          <button className='form__button'>{'Entrar'.toUpperCase()}</button>
        </form>
      </div>

      <div className='login__hero'></div>
    </section>
  );
}
