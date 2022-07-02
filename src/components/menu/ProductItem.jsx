import './ProductItem.scss';

export default function ProductItem({ platillo, addToCart }) {
  return (
    <div className='platillo__btn'>
      <div className='platillo'>
        <div className='platillo__img'>
          <img className='img' src={platillo.img} alt='' />
        </div>
        <div className='platillo__info'>
          <h3 className='platillo__name'>{platillo.name.toUpperCase()}</h3>
          <p className='platillo__description'>{platillo.description}</p>
          <p className='platillo__price'>{'$' + platillo.price}</p>
        </div>
      </div>
      <div className='counter'>
        <div className='add__dish'>
          <button className='counter__submit' onClick={() => addToCart(platillo.id)}>
            {'agregar al carrito'.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
