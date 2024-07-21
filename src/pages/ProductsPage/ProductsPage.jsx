import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'


import { fetchCategoryId } from '../../redux/categoryIdSlice'
import { addToCart } from '../../redux/cartSlice'
import { Card } from '../../components'



export const ProductsPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.categoryId.products)
  const status = useSelector(state => state.categoryId.status)
  const error = useSelector(state => state.categoryId.error)
  const [count, setCount] = useState(1)
  const [countId, setCountId] = useState()

  
  // write
  useEffect(() => {
    const id = location.pathname.split('').slice(-1).join('')
    dispatch(fetchCategoryId(id))
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
    dispatch(addToCart({ id, title, price, images, description, count }))
    setCount(1)
  }


  let message
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
          <div className='card-layout'>
            {Array.isArray(selector) &&
              selector.map(product => {
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