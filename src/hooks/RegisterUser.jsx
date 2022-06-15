import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { omit } from 'lodash';

const useForm = (callback) => {
  // Form values Register
  const [values, setValues] = useState({});

  // Errors
  const [errors, setErrors] = useState({});

  // // Validación de los inputs del formulario
  // const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  // const expPassword =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  // const expUserName = /[A-Za-z][A-Za-z0-9_]{7,20}/;
  // const expName = /[A-Za-z]+\s[A-Za-z]{5,22}/;

  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) {
          setErrors({
            ...errors,
            userName: 'Tú nombre de usuario debe tener letras, números y solo se permite _ ',
          });
        } else if (value < 0 && value > 20) {
          setErrors({
            ...errors,
            userName: 'Tu nombre de usuario debe tener entre 8 a 19 caracteres',
          });
        } else {
          const newObj = omit(errors, 'userName');
          setErrors(newObj);
        }
        break;

      case 'rol':
        if (!value) {
          setErrors({
            ...errors,
            name: 'Ingresa un nombre correcto',
          });
        } else {
          const newObj = omit(errors, 'name');
          setErrors(newObj);
        }
        break;

      case 'phone':
        if (!value) {
          setErrors({
            ...errors,
            email: 'ingresa un correo electrónico valido',
          });
        } else {
          const newObj = omit(errors, 'email');
          setErrors(newObj);
        }
        break;

      case 'email':
        if (!value) {
          setErrors({
            ...errors,
            password:
              'ingresa una contraseña con el formato valido, una mayúscula, un numero, una minúscula y un carater especial',
          });
        } else {
          const newObj = omit(errors, 'password');
          setErrors(newObj);
        }
        break;

      case 'password':
        if (!value) {
          setErrors({
            ...errors,
            repeatPass:
              'La contraseña debe tener 9 caracteres -> una mayúscula, un número, una minúscula y un caráter especial',
          });
        } else {
          const newObj = omit(errors, 'repeatPass');
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  // evento para detectar el cambio del valor del input
  const handleChange = (event) => {
    event.persist();

    const { name } = event.target;
    const val = event.target.value;

    validate(name, val);

    setValues({
      ...values,
      [name]: val,
    });
    console.log(values);
  };

  const valueChange = (data) => {
    setValues({
      name: data.name,
      rol: data.rol,
      phone: data.phone,
      email: data.email,
      password: data.password,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
      event.target.reset();
    } else {
      console.log('there is an error');
    }
  };

  return {
    values,
    errors,
    handleChange,
    valueChange,
    handleSubmit,
  };
};

export default useForm;
