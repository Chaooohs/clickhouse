import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import qs from 'qs'

import { fetchCategoryId } from '../../redux/categoryIdSlice'
import { Cards, Pagination } from '../../components'
import { setFilters } from '../../redux/filtersSlice'
import { useSearchParams } from 'react-router-dom'



export const ProductsPage = () => {
  const ref = useRef(false)
  const isRender = useRef(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(state => state.categoryId.products)
  const status = useSelector(state => state.categoryId.status)
  const error = useSelector(state => state.categoryId.error)
  const { categoryId, offset, limit, } = useSelector(state => state.filters)
  let [searchParams, setSearchParams] = useSearchParams();

  // отправка запроса
  useEffect(() => {
    const a = {
      categoryId,
      offset,
      limit,
    }
    if (!ref.current) {
      dispatch(fetchCategoryId(a))
    }
    ref.current = false
  }, [categoryId, offset])


  // чтение из адрессной строки
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      dispatch(setFilters(params))
      ref.current = true
    }
  }, [])


  // запись в адессную строку
  useEffect(() => {
    // if(isRender.current) {
    const queryString = qs.stringify({
      categoryId,
      offset,
      limit,
    })
    navigate(`?${queryString}`)
    // }
    // isRender.current = true
  }, [categoryId, offset])


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
            <Pagination />
          </div>
        </>
      }
    </main>
  )
}