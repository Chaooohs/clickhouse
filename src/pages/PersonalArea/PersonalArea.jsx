import { useSelector } from 'react-redux'
import styles from './PersonalArea.module.scss'


export const PersonalArea = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <main className='main'>
      <div className='wrap'>
        <h1 className='text-chapter' style={{ textAlign: 'center' }}>Personal area</h1>
        <div className={styles.user} key={user.id}>
          <img className={styles.avatar} src={user.avatar} alt="avatar" />
          <div className={styles.info}>
            <p className='text-id'>{`name: ${user.name}`}</p>
            <p className='text-id'>{`email: ${user.email}`}</p>
            <p className='text-id'>{`role: ${user.role}`}</p>
            <p className='text-id'>{`creationAt: ${user.creationAt?.slice(0, 10)}`}</p>
          </div>
          {
            user.role === 'admin' &&
            <div>
              <p><button onClick={onNewCategory}>new category</button></p>
              <p><button onClick={onNewProduct}>new product</button></p>
            </div>
          }
        </div>
      </div>
    </main>
  )
}
