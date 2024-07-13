import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { fetchCategories } from "../../redux/categoriesSlice"

import styles from './CatalogPage.module.scss'


export const CatalogPage = () => {
  const dispatch = useDispatch()
  const select = useSelector(state => state.categories.categories)
  const status = useSelector(state => state.categories.status)
  const error = useSelector(state => state.categories.error)

  let message


  useEffect(() => {
    dispatch(fetchCategories())
  }, [])


  if (status === 'in progress') {
    // message = <h1 className={styles.loading}>Categories are loading...</h1>
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
              select?.slice(0, 5).map((el, index) => {
                return (
                  <Link to={`/categories/${el.name}`} key={index}>
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