import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'

import { SearchCard } from '../SearchCard/SearchCard'
import { searchProducts, toggleSearchIcon } from '../../redux/searchSlice'
import { statusRerender, statusSearch } from '../../redux/sideBarSlice'
import styles from './SearchSide.module.scss'

export const SearchSide = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { products } = useSelector(state => state.search)
  const { title, offset, limit } = useSelector(state => state.filters)

  // отправка запроса
  useEffect(() => {
    if(location.pathname !== '/search') {
      const params = {
        title,
        offset,
        limit,
      }
      dispatch(searchProducts(params))
    }
  }, [title, offset])

  // переход к продукту из поиска и закрытие списка поиска и смена иконки поиска
  const rerenderPage = (id) => {
    navigate(`/product/${id}`)
    dispatch(toggleSearchIcon(false))
    dispatch(statusRerender(true))
    dispatch(statusSearch(false))
    // window.location.reload(); // перезагружает страницу
  }

  const goToSearchPage = () => {
    navigate(`/search?title=${title}`)
    dispatch(toggleSearchIcon(false))
    dispatch(statusRerender(true))
    dispatch(statusSearch(false))
  }


  return (
    <main>
      <div div className={styles.layout} >
        {
          products.length > 0
            ?
            <div className={styles.search}>
              {
                products?.slice(0, 2).map(product => {
                  return (
                    <div key={product.id} className='long-card'>
                      <SearchCard product={product} rerenderPage={rerenderPage} />
                    </div>
                  )
                })
              }
              <button className={styles.more} onClick={goToSearchPage}>more goods &#8594;</button>
            </div>
            :
            <div className={styles.no}>No results of search</div>
        }
      </div>
    </main >
  )
}