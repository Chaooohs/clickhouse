import { useSelector } from 'react-redux'

import { Card } from '../../components'
import styles from './SearchPage.module.scss'

export const SearchPage = () => {
  const { value, products } = useSelector(state => state.search)


  return (
    <main>
      <div className='wrap'>
        <h1 className='text-chapter'>Search results for the query “{`${value}`}”</h1>
        <div className='card-layout'>
          {
            // Array.isArray(value) &&
            products.map(product => {
              return (
                <div className='card' key={product.id}>
                  <Card
                    product={product}
                    // count={count}
                    // countId={countId}
                    // increment={increment}
                    // decrement={decrement}
                    // handleClickCart={handleClickCart}
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