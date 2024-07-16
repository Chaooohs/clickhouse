import { useDispatch, useSelector } from "react-redux";
import { statusAuth } from "../redux/sideBarSlice";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";



export const PrivateRouter = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isUserLoggedIn } = useSelector((state) => state.auth)

  // if (isLoading) return null; 
 
  // const auth = true

  useEffect(() => {
    if (!isUserLoggedIn ) {
      navigate('/')
      dispatch(statusAuth(true))
    }
  }, [isUserLoggedIn])

  return children

  // return isUserLoggedIn ? children : dispatch(statusAuth(true))
}