import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { statusAuth } from '../../redux/sideBarSlice';
import { fetchAuth } from '../../redux/authSlice';

import CloseIcon from '/public/image/svg/close.svg?react'
import styles from './AuthSide.module.scss'


export const AuthSide = () => {
  const ref = useRef()
  const dispatch = useDispatch()
  const [close, setClose] = useState(false);
  const auth = useSelector(state => state.sideBar.auth)
  const {status, error} = useSelector(state => state.auth)
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


  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)


  const handleClickCloseAuth = () => {
    setClose(true);
  };


  const onSetAuthClick = () => {
    const a = {
      email,
      password,
    }
    dispatch(fetchAuth(a))
  }

  return (
    <main>
      <div className='side-layout'>
        <div className={styles.auth} ref={ref}>
          <button className={styles.button} onClick={handleClickCloseAuth}>
            <CloseIcon className={styles.icon} />
          </button>
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
              <p className='text-id' style={{color: 'red'}}>Incorrect login or password</p>
            }
            {
              status === 'success' &&
              <h3 className='text-chapter' style={{color: '#1bb40d'}}>Welcome!</h3>
            }
          </div>
        </div>
      </div>
    </main>
  )
}