import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { ContactsPage, MainPage, PersonalArea, Root,  } from './pages'
import { PrivateRouter } from './hoc/PrivateRouter'
import { lazy, Suspense } from 'react'



const DeliveryPage = lazy(() => import('./pages'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const SingleProductPage = lazy(() => import('./pages/SingleProductPage'))






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<MainPage />} />
      <Route path='/categories' element={
        <Suspense fallback={<div className='loader'></div>}>
          <CatalogPage />
        </Suspense>
      } />
      <Route path='/products' element={
        <Suspense fallback={<div className='loader'></div>}>
          <ProductsPage />
        </Suspense>
      } />
      <Route path='/product/:id' element={
        <Suspense fallback={<div className='loader'></div>}>
          <SingleProductPage />
        </Suspense>
      } />
      <Route path='/cart' element={
        <PrivateRouter>
          <Suspense fallback={<div className='loader'></div>}>
            <CartPage />
          </Suspense>
        </PrivateRouter>
      } />
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path='/delivery' element={
        <Suspense fallback={<div className='loader'></div>}>
          <DeliveryPage />
        </Suspense>
      } />
      <Route path='/cabinet' element={
        <PrivateRouter>
          <PersonalArea />
        </PrivateRouter>
      } />
      <Route path='/search' element={
        <Suspense fallback={<div className='loader'></div>}>
          <SearchPage />
        </Suspense>
      } />
    </Route>
  )
)

export const App = () => {
  return <RouterProvider router={router} />
}
