import Link from 'next/link';
import css from './Header.module.css'; 

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        {}
        <Link href="/" className={css.link}>
          Home
        </Link>

        {}
        <Link href="/notes/filter/all" className={css.link}>
          Notes
        </Link>
      </nav>
    </header>
  );
}
