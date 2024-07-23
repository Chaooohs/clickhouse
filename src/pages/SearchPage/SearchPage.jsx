import { useDispatch, useSelector } from 'react-redux'
import { Cards, Pagination } from '../../components'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getSearchValue, searchProducts, toggleSearchIcon } from '../../redux/searchSlice';

export const SearchPage = () => {
  const ref = useRef(false)
  const dispatch = useDispatch()
  const { value, products, status } = useSelector(state => state.search)
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


  return (
    <main className='main'>
      <div className='wrap'>
        <div>
          <h1 className='text-chapter'>Search results for the query “{`${value}`}”</h1>
          <Cards products={products} />
          <Pagination />
        </div>
      </div>
    </main>
  )
}