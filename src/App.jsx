import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { CartPage, CatalogPage, ContactsPage, DeliveryPage, MainPage, PersonalArea, ProductsPage, Root, SingleProductPage } from './pages'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<MainPage />} />
      <Route path='/categories' element={<CatalogPage />} />
      <Route path='/categories/:name' element={<ProductsPage />} />
      <Route path='/product/:id' element={<SingleProductPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path='/delivery' element={<DeliveryPage />} />
      <Route path='/cabinet' element={<PersonalArea />} />
    </Route>
  )
)

export const App = () => {
  return <RouterProvider router={router} />
}
