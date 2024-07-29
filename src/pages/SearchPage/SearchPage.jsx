import { useDispatch, useSelector } from 'react-redux'
import { Cards, Pagination } from '../../components'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import qs from 'qs'

import { searchProducts, toggleSearchIcon } from '../../redux/searchSlice';

export const SearchPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products, status, error } = useSelector(state => state.search)
  const { title, offset, limit } = useSelector(state => state.filters)
  const [searchParams, setSearchParams] = useSearchParams();


  // отправка запроса

  useEffect(() => {
    const params = {
      title,
      offset,
      limit,
    }
    dispatch(searchProducts(params))
  }, [title, offset])


  // запись в адресную строку
  useEffect(() => {
    const queryString = qs.stringify({
      title: title === "" ? null : title,
      offset,
      limit,
    }, { skipNulls: true })
    navigate(`?${queryString}`)
  }, [title, offset])


  // закрытие серч бара после получения товаров
  useEffect(() => {
    if (status === 'success') dispatch(toggleSearchIcon(false))
  }, [status])


  let message
  if (status === 'in progress') {
    message = <div className="loader"><div className="loader__circle"></div></div>
  }
  else if (error === 'fail') {
    message = <h1 className={styles.loading}>{error}</h1>
  }


  return (
    <main className='main'>
      {message}
      {status === 'success' &&
        <div className='wrap'>
          <div>
            <h1 className='text-chapter'>Search results for the query “{`${title === undefined ? '' : title}`}”</h1>
            <Cards products={products} />
            <Pagination/>
          </div>
        </div>
      }
    </main>
  )
}