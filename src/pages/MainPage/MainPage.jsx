import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { statusAuth } from '../../redux/sideBarSlice'

import raket from '../../../public/image/png/raket.png'
import styles from './MainPage.module.scss'

export const MainPage = () => {
const dispatch = useDispatch()

  const handleStatusAuthClick = () => {
    dispatch(statusAuth(true))
  }


  return (
    <main>
      <div className="wrap">
        <div className={styles.image}>
          <h1 className={`text-chapter ${styles.chapter}`}>Platzi fake store API</h1>
          <span className={`text-id ${styles.desc}`}>Your API for your e-commerce or shopping website prototype.</span>
          <Link to='/categories'>
            <button className={styles.button}>Go to categories</button>
          </Link>
          <button className={styles.login}  onClick={handleStatusAuthClick}>Login</button>
        </div>
      </div>
      <img className={styles.raket} src={raket} alt="img" />
    </main>
  )
}