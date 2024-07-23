import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { statusBurger, statusSearch } from "../redux/sideBarSlice";


export const translateX = (a, b, c, ) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (a && !b) {
      setTimeout(() => {
        c.current.classList.add(`open-x`);
      }, 50);
    } else if (b) {
      c.current.classList.remove(`open-x`);
      setTimeout(() => {
        dispatch(statusBurger(false));
        dispatch(statusSearch(false));
      }, 350);
    }
  }, [b, a]);

}