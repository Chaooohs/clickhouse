import styles from './PersonalArea.module.scss'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'



export const PersonalArea = () => {
  const navigate = useNavigate()
  const status = useSelector(state => state.auth.status)
  const [auth, setAuth] = useState([])


  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem('clickhouse__user')))
  }, [status])


  const onExitClick = () => {
    localStorage.setItem('clickhouse__user', JSON.stringify([]))
    navigate('/')
    window.location.reload();  //* По умолчанию этот метод перезагружает страницу из кэша, если мы передаем true в качестве аргумента, он перезагружает всю страницу с сервера, а не с кэша. */
  }


  return (
    <main>
      <div className='wrap'>
        <h1 className='text-chapter' style={{ textAlign: 'center' }}>Personal area</h1>
        {
          auth?.map(user => {
            return (
              <div className={styles.user} key={user.id}>
                <img className={styles.avatar} src={user.avatar} alt="avatar" />
                <div>
                  <p className='text-id'>{`name: ${user.name}`}</p>
                  <p className='text-id'>{`email: ${user.email}`}</p>
                  <p className='text-id'>{`role: ${user.role}`}</p>
                  <p className='text-id'>{`creationAt: ${user.creationAt}`}</p>
                </div>
                <button
                  className={`text-id ${styles.button}`}
                  onClick={onExitClick}
                >
                  Exit
                </button>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}
