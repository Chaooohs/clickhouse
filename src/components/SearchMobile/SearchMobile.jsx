import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { statusSearch } from '../../redux/sideBarSlice';
import { CloseButton } from '../CloseButton/CloseButton'
import { SearchSide } from '../SearchSide/SearchSide';
import { SearchBox } from '../SearchBox/SearchBox'
import styles from './SearchMobile.module.scss'
import { toggleSearchIcon } from '../../redux/searchSlice';


export const SeachMobile = () => {
  const ref = useRef()
  const dispatch = useDispatch()
  const isSearchIn = useSelector(state => state.search.isSearchIn)
  const search = useSelector(state => state.sideBar.search);
  const [close, setClose] = useState(false);


  useEffect(() => {
    if (search && !close) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`);
      }, 50);
    } else if (close) {
      ref.current.classList.remove(`${styles.open}`);
      setTimeout(() => {
        dispatch(statusSearch(false));
      }, 350);
    }
  }, [close, search]);



  const handleClickCloseSearchMobile = () => {
    setClose(true);
    dispatch(toggleSearchIcon(false))
  };


  return (
    <div className={styles.search} ref={ref}>
      <CloseButton onClickClose={handleClickCloseSearchMobile} />
      <SearchBox />
      {
        isSearchIn &&
        < SearchSide />
      }
    </div>
  )
}