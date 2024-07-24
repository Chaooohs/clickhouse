import { useDispatch, useSelector } from 'react-redux'
import { Cards, Pagination } from '../../components'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getSearchValue, searchProducts, toggleSearchIcon } from '../../redux/searchSlice';

export const SearchPage = () => {
  const ref = useRef(false)
  const dispatch = useDispatch()
  const { value, products, status, error } = useSelector(state => state.search)
  const [searchParams, setSearchParams] = useSearchParams();


  // чтение из адрессной строки после ?
  useEffect(() => {
    const title = searchParams.get('title')
    dispatch(getSearchValue(title))
  }, [])
  
  
  // запись в адресную строку после ?
  useEffect(() => {
    setSearchParams({ title: value })
  }, [value])
  
  
  // получение товаров при перезагрузке
  useEffect(() => {
    if (ref.current === true) {
      const title = searchParams.get('title')
      dispatch(searchProducts(title))
    }
    ref.current = true
  }, [value, ])


  // закрытие серч бара после получения товаров
  useEffect(() => {
    if (status === 'success') dispatch(toggleSearchIcon(false))
  }, [status])


  let message
  if (status === 'in progress') {
    // message = <h1 className={styles.loading}>Category is loading...</h1>
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
          <h1 className='text-chapter'>Search results for the query “{`${value}`}”</h1>
          <Cards products={products} />
          <Pagination />
        </div>
      </div>
      }
    </main>
  )
}