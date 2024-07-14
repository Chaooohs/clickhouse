import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { fetchCategoryId } from '../../redux/categoryIdSlice'
import { addToCart } from '../../redux/cartSlice'
import { Card } from '../../components'

import styles from './ProductsPage.module.scss'


export const ProductsPage = () => {
  const dispath = useDispatch()
  const selector = useSelector(state => state.categoryId.products)
  const status = useSelector(state => state.categoryId.status)
  const error = useSelector(state => state.categoryId.error)
  const location = useLocation()
  const [count, setCount] = useState(1)
  const [countId, setCountId] = useState()

  let message
  const a = location.pathname.split('/').slice(2, 3).join('/')


  useEffect(() => {
    if (a === 'Shoes') dispath(fetchCategoryId(4))
    else if (a === 'Clothes') dispath(fetchCategoryId(1))
    else if (a === 'Miscellaneous') dispath(fetchCategoryId(5))
    else if (a === 'Furniture') dispath(fetchCategoryId(3))
    else if (a === 'Electronics') dispath(fetchCategoryId(2))
  }, [])


  const increment = (id) => {
    const found = selector?.find(el => el.id === id)
    if (found.id === id) {
      setCount(count + 1)
      setCountId(id)
    }
  }

  const decrement = () => setCount(Math.max(1, count - 1))


  const handleClickCart = (id, title, price, images, description) => {
    dispath(addToCart({ id, title, price, images, description, count }))
    setCount(1)
  }


  if (status === 'in progress') {
    // message = <h1 className={styles.loading}>Category is loading...</h1>
    message = <div className="loader"><div className="loader__circle"></div></div>
  }
  else if (error === 'fail') {
    message = <h1 className={styles.loading}>{error}</h1>
  }


  return (
    <main>
      {message}
      {status === 'success' &&
        <div className='wrap'>
          <div className={styles.layout__card}>
            {
              selector?.map(product => {
                return (
                  <div className="card" key={product.id}>
                    <Card
                      product={product}
                      count={count}
                      countId={countId}
                      increment={increment}
                      decrement={decrement}
                      handleClickCart={handleClickCart}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </main>
  )
}