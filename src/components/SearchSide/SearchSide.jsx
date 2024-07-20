import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

import { SearchCard } from '../SearchCard/SearchCard'
import { toggleSearchIcon } from '../../redux/searchSlice'
import styles from './SearchSide.module.scss'

export const SearchSide = () => {
  const ref = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products, isSearchIn } = useSelector(state => state.search)


  // перекключение выпадания резеультатов поиска и исключения из ДОМ  
  useEffect(() => {
    if (isSearchIn) {
      setTimeout(() => {
        ref.current.classList.add('open-search')
      }, 50)
    } else {
      setTimeout(() => {
        ref.current?.classList.remove('open-search')
      }, 350)
    }
  }, [isSearchIn])


  // переход к продукту из поиска и закрытие списка поиска
  const refreshPage = (id) => {
    navigate(`/product/${id}`)
    dispatch(toggleSearchIcon(false))
    window.location.reload(); // перезагружает страницу
  }

  return (
    isSearchIn &&
    <main>
      <div className={styles.layout} ref={ref}>
        <div className={styles.search}>
          {
            products?.slice(0, 3).map(product => {
              return (
                <div key={product.id} className='long-card'>
                  <SearchCard product={product} refreshPage={refreshPage} />
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}