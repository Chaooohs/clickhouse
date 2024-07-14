import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { statusAuth } from '../../redux/sideBarSlice';
import { fetchAuth, sendAuth } from '../../redux/authSlice';

import styles from './AuthSide.module.scss'



export const AuthSide = () => {
  const ref = useRef()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.sideBar.auth)
  const status = useSelector(state => state.auth.status)
  const [close, setClose] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    if (auth && !close) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`);
      }, 50);
    } else if (close) {
      ref.current.classList.remove(`${styles.open}`);
      setTimeout(() => {
        dispatch(statusAuth(false));
      }, 350);
    }
  }, [close, auth]);


  useEffect(() => {
    if (status) {
      setTimeout(() => {
        setClose(true)
      }, 2000)
    }
  }, [status])


  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)


  const onSetAuthClick = () => {
    const a = {
      email,
      password,
    }
    dispatch(fetchAuth(a))
    dispatch(sendAuth())
  }


  return (
    <main>
      <div className='side-layout'>
        <div className={styles.auth} ref={ref}>
          <h1 className='text-chapter'>Entry</h1>
          <div className={styles.box}>
            <input
              className='side-input'
              type="text"
              name='email'
              placeholder='maria@mail.com'
              onChange={onEmailChanged}
            />
            <input
              className='side-input'
              type="password"
              name='phone'
              placeholder='12345'
              onChange={onPasswordChanged}
            />
            <button
              className={styles.box__button}
              onClick={onSetAuthClick}
            >Enter</button>
            {
              status === 'fail' &&
              <p className='text-id' style={{ color: 'red' }}>Incorrect login or password</p>
            }
            {
              status === 'success' &&
              <h3 className='text-chapter' style={{ color: '#1bb40d' }}>Welcome!</h3>
            }
          </div>
        </div>
      </div>
    </main>
  )
}