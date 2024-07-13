import { Link } from 'react-router-dom'

import minus from '../../../public/image/svg/minus.png'
import plus from '../../../public/image/svg/plus.png'
import bin from '../../../public/image/svg/bin-added.svg'
import styles from './Card.module.scss'

export const Card = ({ product, decrement, increment, count, handleClickCart, countId }) => {
 
  return (
    <>
      <Link to={`/product/${product.id}`}>
          <img className={styles.image} src={product.images} alt={product.name} />
          <div className={styles.title}>{product.title}</div>
      </Link>
      <div className={styles.price}>{`${product.price} $`}</div>
      <footer className="card-footer">

        <div className={styles.counter}>
          <button
            className={styles.icon__minus}
            onClick={decrement}
          >
            <img src={minus} alt="minus" />
          </button>

          <span
            className={styles.number}
          >
            {
              product.id !== countId ? 1 : count
            }
          </span>

          <button
            className={styles.icon__plus}
            onClick={() => increment(product.id)}
          >
            <img src={plus} alt="plus" />
          </button>
        </div>

        <button
          className={styles.icon__bin}
          onClick={() => handleClickCart(product.id, product.title, product.price, product.images[0], product.description.slice(0, 80))}
        >
          <img src={bin} alt="bin" />
        </button>
      </footer>
    </>
  )
}