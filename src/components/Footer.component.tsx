import { FC } from 'react';
import styles from '../styles/components/Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Booker - сервис для поиска любимых книг в библиотеке Google.
      </p>
    </footer>
  )
}

export default Footer;
