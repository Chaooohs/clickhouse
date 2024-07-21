import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { SearchCard } from '../SearchCard/SearchCard'
import { toggleSearchIcon } from '../../redux/searchSlice'
import { statusRerender } from '../../redux/sideBarSlice'
import styles from './SearchSide.module.scss'

export const SearchSide = () => {
  const ref = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(state => state.search.products)


  // переход к продукту из поиска и закрытие списка поиска
  const rerenderPage = (id) => {
    navigate(`/product/${id}`)
    dispatch(toggleSearchIcon(false))
    dispatch(statusRerender(true))
    // window.location.reload(); // перезагружает страницу
  }

  console.log(products)
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
              <Link>
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