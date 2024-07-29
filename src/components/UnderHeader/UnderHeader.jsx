import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { setCartCounter } from '../../redux/cartSlice'
import { statusBurger, statusSearch } from '../../redux/sideBarSlice'
import { exitUser } from '../../redux/authSlice'
import { SearchSide } from '../SearchSide/SearchSide'
import { SearchBox } from '../SearchBox/SearchBox'

import Exit from '/public/image/svg/exit.svg?react'
import Bin from '/public/image/svg/bin.svg?react'
import Man from '/public/image/svg/man.svg?react'
import burgernothover from '/public/image/svg/burger.svg'
import burgerhover from '/public/image/svg/burgerhover.svg'
import search from '/public/image/svg/search.svg'
import styles from './UnderHeader.module.scss'



export const UnderHeader = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const ref = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.cart.products)
  const isSearchIn = useSelector(state => state.search.isSearchIn)
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


  // открывает меню бургер
  const onClickBurger = () => {
    dispatch(statusBurger(true))
  }


  // выход из личного кабинета
  const onExitClick = () => {
    navigate('/')
    dispatch(exitUser(null))
  }


  // окрывает мобильный поиск
  const onMobSearch = () => { 
      dispatch(statusSearch(true))
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
        {
          isMobile
            ?
            <button className={styles.mobsearchbtn} onClick={onMobSearch}>
              <img src={search} alt="search" />
            </button>
            :
            <SearchBox/>
        }
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
      {
        isSearchIn && location.pathname !== '/search' &&
        <SearchSide />
      }
    </div>
  )
}