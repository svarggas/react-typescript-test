import type { FC } from 'react';
import { Link } from 'react-router';

import '../../styles/Container.css';
import './style.css';

interface ReturnButtonProps {
  link: string;
}

const ReturnButton: FC<ReturnButtonProps> = ({ link }) => {
  return (
    <div className="detail-header">
      <div className="container">
        <Link to={link} className="back-button">
          ← Back to Articles
        </Link>
      </div>
    </div>
  );
};

export default ReturnButton;
