import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { fetchCategories } from "../../redux/categoriesSlice"
import { addCategoryId } from "../../redux/filtersSlice"

import styles from './CatalogPage.module.scss'


export const CatalogPage = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  const status = useSelector(state => state.categories.status)
  const error = useSelector(state => state.categories.error)

  // получение всех категорий
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])


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
        <div className="wrap">
          <h1 className='text-chapter'>Categories</h1>
          <div className={styles.layout}>
            {
              Array.isArray(categories) &&
              categories.map((el, index) => {
                return (
                  <Link
                    to={`/products`}
                    key={index}
                    onClick={() => dispatch(addCategoryId(el.id))}
                  >
                    <img className={styles.image} src={el.image} />
                    <span className={styles.name}>{el.name}</span>
                  </Link>
                )
              })
            }
          </div>
        </div>
      }
    </main>
  )
}