import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { statusAuth } from '../../redux/sideBarSlice';
import { fetchAuth, sendAuth } from '../../redux/authSlice';
import { CloseButton } from "../CloseButton/CloseButton";
import styles from './AuthSide.module.scss'



export const AuthSide = () => {
  const ref = useRef()
  const dispatch = useDispatch()
  const { status, isUserLoggedIn } = useSelector(state => state.auth)
  const [close, setClose] = useState(false);


  useEffect(() => {
    if (!isUserLoggedIn && !close) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`);
      }, 50);
    } else if (close) {
      ref.current.classList.remove(`${styles.open}`);
      setTimeout(() => {
        dispatch(statusAuth(false));
      }, 350);
    }
  }, [close, isUserLoggedIn]);


  useEffect(() => {
    if (isUserLoggedIn) {
      setTimeout(() => {
        setClose(true)
      }, 2000)
    }
  }, [isUserLoggedIn])


  const handleClickCloseAuth = () => {
    setClose(true);
  };

  const onSetAuthClick = (e) => {
    e.preventDefault()
    const data = new FormData(formElem)
    const a = {
      email: data.get('email'),
      password: data.get('password'),
    }
    dispatch(fetchAuth(a))
    dispatch(sendAuth())
  }


  return (
    <main>
      <div className='side-layout'>
        <div className={styles.auth} ref={ref} >

          <CloseButton onClickClose={handleClickCloseAuth} />

          <div className={styles.box}>
            <h1 className='text-chapter'>Entry</h1>
            <form className={styles.form} onSubmit={onSetAuthClick} id="formElem">
              <input
                className='side-input'
                type="email"
                name='email'
                placeholder='login'
              />
              <input
                className='side-input'
                type="password"
                name='password'
                placeholder='password'
              />
              <input
                className={styles.submit}
                type='submit'
                value={'Enter'}
              />
            </form>
            {
              status === 'fail' &&
              <p className='text-id' style={{ color: 'red', marginTop: '18px' }}>Incorrect login or password</p>
            }
            {
              isUserLoggedIn &&
              <h3 className='text-chapter' style={{ color: '#1bb40d' }}>Welcome!</h3>
            }
          </div>

          <div className='text-id' style={{ marginTop: 'auto' }}>
            <p style={{ display: 'flex', flexDirection: 'column', margin: '18px 0' }}>
              <span style={{ fontWeight: 'bold' }}>Customer</span>
              <span>maria@mail.com</span>
              <span>12345</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}