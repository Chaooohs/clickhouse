import { Outlet } from "react-router"
import { useSelector } from "react-redux"

import { Footer, Header, UnderHeader, BurgerSide, OrderSide, AuthSide } from "../components"


export const Root = () => {
  const burger = useSelector(state => state.sideBar.burger)
  const order = useSelector(state => state.sideBar.order)
  const auth = useSelector(state => state.sideBar.auth)


  return (
    <div className="page">
      <div className="layout">
        <Header />
        <UnderHeader />
        <Outlet />
        <Footer />
        {burger && <BurgerSide />}
        {order && <OrderSide />}
        {auth && <AuthSide />}
      </div>
    </div>

  )
}