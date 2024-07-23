import { useSelector } from 'react-redux'
import { Cards, Pagination } from '../../components'

export const SearchPage = () => {
  const { value, products } = useSelector(state => state.search)

  
  return (
    <main className='main'>
      <div className='wrap'>
        <h1 className='text-chapter'>Search results for the query “{`${value}`}”</h1>
        <Cards products={products} />
        <Pagination/>
      </div>
    </main>
  )
}