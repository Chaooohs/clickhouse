import { useDispatch, useSelector } from "react-redux";
import { statusAuth } from "../redux/sideBarSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export const PrivateRouter = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isUserLoggedIn } = useSelector((state) => state.auth)


  useEffect(() => {
    if (!isUserLoggedIn) {
      dispatch(statusAuth(true))
      navigate('/')
    }
  }, [isUserLoggedIn])

  return children
}