import { Social } from '../../components'
import Image from '/public/image/png/contacts.png'
import styles from './ContactsPage.module.scss'

export const ContactsPage = () => {
  return (
    <main>
      <div className='wrap'>
        <h1 className='text-chapter'>Contacts</h1>
        <div className={styles.layout}>

          <div className={styles.tels}>
            <a className='text-id' href="tel:+000000000">+00 000 00 00</a>
            <a className='text-id' href="tel:+000000000">+00 000 00 00</a>
            <a className='text-id' href="mailto:ekspress@gmail.com">ekspress@gmail.com</a>
          </div>
          <div className={styles.city}>
            <span className='text-id'>New Yourk City</span>
            <span className='text-id'>Lorem ipsum dolor sit a</span>
            <span className='text-id'>Lorem ipsum, dolor</span>
          </div>
          <div className={styles.company}>
            <span className='text-id'>Lorem ipsum dolor sit a</span>
            <span className='text-id'>Lorem ipsum dolor</span>
            <span className='text-id'>Lorem ipsum, dolor</span>
          </div>
          <div className={styles.social}>
            <Social/>
          </div>
          <img className={styles.image} src={Image} alt="img" />
        </div>
      </div>
    </main>
  )
}