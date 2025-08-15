import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArticlesProvider } from './context/ArticlesContext';
import ErrorBoundary from './components/ErrorBoundary';
import Landing from './components/Landing';
import DetailView from './components/Detail';

const App = () => {
  return (
    <ErrorBoundary>
      <ArticlesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/article/:articleId" element={<DetailView />} />
          </Routes>
        </Router>
      </ArticlesProvider>
    </ErrorBoundary>
  );
};

export default App;
