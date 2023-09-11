import { FC } from 'react'
import styles from '../styles/components/Header.module.scss'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <p>Booker</p>
    </header>
  )
}

export default Header;
