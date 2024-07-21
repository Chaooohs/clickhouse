import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { CartPage, CatalogPage, ContactsPage, DeliveryPage, MainPage, PersonalArea, ProductsPage, Root, SearchPage, SingleProductPage } from './pages'
import { PrivateRouter } from './hoc/PrivateRouter'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<MainPage />} />
      <Route path='/categories' element={<CatalogPage />} />
      <Route path='/categories/:name/:id' element={<ProductsPage />} />
      <Route path='/product/:id' element={<SingleProductPage />} />
      <Route path='/cart' element={
        <PrivateRouter>
          <CartPage />
        </PrivateRouter>
      } />
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path='/delivery' element={<DeliveryPage />} />
      <Route path='/cabinet' element={
        <PrivateRouter>
          <PersonalArea />
        </PrivateRouter>
      } />
      <Route path='/search' element={<SearchPage />} />
    </Route>
  )
)

export const App = () => {
  return <RouterProvider router={router} />
}
