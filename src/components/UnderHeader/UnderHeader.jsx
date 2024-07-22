import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { useMediaQuery } from 'react-responsive'

import { setCartCounter } from '../../redux/cartSlice'
import { statusBurger } from '../../redux/sideBarSlice'
import { exitUser } from '../../redux/authSlice'
import { getSearchValue, searchProducts, toggleSearchIcon } from '../../redux/searchSlice'
import { SearchSide } from '../SearchSide/SearchSide'
import { CloseButton } from "../CloseButton/CloseButton";

import Exit from '/public/image/svg/exit.svg?react'
import Bin from '/public/image/svg/bin.svg?react'
import Man from '/public/image/svg/man.svg?react'
import search from '/public/image/svg/search.svg'
import burgernothover from '/public/image/svg/burger.svg'
import burgerhover from '/public/image/svg/burgerhover.svg'
import styles from './UnderHeader.module.scss'



export const UnderHeader = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const ref = useRef(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector(state => state.cart.products)
  const isSearchIn = useSelector(state => state.search.isSearchIn)
  const [mouse, setMouse] = useState(false)
  const [value, setValue] = useState('')

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

  // очищает инпут поиска
  useEffect(() => {
    if (!isSearchIn) {
      setValue('')
    }
  }, [isSearchIn])


  const onClickBurger = () => {
    dispatch(statusBurger(true))
  }


  // выход из личного кабинета
  const onExitClick = () => {
    navigate('/')
    dispatch(exitUser(null))
  }


  // задержка поиска и отправка запроса
  const searchValueByTimer = useCallback(
    debounce((value) => {
      dispatch(searchProducts(value))
      dispatch(getSearchValue(value))
    }, 1000),
    []
  );
  // проверка на отсутствие цифр
  const regSearch = (value) => {
    let rgx = /^[a-zа-я]*$/gi;
    return rgx.test(value);
  };
  // получение водимого поиска
  const onSearchByName = (e) => {
    const value = e.target.value;
    if (regSearch(value)) {
      searchValueByTimer(value);
      setValue(value)
    }
  };


  const handleClearSearch = () => {
    dispatch(toggleSearchIcon(false))
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
            <button className={styles.mobsearchbtn}>
              <img src={search} alt="search" />
            </button>
            :
            <div className={styles.search}>
              <input
                className={styles.search__input}
                type="text"
                value={value}
                placeholder='What will you want to find?'
                onChange={onSearchByName}
              />

              <div className={styles.search__button}>
                {
                  !isSearchIn
                    ?
                    <img className={styles.search__icon} src={search} alt="search" />
                    :
                    <CloseButton onClickClose={handleClearSearch} />
                }
              </div>
            </div>
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
        isSearchIn &&
        <SearchSide />
      }
    </div>
  )
}