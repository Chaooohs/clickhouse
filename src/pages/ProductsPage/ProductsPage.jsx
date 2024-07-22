import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { fetchCategoryId } from '../../redux/categoryIdSlice'
import { Cards, Pagination } from '../../components'



export const ProductsPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const products = useSelector(state => state.categoryId.products)
  const status = useSelector(state => state.categoryId.status)
  const error = useSelector(state => state.categoryId.error)
  const [offset, setOffset] = useState(0)

  // read
  useEffect(() => {
    const id = location.pathname.split('').slice(-1).join('')
    dispatch(fetchCategoryId({
      id,
      offset
    }))
  }, [])


  const handleChange = (e) => {
    const offset = e.target.value - 1
    setOffset(offset)
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
        <>
          <div className='wrap'>
            <Cards products={products} />
          </div>
          <Pagination handleChange={handleChange} />
        </>
      }
    </main>
  )
}