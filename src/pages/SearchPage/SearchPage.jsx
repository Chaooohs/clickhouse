import { useSelector } from 'react-redux'
import { Cards } from '../../components'

export const SearchPage = () => {
  const { value, products } = useSelector(state => state.search)

  
  return (
    <main>
      <div className='wrap'>
        <h1 className='text-chapter'>Search results for the query “{`${value}`}”</h1>
        <Cards products={products} />
      </div>
    </main>
  )
}