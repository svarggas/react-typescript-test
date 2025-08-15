import type { FC } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-creator">Created by Sebastian Vargas</div>

          <div className="footer-social">
            <Link
              to="https://www.linkedin.com/in/svarggas/"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              in
            </Link>
            <Link
              to="https://github.com/svarggas"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              gh
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Sebastian Vargas &copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
