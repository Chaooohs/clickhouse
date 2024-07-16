import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { fetchCategories } from "../../redux/categoriesSlice"
import { fetchCategoryId } from "../../redux/categoryIdSlice"

import styles from './CatalogPage.module.scss'


export const CatalogPage = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  const status = useSelector(state => state.categories.status)
  const error = useSelector(state => state.categories.error)
  

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])


  const onPassCatalogID = (id, name) => {
    dispatch(fetchCategoryId(id.toString()))
  }


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
        <div className="wrap">
          <h1 className='text-chapter'>categories</h1>
          <div className={styles.layout}>
            {
              Array.isArray(categories) &&
              categories.map((el, index) => {
                return (
                  <Link
                    to={`/categories/${el.name}/id=${el.id}`}
                    key={index}
                    onClick={() => onPassCatalogID(el.id, el.name)}
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