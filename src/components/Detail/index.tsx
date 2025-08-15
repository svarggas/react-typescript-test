import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import DetailLayout from '../../layout/DetailLayout';
import Article from './Article';
import type { Article as ArticleType } from '../../models/article';
import './style.css';

interface LocationState {
  article: ArticleType;
}

const DetailView: FC = () => {
  const location = useLocation();
  const { article } = (location.state as LocationState) || {};

  if (!article) {
    return (
      <DetailLayout>
        <div>Article not found</div>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout>
      <Article article={article} />
    </DetailLayout>
  );
};

export default DetailView;
