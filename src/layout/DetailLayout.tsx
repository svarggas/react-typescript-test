import type { FC, PropsWithChildren } from 'react';
import Footer from '../components/Footer';
import ReturnButton from '../components/ReturnButton';
import '../styles/DetailView.css';
import '../styles/DetailLayout.css';

const DetailLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="detail-view">
      <div className="detail-layout">
        <div className="detail-header">
          <ReturnButton link="/" />
        </div>
        <main className="detail-content-wrapper">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DetailLayout;
