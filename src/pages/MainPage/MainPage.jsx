import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { statusAuth } from '../../redux/sideBarSlice'
import { exitUser } from '../../redux/authSlice'

import raket from '../../../public/image/png/raket.png'
import styles from './MainPage.module.scss'



export const MainPage = () => {
  const dispatch = useDispatch()
  const { isUserLoggedIn } = useSelector((state) => state.auth)


  const handleStatusAuthClick = () => {
    dispatch(statusAuth(true))
  }


  const handleExitClick = () => {
    localStorage.setItem('clickhouse__user', JSON.stringify([]))
    // navigate('/')
    dispatch(exitUser(null))
  }


  return (
    <main>
      <div className={styles.wrap}>
        <div className={styles.image}>
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