import { useDispatch, useSelector } from "react-redux";
import { orderComplited, orderGet } from "../../redux/orderSlice";
import { useState } from "react";

import styles from './OrderForm.module.scss'


export const OrderForm = () => {
  const dispatch = useDispatch()
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const products = useSelector((state) => state.cart.products);

  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [house, setHouse] = useState(0)
  const [appartment, setAppartment] = useState(0)


  const onPhoneChanged = (e) => setPhone(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onNameChanged = (e) => setName(e.target.value)
  const onCityChanged = (e) => setCity(e.target.value)
  const onStreerChanged = (e) => setStreet(e.target.value)
  const onHouseChanged = (e) => setHouse(e.target.value)
  const onAppartmentChanged = (e) => setAppartment(e.target.value)

  const onSetOrderClick = () => {
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
    <>
      <h1 className='text-chapter'>Order</h1>
      <p className='text-id' style={{ fontWeight: 'bold' }}>Contact information</p>
      <div className={styles.box}>
        <input
          className={styles.input}
          type="text"
          placeholder='Phone'
          name='phone'
          onChange={onPhoneChanged}
        />
        <input
          className={styles.input}
          type="text"
          placeholder='Email'
          name='email'
          onChange={onEmailChanged}
        />
        <input
          className={styles.input}
          type="text"
          placeholder='Name'
          name='name'
          onChange={onNameChanged}
        />
      </div>
      <p className='text-id' style={{ fontWeight: 'bold' }}>Address</p>
      <div className={styles.box}>
        <input
          className={styles.input}
          type="text"
          placeholder='City'
          name='city'
          onChange={onCityChanged}
        />
        <input
          className={styles.input}
          type="text"
          placeholder='Street'
          name='street'
          onChange={onStreerChanged}
        />
        <div className={styles.house}>
          <div className={styles.layoutlabel}>
            <label className={styles.label} htmlFor='el1'>House</label>
            <input
              className={styles.inputnumber}
              id='el1'
              type="numger"
              name='house'
              onChange={onHouseChanged}
            />
          </div>
          <div className={styles.layoutlabel}>
            <label className={styles.label} htmlFor='el2'>Appartment</label>
            <input
              className={styles.inputnumber}
              id='el2'
              type="numger"
              name='appartment'
              onChange={onAppartmentChanged}
            />
          </div>
        </div>
        <div className={styles.price}>
          <span className='text-chapter'>Total Price:</span>
          <span className='text-chapter'>{`${totalPrice} $`}</span>
        </div>
        <button
          className={styles.buttonorder}
          onClick={onSetOrderClick}
        >
          Ordered</button>
      </div>
    </>
  )
}