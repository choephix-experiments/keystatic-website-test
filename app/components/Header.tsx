import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Link href="/">
            Nilo
          </Link>
          
          <nav style={{
            display: "flex",
            gap: "1rem",
          }}>
            <Link href="/">Home</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/keystatic">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
