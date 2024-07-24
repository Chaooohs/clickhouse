import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'

import { getTotalPrice, setClearCart } from '../../redux/cartSlice'
import { statusOrder } from '../../redux/sideBarSlice'
import { ShopCard } from '../../components'

import empty from '/public/image/png/cart-empty.jpg'
import styles from './CartPage.module.scss'

export const CartPage = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state.cart.products)
  const counter = useSelector(state => state.cart.counter)


  let totalPrice = selector?.map(el => el.count * el.price)
    .reduce((sum, el) => sum + el, 0)


  useEffect(() => {
    dispatch(getTotalPrice(totalPrice))
  }, [selector])


  const handleClickOrder = () => {
    dispatch(statusOrder(true))
  }

  
  let message
  if (counter === 0 || counter === undefined) {
    message = <div>
      <div className={`text-id ${styles.text}`}>Shoping cart is empty</div>
      <img src={empty} alt='img' />
    </div>
  }


  return (
    <main className='main'>
      <div className='wrap'>
        <h1 className='text-chapter'>Shoping Cart</h1>
        <div className={styles.layout}>
          {message}
          {counter > 0 &&
            <>
              <div key={nanoid}>
                {
                  selector?.map(card => {
                    return <div className={styles.shopcard} key={card.id}>
                      <ShopCard
                        card={card}
                      />
                    </div>
                  })
                }
              </div>

              <div className={styles.right}>
                <div className={styles.footer}>
                  <div className={`text-price ${styles.footer__price}`}>
                    <span>Total price: </span>
                    <span>{`${totalPrice} $`}</span>
                  </div>
                  <button
                    className={styles.footer__check}
                    onClick={handleClickOrder}
                  >
                    Checkout
                  </button>
                  <button
                    className={`text-id ${styles.footer__clear}`}
                    onClick={() => dispatch(setClearCart())}
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </main>
  )
}