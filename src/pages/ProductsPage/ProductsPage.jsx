import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import qs from 'qs'

import { fetchCategoryId } from '../../redux/categoryIdSlice'
import { Cards, Pagination } from '../../components'
import { addOffset, setFilters } from '../../redux/filtersSlice'



export const ProductsPage = () => {
  const ref = useRef(false)
  const isRender = useRef(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {products, status, error} = useSelector(state => state.categoryId)
  const { categoryId, offset, limit, } = useSelector(state => state.filters)

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


  // обнуление offset при смене категории
  useEffect(() => {
    dispatch(addOffset(0))
  }, [categoryId])


  let message
  if (status === 'in progress') {
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