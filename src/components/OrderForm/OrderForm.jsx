import { useDispatch, useSelector } from "react-redux";
import { orderComplited, orderGet } from "../../redux/orderSlice";

import styles from './OrderForm.module.scss'


export const OrderForm = () => {
  const dispatch = useDispatch()
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const products = useSelector((state) => state.cart.products);


  const onHandleForm = (e) => {
    e.preventDefault()

    const data = new FormData(formElem)

    const phone = data.get('phone')
    const email = data.get('email')
    const name = data.get('name')
    const city = data.get('city')
    const street = data.get('street')
    const house = data.get('house')
    const appartment = data.get('appartment')

    if (phone && email && name && city && street && house && appartment) {

      const a = {
        phone,
        email,
        name,
        city,
        street,
        house,
        appartment,
        totalPrice,
        products,
      }

      dispatch(orderComplited(a))
      dispatch(orderGet(false))
      alert(JSON.stringify(a, null, 12));
    }
  }


  return (
    <form id="formElem" className={styles.form}>
      <h1 className='text-chapter'>Order</h1>
      <p className={`text-id ${styles.info}`} style={{ fontWeight: 'bold' }}>Contact information</p>
      <div className={styles.box}>
        <input
          className='side-input'
          type="text"
          placeholder='Phone'
          name='phone'
        />
        <input
          className='side-input'
          type="text"
          placeholder='Email'
          name='email'
        />
        <input
          className='side-input'
          type="text"
          placeholder='Name'
          name='name'
        />
      </div>
      <p className={`text-id ${styles.address}`} style={{ fontWeight: 'bold' }}>Address</p>
      <div className={styles.box}>
        <input
          className='side-input'
          type="text"
          placeholder='City'
          name='city'
        />
        <input
          className='side-input'
          type="text"
          placeholder='Street'
          name='street'
        />
        <div className={styles.house}>
          <div className={styles.layoutlabel}>
            <label className={styles.label} htmlFor='el1'>House</label>
            <input
              className={styles.inputnumber}
              id='el1'
              type="numger"
              name='house'
            />
          </div>
          <div className={styles.layoutlabel}>
            <label className={styles.label} htmlFor='el2'>Appartment</label>
            <input
              className={styles.inputnumber}
              id='el2'
              type="numger"
              name='appartment'
            />
          </div>
        </div>
        <div className={styles.price}>
          <span className='text-chapter'>Total Price:</span>
          <span className='text-chapter'>{`${totalPrice} $`}</span>
        </div>
        <input
          type="submit"
          value={'Ordered'}
          className={styles.submit}
          onClick={onHandleForm}
        />
      </div>
    </form>
  )
}