import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { statusAuth } from '../../redux/sideBarSlice'
import { exitUser } from '../../redux/authSlice'

import raket from '../../../public/image/png/raket.jpg'
import styles from './MainPage.module.scss'



export const MainPage = () => {
  const dispatch = useDispatch()
  const { isUserLoggedIn } = useSelector((state) => state.auth)


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  

  // вход в личный кабинет
  const handleStatusAuthClick = () => {
    dispatch(statusAuth(true))
  }


  // выход из личного кабинета
  const handleExitClick = () => {
    dispatch(exitUser(false))
  }


  return (
    <main>
        <div className={styles.image}>
          <div className={styles.dark}>
            <h1 className={`text-chapter ${styles.chapter}`}>Platzi fake store API</h1>
            <p className={`text-id ${styles.desc}`}>Your API for your e-commerce or shopping website prototype.</p>
            <div className={styles.buttons}>
              <Link to='/categories'>
                <button className={styles.button}>Go to categories</button>
              </Link>
              {
                isUserLoggedIn
                  ?
                  <button className={styles.login} onClick={handleExitClick}>
                    Sign out
                  </button>
                  :
                  <button className={styles.login} onClick={handleStatusAuthClick}>
                    Sing in
                  </button>
              }
            </div>
          </div>
        </div>
      <img className={styles.raket} src={raket} alt="img" />
    </main >
  )
}