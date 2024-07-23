import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { statusBurger } from "../../redux/sideBarSlice";
import { CloseButton } from "../CloseButton/CloseButton";

import logo from '/public/image/logo/logo.svg'
import styles from "./BurgerSide.module.scss";

export const BurgerSide = () => {
  const ref = useRef();
  const [close, setClose] = useState(false);
  const [autoClose, setAutoClose] = useState(false);
  const burger = useSelector(state => state.sideBar.burger);
  const dispatch = useDispatch();


  // таймер открытия и закрытия бургера
  useEffect(() => {
    if (burger && !close) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`);
      }, 50);
    } else if (close) {
      ref.current.classList.remove(`${styles.open}`);
      setTimeout(() => {
        dispatch(statusBurger(false));
      }, 350);
    }
  }, [close, burger]);


  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        setClose(true)
      }, 0)
    }
  }, [autoClose])


  const handleClickCloseBurger = () => {
    setClose(true);
  };


  return (
    <>
      <div className='side-layout'>
        <div className={styles.burger} ref={ref}>
          <header className={styles.header}>
            <Link
              to='/'
              onClick={() => setAutoClose(true)}
            >
              <img className={styles.logo} src={logo} alt="logo" />
            </Link>

            <CloseButton onClickClose={handleClickCloseBurger} />
            
          </header>
          <main className={styles.main}>
            <Link
              className="text-chapter"
              to='/categories'
              style={{ fontWeight: 'bold  ' }}
              onClick={() => setAutoClose(true)}
            >
              Categories </Link>
            <Link
              className="text-id"
              to='/delivery'
              onClick={() => setAutoClose(true)}
            >
              Delivery </Link>
            <Link
              className="text-id"
              to='/contacts'
              onClick={() => setAutoClose(true)}
            >
              Contacts </Link>
          </main>
        </div>
      </div>
    </>
  );
};
