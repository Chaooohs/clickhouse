import { Outlet } from "react-router"
import { useSelector } from "react-redux"
import { useEffect } from "react"

import { Footer, Header, UnderHeader, BurgerSide, OrderSide, AuthSide, SeachMobile } from "../components"


export const Root = () => {
  const burger = useSelector(state => state.sideBar.burger)
  const order = useSelector(state => state.sideBar.order)
  const auth = useSelector(state => state.sideBar.auth)
  const search = useSelector(state => state.sideBar.search)


  useEffect(() => {
    if (burger || order || auth) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [burger, order, auth])


  if (burger || order || auth || search) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }


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
          {search && <SeachMobile />}
        </div>
      </div>

    )
}