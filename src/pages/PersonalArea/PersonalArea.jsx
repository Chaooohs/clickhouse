import styles from './PersonalArea.module.scss'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newCategory } from '../../redux/categoriesSlice'
import { newPoduct } from '../../redux/productsSlice'



export const PersonalArea = () => {
  const dispatch = useDispatch()
  const status = useSelector(state => state.auth.status)
  const [auth, setAuth] = useState([])


  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem('clickhouse__user')))
  }, [status])


  const onNewCategory = () => {
    dispatch(newCategory({
      name: "Sound",
      image: "https://justenergy.com/wp-content/uploads/2021/08/sound-energy-illustration.jpg"
    }))
  }
  const onNewProduct = () => {
    dispatch(newPoduct({
      title: "Yamaha HS5",
      price: 159,
      description: "A description",
      categoryId: 10,
      images: ["https://cdn.mos.cms.futurecdn.net/c6BYbCdoK8RvUhUsXotgFf-970-80.jpg.webp"]
    }))
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
                  <p className='text-id'>{`creationAt: ${user.creationAt.slice(0, 10)}`}</p>
                </div>
              </div>
            )
          })
        }
        <p><button onClick={onNewCategory}>new category</button></p>
        <p><button onClick={onNewProduct}>new product</button></p>
      </div>
    </main>
  )
}
