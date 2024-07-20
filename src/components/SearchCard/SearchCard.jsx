import bin from '../../../public/image/svg/bin-added.svg'
import styles from './SearchCard.module.scss'


export const SearchCard = ({ product , refreshPage}) => {
  return (
    <>
      <img className={styles.images} src={product.images} alt="img" onClick={()=> refreshPage(product.id)} />
      <div className={styles.content} onClick={()=> refreshPage(product.id)}>
        <h3 className={`text-title ${styles.title}`}>{product.title}</h3>
        <div className='text-description'>{`${product.description.slice(0, 50)}...`}</div>
        <div className={`text-price ${styles.price}`}>{`${product.price} $`}</div>
      </div>
      <button>
        <img src={bin} alt="add" />
      </button>
    </>
  )
}