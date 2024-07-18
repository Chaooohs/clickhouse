import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { statusOrder } from '../../redux/sideBarSlice';
import { OrderForm } from '../OrderForm/OrderForm';

import CloseIcon from '/public/image/svg/close.svg?react'
import success from '/public/image/png/success.png'
import styles from './OrderSide.module.scss'
import { Link } from 'react-router-dom';


export const OrderSide = () => {
  const ref = useRef();
  const dispatch = useDispatch()
  const [close, setClose] = useState(false);
  const order = useSelector((state) => state.sideBar.order);
  const get = useSelector((state) => state.order.get);


  useEffect(() => {
    if (order && !close) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`);
      }, 50);
    } else if (close) {
      ref.current.classList.remove(`${styles.open}`);
      setTimeout(() => {
        dispatch(statusOrder(false));
      }, 350);
    }
  }, [close, order]);


  const handleClickCloseOrder = () => {
    setClose(true);
  };


  return (
    <main>
      <div className='side-layout'>
        <div className={styles.order} ref={ref}>
          <button className={styles.button} onClick={handleClickCloseOrder}>
            <CloseIcon className={styles.icon} />
          </button>
          {
            get &&
            <OrderForm />
          }
          {
            !get &&
            <>
              <h1 className={`text-chapter ${styles.chapter}`}>The order has been successfully completed</h1>
              <p className={`text-description ${styles.desc}`}>A manager will contact you to confirm the information</p>
              <Link
                to='/categories'
                className={`text-id ${styles.goto}`}
                style={{fontWeight: 'bold'}}
                onClick={handleClickCloseOrder}
              >
                &#8592; Go to categories
              </Link>
              <img src={success} alt="img" />
            </>
          }
        </div>
      </div>
    </main>
  )
}