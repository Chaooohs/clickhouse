import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { Card } from '../../components'
import { addToCart } from '../../redux/cartSlice'

export const SearchPage = () => {
  const dispatch = useDispatch()
  const { value, products } = useSelector(state => state.search)
  const [count, setCount] = useState(1)
  const [countId, setCountId] = useState()



  const increment = (id) => {
    const found = products?.find(el => el.id === id)
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


  return (
    <main>
      <div className='wrap'>
        <h1 className='text-chapter'>Search results for the query “{`${value}`}”</h1>
        <div className='card-layout'>
          {
            Array.isArray(products) &&
            products.map(product => {
              return (
                <div className='card' key={product.id}>
                  <Card
                    product={product}
                    count={count}
                    countId={countId}
                    increment={increment}
                    decrement={decrement}
                    handleClickCart={handleClickCart}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}