import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <div>
          {/* Company Info */}
          <div>
            <h3>Nilo</h3>
            <p>
              Building the future with innovative solutions and cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Admin */}
          <div>
            <h4>Admin</h4>
            <ul>
              <li>
                <Link href="/keystatic">Content Management</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div>
          <p>
            © {new Date().getFullYear()} Nilo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
