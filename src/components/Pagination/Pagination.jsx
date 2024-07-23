import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// import { setPage } from "../../redux";
import styles from "./Pagination.module.scss";
import { addOffset } from "../../redux/filtersSlice";

export const Pagination = () => {
  const dispatch = useDispatch();
  // const page = useSelector((state) => state.filters.page);
  const products = useSelector(state => state.categoryId.products);
  const offset = useSelector(state => state.filters.offset);

  const pageCount = Math.ceil(products.length / 10);

  let pageCountArr = [];
  for (let i = 0; i < pageCount; i++) {
    pageCountArr.push(i + 1);
  }

  // useEffect(() => {
  //   page === undefined && dispatch(setPage('1'));
  // }, [page])

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   dispatch(fetchCategoryId(0));
  // };

  return (
    <div className={styles.box}>
      {
        pageCountArr.map((el, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                name="pagination"
                value={el}
                id={`pag${index}`}
                className={styles.input}
                onChange={(e) => dispatch(addOffset(e.target.value - 1))}
                checked={el === offset + 1}
              />
              <label
                htmlFor={`pag${index}`}
                className={styles.label}
              >
                {el}
              </label>
            </div>
          );
        })
      }
    </div>
  );
};
