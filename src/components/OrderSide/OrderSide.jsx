import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { statusOrder } from '../../redux/sideBarSlice';
import { OrderForm } from '../OrderForm/OrderForm';

import CloseIcon from '/public/image/svg/close.svg?react'
import success from '/public/image/png/success.png'
import styles from './OrderSide.module.scss'


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
              <h1 className='text-chapter' style={{ color: '#1BB40D', marginTop: '90px' }}>The order has been successfully completed</h1>
              <p className='text-description'>A manager will contact you to confirm the information</p>
              <img src={success} alt="img" />
            </>
          }
        </div>
      </div>
    </main>
  )
}