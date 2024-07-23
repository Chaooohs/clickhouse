import bin from '../../../public/image/svg/bin-added.svg'
import styles from './SearchCard.module.scss'


export const SearchCard = ({ product, rerenderPage }) => {
  return (
    <>
      <img className={styles.images} src={product.images} alt="img" onClick={() => rerenderPage(product.id)} />
      <div className={styles.content} onClick={() => rerenderPage(product.id)}>
        <h3 className={`text-title ${styles.title}`}>{product.title}</h3>
        <div className={`text-description ${styles.description}`}>{`${product.description.slice(0, 50)}...`}</div>
      </div>
      <div className={`text-price ${styles.price}`}>{`${product.price} $`}</div>
      <button className={styles.button}>
        <img src={bin} alt="add" />
      </button>
    </>
  )
}