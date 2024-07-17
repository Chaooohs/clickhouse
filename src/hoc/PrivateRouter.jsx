import { useDispatch, useSelector } from "react-redux";
import { statusAuth } from "../redux/sideBarSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { exitUser } from "../redux/authSlice";



export const PrivateRouter = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isUserLoggedIn } = useSelector((state) => state.auth)


  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('clickhouse__user'))

    if (a?.length > 0) {
      dispatch(exitUser(true))
    } else if (a?.length === 0) {
      dispatch(exitUser(false))
    } else if (a === null) {
      dispatch(exitUser(false))
    }
  }, [])


  useEffect(() => {
    if (!isUserLoggedIn) {
      dispatch(statusAuth(true))
      navigate('/')
    }
  }, [isUserLoggedIn])

  return children
}