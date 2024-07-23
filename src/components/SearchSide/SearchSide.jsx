import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { SearchCard } from '../SearchCard/SearchCard'
import { toggleSearchIcon } from '../../redux/searchSlice'
import { statusRerender, statusSearch } from '../../redux/sideBarSlice'
import styles from './SearchSide.module.scss'

export const SearchSide = () => {
  const ref = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(state => state.search.products)


  // переход к продукту из поиска и закрытие списка поиска и смена иконки поиска
  const rerenderPage = (id) => {
    navigate(`/product/${id}`)
    dispatch(toggleSearchIcon(false))
    dispatch(statusRerender(true))
    dispatch(statusSearch(false))
    // window.location.reload(); // перезагружает страницу
  }

  const goToSearchPage = () => {
    dispatch(toggleSearchIcon(false))
    // dispatch(statusRerender(true))
    dispatch(statusSearch(false))
  }


  return (
    <main>
      <div className={styles.layout} >
        {
          products.length > 0
            ?
            <div className={styles.search} ref={ref}>
              {
                products?.slice(0, 3).map(product => {
                  return (
                    <div key={product.id} className='long-card'>
                      <SearchCard product={product} rerenderPage={rerenderPage} />
                    </div>
                  )
                })
              }
              <Link to='/search' onClick={goToSearchPage}>
                <div className={styles.more}>more goods &#8594;</div>
              </Link>
            </div>
            :
            <div className={styles.no}>No results of search</div>
        }
      </div>
    </main>
  )
}