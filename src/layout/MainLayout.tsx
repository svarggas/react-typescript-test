import type { FC, PropsWithChildren } from 'react';
import Header from '../components/Landing/Header';
import Footer from '../components/Footer';
import '../styles/MainLayout.css';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
