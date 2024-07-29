import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import debounce from 'lodash.debounce'

import {  toggleSearchIcon } from "../../redux/searchSlice"
import { addOffset, addTitle } from "../../redux/filtersSlice";
import { CloseButton } from "../CloseButton/CloseButton";
import search from '/public/image/svg/search.svg'
import styles from './SearchBox.module.scss'


export const SearchBox = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const isSearchIn = useSelector(state => state.search.isSearchIn)


  // очищает инпут поиска
  useEffect(() => {
    if (!isSearchIn) {
      setValue('')
    }
  }, [isSearchIn])


  // задержка поиска и отправка запроса
  const searchValueByTimer = useCallback(
    debounce((value) => {
      // dispatch(searchProducts(value))
      // dispatch(getSearchValue(value))
      dispatch(toggleSearchIcon(true))
      dispatch(addTitle(value))
      dispatch(addOffset(0))
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


  // заменяет кнопку очистки поля ввода
  const handleClearSearch = () => {
    dispatch(toggleSearchIcon(false))
  }


  return (
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
  )
}