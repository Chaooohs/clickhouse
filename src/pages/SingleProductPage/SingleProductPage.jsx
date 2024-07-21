import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { fetchSingleProduct } from '../../redux/singleProdSlice'
import { fetchPoductsAll } from '../../redux/productsSlice'
import { addToCart } from '../../redux/cartSlice'
import { statusRerender } from '../../redux/sideBarSlice'
import { Card } from '../../components'

import minus from '../../../public/image/svg/minus.png'
import plus from '../../../public/image/svg/plus.png'
import plusBtn from '../../../public/image/svg/whiteplus.svg'
import styles from './SingleProductPage.module.scss'


export const SingleProductPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const {productsAll, randomGoods} = useSelector(state => state.productsAll)
  const single = useSelector(state => state.singleProduct.product)
  const status = useSelector(state => state.singleProduct.status)
  const error = useSelector(state => state.singleProduct.error)
  const rerender = useSelector(state => state.sideBar.rerender)

  const [indexImage, setIndexImage] = useState(0)
  const [count, setCount] = useState(1)
  const [countId, setCountId] = useState()
  const [refresh, setRefresh] = useState(false)


  const a = location.pathname.split('/').slice(2, 3).join('/')


  useEffect(() => {
    dispatch(fetchSingleProduct(a))
    dispatch(fetchPoductsAll())
    setRefresh(false)
  }, [refresh])


// обновление компонента при повторном выборе четырех предлагаемых продуктоа
  useEffect(() => {
    setRefresh(true)
    dispatch(statusRerender(false))
  }, [rerender])

  
  // обновление компонента при выборе четырех предлагаемых продуктоа
  const rerenderPage = () => {
    setRefresh(true)
  }


  const handleClick = (index) => {
    setIndexImage(index)
  }


  const increment = (id) => {
    const found = productsAll?.find(el => el.id === id)
    if (found.id === id) {
      setCount(count + 1)
      setCountId(id)
    }
  }
  const decrement = () => setCount(Math.max(1, count - 1))


  const handleClickCart = (id, title, price, images, description) => {
    dispatch(addToCart({ id, title, price, images, description, count }))
    setCount(1)
  }


  let message
  if (status === 'in progress') {
    // message = <h1 className={styles.loading}>Product is loading...</h1>
    message = <div className="loader"><div className="loader__circle"></div></div>
  }
  else if (error === 'fail') {
    message = <h1 className={styles.loading}>{error}</h1>
  }


  return (
    <main>
      <div className='wrap'>
        {message}
        {status === 'success' &&
          <div className={styles.layout}>
            <div className={styles.images}>

              <div className={styles.big}>
                <img src={single.images[indexImage]} alt="img" />
              </div>

              <div className={styles.overflow}>
                <div className={styles.box}>
                  {
                    single.images?.map((img, index) => {
                      return <img
                        key={index}
                        className={styles.small}
                        src={img}
                        alt="img"
                        onClick={() => handleClick(index)}
                        style={index === indexImage
                          ? { border: '1px solid #2C2D2E' }
                          : { border: '1px solid transparent' }}
                      />
                    })
                  }
                </div>
              </div>
            </div>

            <div className={styles.descriptions} key={single.id}>
              <h1 className='text-title'>{single.title}</h1>
              <div className='text-id'>{`ID: ${single.id}`}</div>
              <p className='text-description'>{single.description}</p>
              <div className={styles.number}>
                <div className="text-price">{`${single.price} $`}</div>

                <div className={styles.counter}>
                  <button
                    className={styles.icon__minus}
                    onClick={decrement}
                  >
                    <img src={minus} alt="minus" />
                  </button>

                  <span className='text-id'>
                    {count}
                  </span>

                  <button
                    className={styles.icon__plus}
                    onClick={() => increment(single.id)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                </div>

              </div>
              <button
                className={styles.button}
                onClick={() => handleClickCart(single.id, single.title, single.price, single.images[0], single.description.slice(0, 80))}
              >
                <div className={styles.button__content}>
                  <span className={styles.button__text}>Add to cart </span>
                  <img className={styles.button__plus} src={plusBtn} alt="plus" />
                </div>
              </button>
            </div>

            <div className={styles.random}>
              <h1 className={`text-chapter ${styles.title__products}`} >You might like these products</h1>
              <div className={styles.layout__card}>
                {
                  randomGoods?.map(product => {
                    return (
                      <div className="card" key={product.id}>
                        <Card
                          product={product}
                          count={count}
                          countId={countId}
                          increment={increment}
                          decrement={decrement}
                          handleClickCart={handleClickCart}
                          rerenderPage={rerenderPage}
                        />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

        }
      </div>
    </main >
  )
}