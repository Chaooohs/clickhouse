import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { setDecrement, setDeleteCartProduct, setIncrement } from '../../redux/cartSlice'
import minus from '../../../public/image/svg/minus.png'
import plus from '../../../public/image/svg/plus.png'
import styles from './ShopCard.module.scss'

export const ShopCard = ({ card }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  return (
    <>
      <div className={styles.image}>
        <img src={card.images} alt="img" />
      </div>

      <div className={styles.info}>
        <div>
          <h3 className='text-title'>{card.title}</h3>
          <div className='text-id'>{`ID: ${card.id}`}</div>
          <div className='text-description'>{card.description}</div>
        </div>
        <div className='text-price'>{`${card.price} $`}</div>
        {/* <button
          className={`"text-description" ${styles.delete}`}
          onClick={() => navigate(`/product/${card.id}`)}
        >
          To the product
        </button> */}
      </div>

      <div className={styles.three}>
        <div className={styles.counter}>
          <button
            className={styles.icon__minus}
            onClick={() => dispatch(setDecrement(card.id))}
          >
            <img src={minus} alt="minus" />
          </button>
          <span
            className={styles.number}
          >
            {
              card.count
            }
          </span>
          <button
            className={styles.icon__plus}
            onClick={() => dispatch(setIncrement(card.id))}
          >
            <img src={plus} alt="plus" />
          </button>
        </div>

        
        <button
          className={`"text-description" ${styles.delete}`}
          onClick={() => dispatch(setDeleteCartProduct(card.id))}
        >
          Delete
        </button>
      </div>
    </>
  )
}