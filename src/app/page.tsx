import Header from '@/components/Header';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <Header />
      <div className={styles.appHeading}>
        <h1>Assessment Code</h1>
      </div>
    </main>
  );
}
