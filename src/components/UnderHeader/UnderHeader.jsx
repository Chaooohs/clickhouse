import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { setCartCounter } from '../../redux/cartSlice'
import { statusAuth, statusBurger } from '../../redux/sideBarSlice'
import authSlice, { exitUser } from '../../redux/authSlice'

import Exit from '/public/image/svg/exit.svg?react'
import Bin from '/public/image/svg/bin.svg?react'
import Man from '/public/image/svg/man.svg?react'
import search from '/public/image/svg/search.svg'
import burgernothover from '/public/image/svg/burger.svg'
import burgerhover from '/public/image/svg/burgerhover.svg'
import styles from './UnderHeader.module.scss'



export const UnderHeader = () => {
  const ref = useRef(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.cart.products)
  // const {isUserLoggedIn}  = useSelector(state => state.auth)
  const [mouse, setMouse] = useState(false)

  const counter = selector?.reduce((sum, el) => el.count + sum, 0);


  useEffect(() => {
    if (ref.current === true) {
      localStorage.setItem('clickhouse__cart', JSON.stringify(selector))
    }
    ref.current = true
  }, [selector])


  useEffect(() => {
    dispatch(setCartCounter(counter))
  }, [counter])


  const onClickBurger = () => {
    dispatch(statusBurger(true))
  }


  // const onEnterUser = () => {
  //   if (status === '' || status === 'fail') dispatch(statusAuth(true))
  // }


  const onExitClick = () => {
    localStorage.setItem('clickhouse__user', JSON.stringify([]))
    navigate('/')
    // window.location.reload();  //* По умолчанию этот метод перезагружает страницу из кэша, если мы передаем true в качестве аргумента, он перезагружает всю страницу с сервера, а не с кэша. */
    dispatch(exitUser(null))
  }



  let burger
  if (mouse) burger = <img src={burgerhover} alt='menu' />
  else if (!mouse) burger = <img src={burgernothover} alt='menu' />


  return (
    <div className='wrap'>
      <div className={styles.underheader}>
        <button
          className={styles.iconburger}
          onMouseOver={() => setMouse(true)}
          onMouseOut={() => setMouse(false)}
          onClick={onClickBurger}
        >
          {burger}
        </button>
        <div className={styles.search}>
          <input className={styles.search__input} type="text" placeholder='What will you want to find?' />
          <button className={styles.search__button}>
            <img className={styles.search__icon} src={search} alt="search" />
          </button>
        </div>
        <div className={styles.box}>
          <Link to="/cart">
            <div className={styles.iconbox}>
              <Bin className={styles.icon} />
              <span className={styles.counter}>{counter}</span>
            </div>
          </Link>
          <Link to="/cabinet">
            <div className={styles.iconbox}>
              <Man className={styles.icon} />
            </div>
          </Link>
          <button onClick={onExitClick}>
            <div className={styles.iconbox}>
              <Exit className={styles.icon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}