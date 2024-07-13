import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { setCartCounter } from '../../redux/cartSlice'
import { statusBurger } from '../../redux/sideBarSlice'

import Bin from '/public/image/svg/bin.svg?react'
import Man from '/public/image/svg/man.svg?react'
import search from '/public/image/svg/search.svg'
import burgernothover from '/public/image/svg/burger.svg'
import burgerhover from '/public/image/svg/burgerhover.svg'
import styles from './UnderHeader.module.scss'

export const UnderHeader = () => {
  const dispath = useDispatch()
  const selector = useSelector(state => state.cart.products)
  const [mouse, setMouse] = useState(false)


  const counter = selector.reduce((sum, el) => el.count + sum, 0);


  useEffect(() => {
    dispath(setCartCounter(counter))
  }, [counter])


  const handleClickBurger = () => {
    dispath(statusBurger(true))
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
          onClick={() => handleClickBurger()}
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
          <button>
            <div className={styles.iconbox}>
              <Man className={styles.icon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}