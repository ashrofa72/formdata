import Link from 'next/link'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navdev}>
    <nav>
      <Link href="/">
        Home
      </Link>
      <Link href="/newlayout">
        Customers
      </Link>
      <Link href="/getStudents">
        Students
      </Link>
    </nav>
    </div>
  )
}

export default Navbar
