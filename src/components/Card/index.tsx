import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../../models/article';
import { formatDate } from '../../utils/formatDate';
import './style.css';
import { parseHTML } from '../../utils/HTMLParser';

interface CardProps {
  article: Article;
}

const Card: FC<CardProps> = ({ article }) => {
  const navigate = useNavigate();
  const { title, image, category, author, published_at, source } = article;

  const handleOnClick = () => {
    // Create a unique ID for the article based on title and author
    const articleId = encodeURIComponent(
      `${title}-${author}`.replace(/\s+/g, '-').toLowerCase(),
    );
    navigate(`/article/${articleId}`, {
      state: { article },
    });
  };

  return (
    <div className="article-card" onClick={handleOnClick}>
      <div className="article-image">
        {image ? <img src={image} alt={title} /> : 'No image available'}
      </div>
      <span className="article-category">{category}</span>
      <h3 className="article-title">{title}</h3>
      <span className="source">{parseHTML(source)}</span>
      <div className="article-meta">
        <div className="author-date">
          <span>{author || 'Unknown Author'}</span>
          <span>•</span>
          <span>{formatDate(published_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
