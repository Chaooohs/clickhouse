import styles from './Header.module.scss'
import Logo from '../../../public/image/logo/logo.svg'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="wrap">
        <div className={styles.content}>
          <Link to='/'><img className={styles.logo} src={Logo} alt="logo" /></Link>
          <div className={styles.links}>
            <NavLink className={styles.link} to='/categories'>categories</NavLink>
            <NavLink className={styles.link} to='/delivery'>delivery</NavLink>
            <NavLink className={styles.link} to='/contacts'>contacts</NavLink>
          </div>
          <a className={styles.tel} href="tel:+000000000">+00 000 00 00</a>
        </div>
      </div>

    </header>
  )
}