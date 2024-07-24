import DeliveryOne from '/public/image/png/delivery-one.jpg'
import DeliveryTwo from '/public/image/png/delivery-two.jpg'
import styles from './DeliveryPage.module.scss'


export const DeliveryPage = () => {
  return (
    <main className='main'>
      <div className='wrap'>
        <div className={styles.layout}>
          <h1 className='text-chapter'>Delivery</h1>
          <div className={styles.left}>
            <p className='text-id'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit obcaecati optio repellat necessitatibus dolor fugiat odit blanditiis esse adipisci perspiciatis architecto culpa quos, nisi impedit expedita rem sunt eaque possimus?</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius debitis labore soluta dignissimos aliquid pariatur blanditiis deserunt dolore nisi aut architecto, obcaecati autem! Magni debitis eveniet nisi earum, at corporis.</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className='text-id' style={{fontWeight: 'bold'}}>Lorem ipsum dolor sit amet?</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit obcaecati optio repellat necessitatibus dolor fugiat odit blanditiis esse adipisci perspiciatis architecto culpa quos, nisi impedit expedita rem sunt eaque possimus?</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius debitis labore soluta dignissimos aliquid pariatur blanditiis deserunt dolore nisi aut architecto, obcaecati autem! Magni debitis eveniet nisi earum, at corporis.</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img src={DeliveryTwo} alt="img" />
            <p className='text-id' style={{fontWeight: 'bold'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur minus deleniti, asperiores at, ratione culpa hic consequatur debitis repudiandae eum ipsam omnis, voluptatibus corporis consequuntur laudantium atque libero dolorum aspernatur.</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur minus deleniti, asperiores at, ratione culpa hic consequatur debitis repudiandae eum ipsam omnis, voluptatibus corporis consequuntur laudantium atque libero dolorum aspernatur.</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur minus deleniti, asperiores at, ratione culpa hic consequatur debitis repudiandae eum ipsam omnis, voluptatibus corporis consequuntur laudantium atque libero dolorum aspernatur.</p>
          </div>
          <div className={styles.rigth}>
            <img src={DeliveryOne} alt="img" />
            <p className='text-id' style={{fontWeight: 'bold'}}>Lorem ipsum dolor sit amet</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit obcaecati optio repellat necessitatibus dolor fugiat odit blanditiis esse adipisci perspiciatis architecto culpa quos, nisi impedit expedita rem sunt eaque possimus?</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius debitis labore soluta dignissimos aliquid pariatur blanditiis deserunt dolore nisi aut architecto, obcaecati autem! Magni debitis eveniet nisi earum, at corporis.</p>
            <p className='text-id' style={{fontWeight: 'bold'}}>Lorem ipsum dolor</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur minus deleniti, asperiores at, ratione culpa hic consequatur debitis repudiandae eum ipsam omnis, voluptatibus corporis consequuntur laudantium atque libero dolorum aspernatur.</p>
            <p className='text-id'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur minus deleniti, asperiores at, ratione culpa hic consequatur debitis repudiandae eum ipsam omnis, voluptatibus corporis consequuntur laudantium atque libero dolorum aspernatur.</p>
          </div>
        </div>
      </div>
    </main>
  )
}