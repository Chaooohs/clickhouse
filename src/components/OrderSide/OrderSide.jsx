import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { statusOrder } from '../../redux/sideBarSlice';
import { OrderForm } from '../OrderForm/OrderForm';
import { CloseButton } from "../CloseButton/CloseButton";

import success from '/public/image/png/success.jpg'
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
        ref.current.classList.add(`open`);
      }, 50);
    } else if (close) {
      ref.current.classList.remove(`open`);
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
          <CloseButton onClickClose={handleClickCloseOrder} />
          {
            get &&
            <OrderForm />
          }
          {
            !get &&
            <>
              <h1 className={`text-chapter ${styles.chapter}`}>The order has been successfully completed</h1>
              <p className={`text-description ${styles.desc}`}
              style={{marginTop: '24px'}}
              >
                A manager will contact you to confirm the information
              </p>
              <Link
                to='/categories'
                className={`text-id ${styles.goto}`}
                style={{ fontWeight: 'bold', marginTop: '24px' }}
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