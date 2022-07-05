import { useEffect, useState } from 'react';
import './FormularioPlatillo.scss';

const initialForm = {
  id: null,
  name: '',
  type: '',
  description: '',
  price: '',
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
  const [image, setImage] = useState(null);
  const [imageURLs, setImageURLs] = useState(null);

  // console.log(isId);
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  useEffect(() => {
    if (image) {
      console.log(URL.createObjectURL(image));
      setImageURLs(URL.createObjectURL(image));
    }
  }, [image]);

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

  function onImageChange(e) {
    console.log(e.target.files[0]);
    setForm({
      ...form,
      [e.target.name]: `/assets/imgs/${e.target.files[0].name}`,
    });
    setImage(e.target.files[0]);
  }

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
            <label htmlFor='description' className='group__label'>
              {'descripción'.toUpperCase()}
            </label>
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
            <label htmlFor='precio' className='group__label'>
              {'precio'.toUpperCase()}
            </label>
            <input
              type='number'
              name='price'
              value={form.price}
              className='group__input group__input--price'
              placeholder='69.90'
              onChange={handleChange}
            />
          </div>

          <div className='group group--image'>
            <p className='group__label'>{'imagen'.toUpperCase()}</p>
            <label className='group__label--image' htmlFor='img'>
              ELIGE LA IMAGEN
            </label>
            <input
              id='img'
              type='file'
              accept='image/*'
              name='img'
              className='group__input group__input--image'
              onChange={onImageChange}
            />
            {imageURLs ? (
              <img src={imageURLs} alt='uploaded' />
            ) : form.img ? (
              <img src={form.img} alt='uploaded' />
            ) : (
              'No hay Imagen'
            )}
          </div>
          <button className='btn--register'>{'registrar platillo'.toUpperCase()}</button>
        </form>
      </div>
    </section>
  );
}
