import Link from 'next/link';

export default () => (
  <div>
    <Link href="/">
      <a>Main</a>
    </Link>
    &nbsp;
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
);
