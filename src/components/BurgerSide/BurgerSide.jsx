import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { statusBurger } from "../../redux/sideBarSlice";

import CloseIcon from '/public/image/svg/close.svg?react'
import logo from '/public/image/logo/logo.svg'
import styles from "./BurgerSide.module.scss";

export const BurgerSide = () => {
  const ref = useRef();
  const [close, setClose] = useState(false);
  const burger = useSelector((state) => state.sideBar.burger);
  const dispatch = useDispatch();

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


  const handleClickCloseBurger = () => {
    setClose(true);
  };


  return (
    <>
      <div className='side-layout'>
        <div className={styles.burger} ref={ref}>
          <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="logo" />
            <button className={styles.button} onClick={handleClickCloseBurger}>
              <CloseIcon className={styles.icon} />
            </button>
          </header>
          <main className={styles.main}>
            <Link className="text-chapter" to='/categories' style={{ fontWeight: 'bold  ' }}> Categories </Link>
            <Link className="text-id" to='/delivery'> Delivery </Link>
            <Link className="text-id" to='/contacts'> Contacts </Link>
          </main>
        </div>
      </div>
    </>
  );
};
