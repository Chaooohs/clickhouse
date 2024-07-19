import Facebook from '/public/image/svg/facebook.svg?react'
import Google from '/public/image/svg/google.svg?react'
import styles from './Social.module.scss'


export const Social = () => {
  return (
    <>
      <a href="https://uk-ua.facebook.com/" target='_blank'>
        <div className={styles.iconbox}>
          <Facebook className={styles.icon} />
        </div>
      </a>
      <a href="https://www.google.com.ua/?hl=ua" target='_blank'>
        <div className={styles.iconbox}>
          <Google className={styles.icon} />
        </div>
      </a>
    </>
  )
}