import styles from './PersonalArea.module.scss'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const PersonalArea = () => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  const onExitClick = () => {
    navigate('/')
    window.location.reload();  //* По умолчанию этот метод перезагружает страницу из кэша, если мы передаем true в качестве аргумента, он перезагружает всю страницу с сервера, а не с кэша. */
  }

  console.log(user)
  return (
    <main>
      <div className='wrap'>
        <h1 className='text-chapter' style={{ textAlign: 'center' }}>Personal area</h1>
        <div className={styles.user}>
          <img className={styles.avatar} src={user.avatar} alt="avatar" />
          <div>
            <p className='text-id'>{`name: ${user.name}`}</p>
            <p className='text-id'>{`email: ${user.email}`}</p>
            <p className='text-id'>{`role: ${user.role}`}</p>
            <p className='text-id'>{`creationAt: ${user.creationAt.slice(0, 10)}`}</p>
          </div>
          <button
            className={`text-id ${styles.button}`}
            onClick={onExitClick}
          >
            Exit
          </button>
        </div>
      </div>
    </main>
  )
}
