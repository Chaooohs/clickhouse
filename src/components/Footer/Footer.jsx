import { Link } from 'react-router-dom'

import { Social } from '../Social/Social'

import logo from '../../../public/image/logo/logo.svg'
import styles from './Footer.module.scss'


export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='wrap'>
        <div className={styles.layout}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.content}>

            <div>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Information</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor </p>
            </div>

            <div style={{ justifySelf: 'center' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', }}>Menu</p>
              <p>
                <Link>Categories</Link>
              </p>
              <p>
                <Link>Delivery</Link>
              </p>
              <p>
                <Link>Contacts</Link>
              </p>
            </div>

            <div style={{ justifySelf: 'center' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Contacts</p>
              <p>Lorem</p>
              <p>Lorem ipsum dolor sit</p>
              <p>
                <a href='tel:+000000000'>+00 000 00 00</a>
              </p>
              <p>
                <a href='tel:+000000000'>+00 000 00 00</a>
              </p>
              <p>
                <a href='mailto:ekspress@gmail.com'>ekspress@gmail.com</a>
              </p>
            </div>

            <div className={styles.social}>
              <Social />
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}