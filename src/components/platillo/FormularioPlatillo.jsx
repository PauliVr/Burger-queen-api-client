import { useEffect, useState } from 'react';
import './FormularioPlatillo.scss';

const initialForm = {
  id: null,
  name: '',
  type: '',
  description: '',
  price: 0,
  img: '',
};
// const id = Math.random().toString(36).slice(2);

export default function FormularioPlatillo({
  isId,
  register,
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) {
  const [form, setForm] = useState(initialForm);

  // console.log(isId);
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      // id: id,
      [e.target.name]: e.target.value,
    });
    // console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.description || !form.price || !form.img) {
      alert('datos incompletos ');
      return;
    }
    // console.log(isId);
    if (isId === null || isId === undefined || isId === '') {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <section className='container__form'>
      <button
        type='button'
        className='btn__close'
        onClick={() => {
          register(false);
        }}
      >
        <img className='btn__img' src='/assets/close-icon.svg' alt='IconClose' />
      </button>

      <div className='form'>
        <h1 className='form__title'>{'registrar platillo'.toUpperCase()}</h1>

        <form action='' className='form__form' onSubmit={handleSubmit}>
          <div className='group'>
            <label htmlFor='nombre' className='group__label'>
              {'nombre'.toUpperCase()}
            </label>
            <input
              type='text'
              name='name'
              value={form.name}
              className='group__input'
              placeholder='Hamburguesa con queso'
              onChange={handleChange}
            />
          </div>

          <div className='group'>
            <label htmlFor='type' className='group__label'>
              {'menú'.toUpperCase()}
            </label>
            <div className='group__group--radio'>
              <div className='group--radio'>
                <input
                  type='radio'
                  id='desayuno'
                  name='type'
                  value='Desayuno'
                  onChange={handleChange}
                />
                <label className='radio__label' htmlFor='desayuno'>
                  {'desayuno'.toUpperCase()}
                </label>
              </div>
              <div className='group--radio'>
                <input
                  type='radio'
                  id='comida'
                  name='type'
                  value='Comida'
                  onChange={handleChange}
                />
                <label className='radio__label' htmlFor='comida'>
                  {'comida'.toUpperCase()}
                </label>
              </div>
            </div>
          </div>

          <div className='group'>
            <label htmlFor='description'>{'descripción'.toUpperCase()}</label>
            <input
              type='text'
              name='description'
              className='group__input'
              value={form.description}
              placeholder='Hamburguesa de carne con queso y...'
              onChange={handleChange}
            />
          </div>

          <div className='group'>
            <label htmlFor='precio'>{'precio'.toUpperCase()}</label>
            <input
              type='number'
              name='price'
              value={form.price}
              className='group__input'
              placeholder='69.90'
              onChange={handleChange}
            />
          </div>

          <div className='group'>
            <label htmlFor='img'>{'imagen'.toUpperCase()}</label>
            <input
              type='text'
              name='img'
              className='group__input'
              value={form.img}
              onChange={handleChange}
            />
          </div>
          <button className='btn--register'>{'registrar platillo'.toUpperCase()}</button>
        </form>
      </div>
    </section>
  );
}
