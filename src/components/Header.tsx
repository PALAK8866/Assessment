import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.pageHeader}>
      <div>
        <Link className={styles.anchorLink} href={'/'}>
          Home
        </Link>
      </div>
      <div className={styles.subHeader}>
        <Link className={styles.anchorLink} href={'/raws'}>
          Raws
        </Link>
        <Link className={styles.anchorLink} href={'/'}>
          Applications
        </Link>
        <Link className={styles.anchorLink} href={'/'}>
          Resources
        </Link>
      </div>
    </div>
  );
};

export default Header;
